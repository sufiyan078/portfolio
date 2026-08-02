// Web Audio API Synthesized UI Sound Generator
let audioCtx: AudioContext | null = null;
let soundEnabled = true;
let audioUnlocked = false;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

/**
 * Mobile browsers (iOS Safari, Chrome Android) require both:
 *   1. AudioContext.resume() called during a user gesture
 *   2. An actual audio buffer/oscillator started during that same gesture
 * Just calling resume() is NOT enough on iOS Safari — a silent oscillator
 * must be played to truly "unlock" the audio pipeline.
 */
if (typeof window !== 'undefined') {
  const unlockGestureEvents = ['pointerdown', 'touchstart', 'touchend', 'keydown', 'click'] as const;

  const unlockAudio = () => {
    if (audioUnlocked) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    // Resume the context (required by all mobile browsers)
    ctx.resume().then(() => {
      // Play a silent oscillator to fully unlock the audio pipeline on iOS Safari.
      // This must happen inside the user-gesture callback chain.
      const silentOsc = ctx.createOscillator();
      const silentGain = ctx.createGain();
      silentGain.gain.setValueAtTime(0, ctx.currentTime);
      silentOsc.connect(silentGain);
      silentGain.connect(ctx.destination);
      silentOsc.start(ctx.currentTime);
      silentOsc.stop(ctx.currentTime + 0.001);

      audioUnlocked = true;

      // Clean up all unlock listeners
      for (const evt of unlockGestureEvents) {
        window.removeEventListener(evt, unlockAudio, true);
      }
    }).catch(() => {});
  };

  for (const evt of unlockGestureEvents) {
    window.addEventListener(evt, unlockAudio, { passive: true, capture: true });
  }
}

export const toggleSound = (): boolean => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    playCyberSound('hover');
  }
  return soundEnabled;
};

export const isSoundEnabled = (): boolean => soundEnabled;

export type SoundEffectType = 'click' | 'hover' | 'openModal' | 'closeModal' | 'terminal';

export const playCyberSound = (type: SoundEffectType) => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Force context resume if browser suspended it
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case 'click':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(980, now + 0.07);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.07);
        break;

      case 'hover':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(580, now);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
        break;

      case 'openModal':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.12);
        gain.gain.setValueAtTime(0.30, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
        break;

      case 'closeModal':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.09);
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.09);
        break;

      case 'terminal':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(950, now);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
    }
  } catch {
    // AudioContext blocked until user interaction - ignore safely
  }
};
