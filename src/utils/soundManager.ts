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
          // Retro RPG Game Bubble Pop / Bloop Sound (Sine Wave pitch sweep 420Hz -> 1550Hz)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(420, now);
          osc.frequency.exponentialRampToValueAtTime(1550, now + 0.038);

          gain.gain.setValueAtTime(baseVol * 0.95, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.038);
          break;
        }

        case 'touchStart': {
          // Mobile Retro Game Bubble Pop Selection (Sine Wave 450Hz -> 1400Hz)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(450, now);
          osc.frequency.exponentialRampToValueAtTime(1400, now + 0.035);

          gain.gain.setValueAtTime(baseVol * 0.95, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.035);
          break;
        }

        case 'click': {
          // Retro 16-Bit Arcade Item Select / Action Snap (Square + Triangle transient pop + 650Hz -> 220Hz punch)
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'square';
          osc1.frequency.setValueAtTime(650, now);
          osc1.frequency.exponentialRampToValueAtTime(220, now + 0.06);

          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(1300, now);
          osc2.frequency.exponentialRampToValueAtTime(320, now + 0.06);

          gain.gain.setValueAtTime(baseVol * 0.65, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.06);
          osc2.stop(now + 0.06);
          break;
        }

        case 'touchEnd': {
          // Mobile 8-bit tap release confirmation snap (Square Wave 523Hz -> 880Hz upward blip)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'square';
          osc.frequency.setValueAtTime(523.25, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

          gain.gain.setValueAtTime(baseVol * 0.45, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
        }

        case 'openModal': {
          // Authentic 8-Bit RPG Inventory Chest / Window Open Arpeggio Sweep (C5 -> E5 -> G5 -> C6)
          const notes = [523.25, 659.25, 783.99, 1046.50];
          const noteDuration = 0.035;

          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const noteStart = now + idx * noteDuration;

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, noteStart);

            gain.gain.setValueAtTime(baseVol * 0.4, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.05);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(noteStart);
            osc.stop(noteStart + 0.05);
          });
          break;
        }

        case 'closeModal': {
          // Authentic 8-Bit RPG Menu Close / Cancel Down-Step (C6 -> G5 -> E5 -> C5)
          const notes = [1046.50, 783.99, 659.25, 523.25];
          const noteDuration = 0.03;

          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const noteStart = now + idx * noteDuration;

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, noteStart);

            gain.gain.setValueAtTime(baseVol * 0.35, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.045);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(noteStart);
            osc.stop(noteStart + 0.045);
          });
          break;
        }

        case 'terminal': {
          // Retro 8-Bit Computer Terminal Keystroke Beep (Square 1318Hz -> 1760Hz)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'square';
          osc.frequency.setValueAtTime(1318.51, now);
          osc.frequency.exponentialRampToValueAtTime(1760, now + 0.025);

          gain.gain.setValueAtTime(baseVol * 0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.025);
          break;
        }

        case 'success': {
          // 8-Bit RPG Victory / Item Unlocked Fanfare (C5 -> E5 -> G5 -> B5 -> C6)
          const notes = [523.25, 659.25, 783.99, 987.77, 1046.50];
          const noteDuration = 0.05;

          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const noteStart = now + idx * noteDuration;

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, noteStart);

            gain.gain.setValueAtTime(baseVol * 0.45, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.08);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(noteStart);
            osc.stop(noteStart + 0.08);
          });
          break;
        }

        case 'error': {
          // 8-Bit Game Over Low Sawtooth Buzz (180Hz -> 120Hz)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.setValueAtTime(120, now + 0.07);

          gain.gain.setValueAtTime(baseVol * 0.5, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.14);
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
