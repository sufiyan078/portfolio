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
  private volume = 0.70; // Punchy, rich master volume
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
      this.playSound('click');
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
   * Plays a synthesized audio effect with 35ms deduplication filter to eliminate double-firing.
   */
  public playSound(type: SoundEffectType) {
    if (!this.soundEnabled) return;

    const nowTime = performance.now();
    // Deduplication filter: suppress identical or rapid duplicate triggers within 35ms
    if (this.lastEffectType === type && nowTime - this.lastTriggerTime < 35) {
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
      const baseVol = this.volume;

      switch (type) {
        case 'hover': {
          // Light high-pitched sci-fi hover chirp (850Hz -> 1200Hz blip)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(850, now);
          osc.frequency.exponentialRampToValueAtTime(1250, now + 0.04);

          gain.gain.setValueAtTime(baseVol * 0.45, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.04);
          break;
        }

        case 'touchStart': {
          // Mobile touch down selection chirp (600Hz -> 850Hz)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(850, now + 0.035);

          gain.gain.setValueAtTime(baseVol * 0.5, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.035);
          break;
        }

        case 'click': {
          // Tactile cybernetic mechanical snap click (High transient click pop + punchy body drop 420Hz -> 140Hz)
          const bodyOsc = ctx.createOscillator();
          const bodyGain = ctx.createGain();

          bodyOsc.type = 'sine';
          bodyOsc.frequency.setValueAtTime(420, now);
          bodyOsc.frequency.exponentialRampToValueAtTime(130, now + 0.065);

          bodyGain.gain.setValueAtTime(baseVol * 0.9, now);
          bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

          bodyOsc.connect(bodyGain);
          bodyGain.connect(ctx.destination);
          bodyOsc.start(now);
          bodyOsc.stop(now + 0.065);

          // High transient click snap accent
          const clickOsc = ctx.createOscillator();
          const clickGain = ctx.createGain();

          clickOsc.type = 'square';
          clickOsc.frequency.setValueAtTime(1800, now);
          clickOsc.frequency.exponentialRampToValueAtTime(400, now + 0.015);

          clickGain.gain.setValueAtTime(baseVol * 0.4, now);
          clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

          clickOsc.connect(clickGain);
          clickGain.connect(ctx.destination);
          clickOsc.start(now);
          clickOsc.stop(now + 0.015);
          break;
        }

        case 'touchEnd': {
          // Mobile tap release confirmation snap (450Hz -> 980Hz upward pop)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(450, now);
          osc.frequency.exponentialRampToValueAtTime(980, now + 0.055);

          gain.gain.setValueAtTime(baseVol * 0.85, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.055);
          break;
        }

        case 'openModal': {
          // Rich sci-fi dual-tone warp up (280Hz -> 1100Hz sweep)
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'sine';
          osc2.type = 'triangle';

          osc1.frequency.setValueAtTime(280, now);
          osc1.frequency.exponentialRampToValueAtTime(1100, now + 0.14);

          osc2.frequency.setValueAtTime(560, now);
          osc2.frequency.exponentialRampToValueAtTime(2200, now + 0.14);

          gain.gain.setValueAtTime(baseVol * 0.85, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.14);
          osc2.stop(now + 0.14);
          break;
        }

        case 'closeModal': {
          // Sci-fi power down sweep (950Hz -> 260Hz)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(950, now);
          osc.frequency.exponentialRampToValueAtTime(260, now + 0.11);

          gain.gain.setValueAtTime(baseVol * 0.8, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.11);
          break;
        }

        case 'terminal': {
          // Crisp terminal keyboard key stroke (1400Hz blip)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(1400, now);
          osc.frequency.exponentialRampToValueAtTime(650, now + 0.03);

          gain.gain.setValueAtTime(baseVol * 0.6, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.03);
          break;
        }

        case 'success': {
          // Arpeggiated triadic victory chime (C5 523Hz -> E5 659Hz -> G5 784Hz -> C6 1046Hz)
          const notes = [523.25, 659.25, 783.99, 1046.50];
          const duration = 0.06;

          notes.forEach((freq, idx) => {
            const noteOsc = ctx.createOscillator();
            const noteGain = ctx.createGain();
            const noteStartTime = now + idx * duration;

            noteOsc.type = 'sine';
            noteOsc.frequency.setValueAtTime(freq, noteStartTime);

            noteGain.gain.setValueAtTime(baseVol * 0.75, noteStartTime);
            noteGain.gain.exponentialRampToValueAtTime(0.001, noteStartTime + 0.12);

            noteOsc.connect(noteGain);
            noteGain.connect(ctx.destination);

            noteOsc.start(noteStartTime);
            noteOsc.stop(noteStartTime + 0.12);
          });
          break;
        }

        case 'error': {
          // Low warning buzz (Sawtooth 240Hz -> 140Hz)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(240, now);
          osc.frequency.setValueAtTime(140, now + 0.07);

          gain.gain.setValueAtTime(baseVol * 0.75, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.16);
          break;
        }
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
          this.playSound(hoverEffect === 'hover' ? 'touchStart' : hoverEffect);
        }
      },
      onClick: (e: React.MouseEvent) => {
        if (touched) {
          touched = false;
          this.playSound(clickEffect === 'click' ? 'touchEnd' : clickEffect);
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
