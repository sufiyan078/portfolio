// Universal Cross-Platform Sound Manager
// High-performance Web Audio API Synthesized Audio Engine for Desktop, Mobile & Touch Devices

export type SoundEffectType =
  | 'hover'
  | 'click'
  | 'touchStart'
  | 'touchEnd'
  | 'openModal'
  | 'closeModal'
  | 'terminal'
  | 'success'
  | 'error';

class SoundManager {
  private static instance: SoundManager;
  private audioCtx: AudioContext | null = null;
  private soundEnabled = true;
  private audioUnlocked = false;
  private volume = 0.35;
  private lastTriggerTime = 0;
  private lastEffectType: SoundEffectType | null = null;

  private constructor() {
    this.initUnlockListeners();
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  /**
   * Universal Mobile Audio Context Unlocker.
   * Plays a 0-volume oscillator buffer during user gesture to fully unlock iOS Safari & Android WebAudio.
   */
  private initUnlockListeners() {
    if (typeof window === 'undefined') return;

    const unlockEvents = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'] as const;

    const unlock = () => {
      if (this.audioUnlocked) return;
      const ctx = this.getAudioContext();
      if (!ctx) return;

      ctx.resume().then(() => {
        try {
          const silentOsc = ctx.createOscillator();
          const silentGain = ctx.createGain();
          silentGain.gain.setValueAtTime(0, ctx.currentTime);
          silentOsc.connect(silentGain);
          silentGain.connect(ctx.destination);
          silentOsc.start(ctx.currentTime);
          silentOsc.stop(ctx.currentTime + 0.001);
          this.audioUnlocked = true;

          for (const evt of unlockEvents) {
            window.removeEventListener(evt, unlock, true);
          }
        } catch {
          // ignore safely
        }
      }).catch(() => {});
    };

    for (const evt of unlockEvents) {
      window.addEventListener(evt, unlock, { passive: true, capture: true });
    }
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    if (this.soundEnabled) {
      this.playSound('hover');
    }
    return this.soundEnabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  /**
   * Plays a synthesized audio effect with 40ms deduplication filter to eliminate double-firing (pointerdown + touchstart + click).
   */
  public playSound(type: SoundEffectType) {
    if (!this.soundEnabled) return;

    const nowTime = performance.now();
    // Deduplication filter: suppress identical or rapid duplicate triggers within 40ms
    if (this.lastEffectType === type && nowTime - this.lastTriggerTime < 40) {
      return;
    }
    this.lastTriggerTime = nowTime;
    this.lastEffectType = type;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const baseVol = this.volume;

      switch (type) {
        case 'hover':
        case 'touchStart':
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(580, now);
          osc.frequency.exponentialRampToValueAtTime(720, now + 0.04);
          gain.gain.setValueAtTime(baseVol * 0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.start(now);
          osc.stop(now + 0.04);
          break;

        case 'click':
        case 'touchEnd':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.exponentialRampToValueAtTime(980, now + 0.07);
          gain.gain.setValueAtTime(baseVol, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
          osc.start(now);
          osc.stop(now + 0.07);
          break;

        case 'openModal':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(400, now);
          osc.frequency.exponentialRampToValueAtTime(900, now + 0.12);
          gain.gain.setValueAtTime(baseVol * 0.85, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          osc.start(now);
          osc.stop(now + 0.12);
          break;

        case 'closeModal':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(750, now);
          osc.frequency.exponentialRampToValueAtTime(300, now + 0.09);
          gain.gain.setValueAtTime(baseVol * 0.8, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
          osc.start(now);
          osc.stop(now + 0.09);
          break;

        case 'terminal':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(950, now);
          gain.gain.setValueAtTime(baseVol * 0.5, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.start(now);
          osc.stop(now + 0.04);
          break;

        case 'success':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, now); // C5
          osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
          osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
          gain.gain.setValueAtTime(baseVol * 0.9, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
          osc.start(now);
          osc.stop(now + 0.22);
          break;

        case 'error':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.setValueAtTime(130, now + 0.08);
          gain.gain.setValueAtTime(baseVol * 0.7, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
          osc.start(now);
          osc.stop(now + 0.16);
          break;
      }
    } catch {
      // AudioContext fallback - ignore safely
    }
  }

  /**
   * Helper to return unified cross-platform event handlers for any interactive React element.
   * Handles Desktop Mouse Hover, Mobile Touch Press, Pointer Events, and Keyboard Navigation cleanly.
   */
  public getUniversalAudioProps(
    clickEffect: SoundEffectType = 'click',
    hoverEffect: SoundEffectType = 'hover',
    onClickCallback?: (e: React.MouseEvent | React.KeyboardEvent | React.PointerEvent) => void
  ) {
    let touched = false;

    return {
      onPointerEnter: (e: React.PointerEvent) => {
        if (e.pointerType === 'mouse') {
          this.playSound(hoverEffect);
        }
      },
      onPointerDown: (e: React.PointerEvent) => {
        if (e.pointerType === 'touch' || e.pointerType === 'pen') {
          touched = true;
          this.playSound('touchStart');
        }
      },
      onClick: (e: React.MouseEvent) => {
        if (touched) {
          touched = false;
          this.playSound('touchEnd');
        } else {
          this.playSound(clickEffect);
        }
        if (onClickCallback) {
          onClickCallback(e);
        }
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          this.playSound(clickEffect);
          if (onClickCallback) {
            onClickCallback(e);
          }
        }
      }
    };
  }
}

export const soundManager = SoundManager.getInstance();
