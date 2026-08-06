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
  private masterGain: GainNode | null = null;
  private masterCompressor: DynamicsCompressorNode | null = null;
  private soundEnabled = true;
  private audioUnlocked = false;
  private volume = 0.85; // Master volume optimized for desktop & mobile phone speakers
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

        // Create Master Dynamics Compressor Node to equalize audio peaks across desktop & mobile speakers
        try {
          this.masterCompressor = this.audioCtx.createDynamicsCompressor();
          this.masterCompressor.threshold.setValueAtTime(-18, this.audioCtx.currentTime);
          this.masterCompressor.knee.setValueAtTime(24, this.audioCtx.currentTime);
          this.masterCompressor.ratio.setValueAtTime(6, this.audioCtx.currentTime);
          this.masterCompressor.attack.setValueAtTime(0.003, this.audioCtx.currentTime);
          this.masterCompressor.release.setValueAtTime(0.15, this.audioCtx.currentTime);

          // Create Master Gain Node
          this.masterGain = this.audioCtx.createGain();
          this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);

          // Route: Master Gain -> Master Compressor -> AudioContext Destination
          this.masterGain.connect(this.masterCompressor);
          this.masterCompressor.connect(this.audioCtx.destination);
        } catch {
          this.masterGain = null;
          this.masterCompressor = null;
        }
      }
    }

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }

    if (this.audioCtx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }

    return this.audioCtx;
  }

  private getDestinationNode(ctx: AudioContext): AudioNode {
    return this.masterGain || ctx.destination;
  }

  /**
   * One-time Universal Audio Context Unlocker.
   * Registers capture-phase event listeners for pointerdown, click, touchstart, keydown.
   * On first user interaction, synchronously resumes AudioContext and plays a 0-volume buffer,
   * then cleans up all unlock event listeners.
   */
  private initUnlockListeners() {
    if (typeof window === 'undefined') return;

    const unlockEvents = ['pointerdown', 'click', 'touchstart', 'keydown'] as const;

    const handleUnlock = async () => {
      if (this.audioUnlocked) return;
      this.audioUnlocked = true;

      // Remove listeners immediately to prevent duplicate runs
      for (const evt of unlockEvents) {
        window.removeEventListener(evt, handleUnlock, true);
      }

      const ctx = this.getAudioContext();
      if (!ctx) return;

      if (ctx.state === 'suspended') {
        try {
          await ctx.resume();
        } catch {
          // ignore safely
        }
      }

      try {
        const silentOsc = ctx.createOscillator();
        const silentGain = ctx.createGain();
        silentGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        silentOsc.connect(silentGain);
        silentGain.connect(this.getDestinationNode(ctx));
        silentOsc.start(ctx.currentTime);
        silentOsc.stop(ctx.currentTime + 0.001);
      } catch {
        // ignore safely
      }
    };

    for (const evt of unlockEvents) {
      window.addEventListener(evt, handleUnlock, { capture: true, passive: true });
    }
  }

  /**
   * Pure toggle for audio muting.
   * ONLY toggles the soundEnabled boolean state.
   * Never resumes AudioContext, recreates audio objects, or initializes the sound system.
   */
  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioCtx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  /**
   * Plays a synthesized audio effect with 35ms deduplication filter to eliminate double-firing.
   * Ensures identical sound synthesis and volume levels across all devices.
   */
  public playSound(type: SoundEffectType) {
    if (!this.soundEnabled) return;

    // Standardize touch aliases to ensure identical sound synthesis across desktop & mobile
    let targetType = type;
    if (targetType === 'touchStart') targetType = 'hover';
    if (targetType === 'touchEnd') targetType = 'click';

    const nowTime = performance.now();
    // Deduplication filter: suppress identical or rapid duplicate triggers within 35ms
    if (this.lastEffectType === targetType && nowTime - this.lastTriggerTime < 35) {
      return;
    }
    this.lastTriggerTime = nowTime;
    this.lastEffectType = targetType;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const dest = this.getDestinationNode(ctx);

      switch (targetType) {
        case 'hover': {
          // Retro RPG Game Bubble Pop / Bloop Sound (Sine Wave pitch sweep 420Hz -> 1450Hz)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(420, now);
          osc.frequency.exponentialRampToValueAtTime(1450, now + 0.038);

          gain.gain.setValueAtTime(0.60, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

          osc.connect(gain);
          gain.connect(dest);
          osc.start(now);
          osc.stop(now + 0.038);
          break;
        }

        case 'click': {
          // Retro 16-Bit Arcade Item Select / Action Snap (Square + Triangle transient pop + 650Hz -> 220Hz punch)
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'square';
          osc1.frequency.setValueAtTime(650, now);
          osc1.frequency.exponentialRampToValueAtTime(220, now + 0.055);

          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(1300, now);
          osc2.frequency.exponentialRampToValueAtTime(320, now + 0.055);

          gain.gain.setValueAtTime(0.75, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(dest);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.055);
          osc2.stop(now + 0.055);
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

            gain.gain.setValueAtTime(0.65, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.05);

            osc.connect(gain);
            gain.connect(dest);

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

            gain.gain.setValueAtTime(0.65, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.045);

            osc.connect(gain);
            gain.connect(dest);

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

          gain.gain.setValueAtTime(0.55, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

          osc.connect(gain);
          gain.connect(dest);

          osc.start(now);
          osc.stop(now + 0.025);
          break;
        }

        case 'success': {
          // 8-Bit RPG Victory / Item Unlocked Fanfare (C5 -> E5 -> G5 -> B5 -> C6)
          const notes = [523.25, 659.25, 783.99, 987.77, 1046.50];
          const noteDuration = 0.045;

          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const noteStart = now + idx * noteDuration;

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, noteStart);

            gain.gain.setValueAtTime(0.70, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.075);

            osc.connect(gain);
            gain.connect(dest);

            osc.start(noteStart);
            osc.stop(noteStart + 0.075);
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

          gain.gain.setValueAtTime(0.70, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

          osc.connect(gain);
          gain.connect(dest);

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
   * Ensures identical sound synthesis and volume across Desktop Mouse, Mobile Touch Press, Pointer Events, and Keyboard.
   */
  public getUniversalAudioProps(
    clickEffect: SoundEffectType = 'click',
    hoverEffect: SoundEffectType = 'hover',
    onClickCallback?: (e: React.MouseEvent | React.KeyboardEvent | React.PointerEvent) => void
  ) {
    let touchHandled = false;

    return {
      onPointerEnter: (e: React.PointerEvent) => {
        if (e.pointerType === 'mouse') {
          this.playSound(hoverEffect);
        }
      },
      onPointerDown: (e: React.PointerEvent) => {
        if (e.pointerType === 'touch' || e.pointerType === 'pen') {
          touchHandled = true;
          this.playSound(clickEffect);
        }
      },
      onClick: (e: React.MouseEvent) => {
        if (touchHandled) {
          touchHandled = false;
          // Audio played on pointerDown for instant touch response
          if (onClickCallback) {
            onClickCallback(e);
          }
        } else {
          this.playSound(clickEffect);
          if (onClickCallback) {
            onClickCallback(e);
          }
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

