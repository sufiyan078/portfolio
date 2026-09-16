import type React from 'react';

export type SoundEffectType = 'CARD_HOVER' | 'CARD_CLICK' | 'WARP_ENTRY' | 'DIMENSION_AMBIENCE' | 'WARP_EXIT';
type Scene = 'PORTFOLIO' | 'ENTER_PORTAL' | 'ENTER_WARP' | 'DARK_DIMENSION' | 'EXIT_PORTAL' | 'EXIT_WARP';
type Voice = { gain: GainNode; sources: AudioScheduledSourceNode[]; nodes: AudioNode[]; stopped: boolean };

/** One context, five categories, and one owner for every playing audio node. */
class SoundManager {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private voices = new Map<SoundEffectType, Set<Voice>>();
  private enabled = true;
  private unlocking: Promise<void> | null = null;
  private scene: Scene = 'PORTFOLIO';
  private activeWarp: 'enter' | 'exit' | null = null;
  private lastHover = -Infinity;
  private lastClick = -Infinity;
  private volume = 0.75;
  private destroyed = false;

  constructor() {
    try { this.enabled = localStorage.getItem('portfolio_sound_enabled') !== 'false'; } catch { /* Keep the default. */ }
    if (typeof window !== 'undefined') {
      window.addEventListener('pointerdown', this.gesture, true);
      window.addEventListener('keydown', this.gesture, true);
      document.addEventListener('visibilitychange', this.visibility);
      window.addEventListener('pagehide', this.pageHide);
    }
  }
  private gesture = (event: Event) => {
    if (!event.isTrusted || (event instanceof KeyboardEvent && (event.repeat || ['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)))) return;
    void this.unlock();
  };
  private pageHide = () => this.stopAll();
  private visibility = () => { if (document.hidden) this.stopAll(); else this.syncScene(); };
  async unlock() {
    if (this.destroyed) return;
    if (this.unlocking) return this.unlocking;
    try {
      if (!this.context) {
        this.context = new AudioContext();
        this.master = this.context.createGain();
        this.compressor = this.context.createDynamicsCompressor();
        this.compressor.threshold.value = -18; this.compressor.ratio.value = 6;
        this.master.gain.value = this.enabled ? this.volume : 0;
        this.master.connect(this.compressor); this.compressor.connect(this.context.destination);
      }
      if (this.context.state === 'running') { this.syncScene(); return; }
      // Do not mark success or remove gesture listeners until resume actually succeeds.
      this.unlocking = this.context.resume().then(() => {
        if (this.context?.state === 'running') this.syncScene();
      }).catch(() => { /* The next legitimate gesture can retry. */ }).finally(() => { this.unlocking = null; });
      return this.unlocking;
    } catch { this.unlocking = null; }
  }
  isSoundEnabled() { return this.enabled; }
  toggleSound() {
    this.enabled = !this.enabled;
    try { localStorage.setItem('portfolio_sound_enabled', String(this.enabled)); } catch { /* Optional persistence. */ }
    if (this.master && this.context) this.master.gain.setValueAtTime(this.enabled ? this.volume : 0, this.context.currentTime);
    if (!this.enabled) this.stopAll(); else this.syncScene();
    return this.enabled;
  }
  setVolume(value: number) {
    this.volume = Math.max(0, Math.min(1, value));
    if (this.master && this.context && this.enabled) this.master.gain.setValueAtTime(this.volume, this.context.currentTime);
  }
  getVolume() { return this.volume; }
  setScene(scene: Scene) {
    const changed = this.scene !== scene;
    this.scene = scene;
    if (scene !== 'DARK_DIMENSION') this.stop('DIMENSION_AMBIENCE');
    if (scene === 'PORTFOLIO' || scene === 'DARK_DIMENSION') {
      this.stop('WARP_ENTRY'); this.stop('WARP_EXIT'); this.activeWarp = null;
    }
    this.syncScene();
    if (changed && (scene === 'ENTER_WARP' || scene === 'EXIT_WARP') && this.ready()) {
      this.tone(scene === 'EXIT_WARP' ? 'WARP_EXIT' : 'WARP_ENTRY', scene === 'EXIT_WARP' ? 95 : 260, 42, 0.7, 0.24, 'triangle');
    }
  }
  private ready() { return !this.destroyed && this.enabled && this.context?.state === 'running' && !(typeof document !== 'undefined' && document.hidden); }
  private syncScene() {
    if (!this.ready()) return;
    if (this.scene === 'DARK_DIMENSION') {
      if (!this.voices.get('DIMENSION_AMBIENCE')?.size) this.ambience();
    } else if (this.scene !== 'PORTFOLIO') {
      const direction = this.scene.startsWith('ENTER') ? 'enter' : 'exit';
      if (this.activeWarp !== direction) {
        this.stop('WARP_ENTRY'); this.stop('WARP_EXIT'); this.activeWarp = direction; this.warp(direction);
      }
    }
  }
  playSound(category: SoundEffectType) {
    if (!this.ready()) {
      // A first tap can complete before its legitimate pointerdown resume settles.
      // Keep only timely click feedback; never replay stale hover or traversal sounds.
      if (category === 'CARD_CLICK' && this.unlocking) {
        const requested = performance.now();
        void this.unlocking.then(() => {
          if (this.ready() && performance.now() - requested < 250) this.playSound(category);
        });
      }
      return;
    }
    const now = performance.now();
    if (category === 'CARD_HOVER') {
      if (now - this.lastHover < 130 || now - this.lastClick < 180) return;
      this.lastHover = now;
      this.tone(category, 620, 940, 0.065, 0.12, 'sine');
    } else if (category === 'CARD_CLICK') {
      if (now - this.lastClick < 65) return;
      this.lastClick = now; this.stop('CARD_HOVER');
      this.tone(category, 390, 170, 0.115, 0.22, 'triangle');
      this.tone(category, 780, 1040, 0.085, 0.08, 'sine', 0.025);
    } else this.syncScene();
  }
  private voice(category: SoundEffectType): Voice {
    const voice: Voice = { gain: this.context!.createGain(), sources: [], nodes: [], stopped: false };
    voice.gain.connect(this.master!);
    const group = this.voices.get(category) ?? new Set<Voice>();
    group.add(voice); this.voices.set(category, group);
    return voice;
  }
  private dispose(category: SoundEffectType, voice: Voice) {
    if (voice.stopped) return;
    voice.stopped = true;
    for (const source of voice.sources) { source.onended = null; try { source.stop(); } catch { /* Already ended. */ } source.disconnect(); }
    voice.nodes.forEach(node => node.disconnect()); voice.gain.disconnect();
    this.voices.get(category)?.delete(voice);
  }
  private tone(category: SoundEffectType, from: number, to: number, duration: number, level: number, type: OscillatorType, delay = 0) {
    const ctx = this.context!, voice = this.voice(category), oscillator = ctx.createOscillator();
    voice.sources.push(oscillator); oscillator.type = type; oscillator.connect(voice.gain);
    const start = ctx.currentTime + delay;
    oscillator.frequency.setValueAtTime(from, start); oscillator.frequency.exponentialRampToValueAtTime(to, start + duration);
    voice.gain.gain.setValueAtTime(0, start);
    voice.gain.gain.linearRampToValueAtTime(level, start + Math.min(0.025, duration / 4));
    voice.gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.onended = () => this.dispose(category, voice);
    oscillator.start(start); oscillator.stop(start + duration + 0.01);
  }
  private noise(category: SoundEffectType, duration: number, level: number, from: number, to: number, delay = 0) {
    const ctx = this.context!, voice = this.voice(category), source = ctx.createBufferSource(), filter = ctx.createBiquadFilter();
    const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 2), ctx.sampleRate), data = buffer.getChannelData(0);
    let brown = 0;
    for (let i = 0; i < data.length; i++) { brown = (brown + (Math.random() * 2 - 1) * 0.035) / 1.035; data[i] = brown * 4; }
    source.buffer = buffer; source.loop = true; filter.type = 'bandpass'; filter.Q.value = 0.65;
    source.connect(filter); filter.connect(voice.gain); voice.sources.push(source); voice.nodes.push(filter);
    const start = ctx.currentTime + delay;
    filter.frequency.setValueAtTime(from, start); filter.frequency.exponentialRampToValueAtTime(to, start + duration);
    voice.gain.gain.setValueAtTime(0, start); voice.gain.gain.linearRampToValueAtTime(level, start + duration * 0.55);
    voice.gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.onended = () => this.dispose(category, voice); source.start(start); source.stop(start + duration + 0.02);
  }
  private warp(direction: 'enter' | 'exit') {
    const exit = direction === 'exit';
    const category = exit ? 'WARP_EXIT' : 'WARP_ENTRY';
    this.tone(category, exit ? 180 : 48, exit ? 65 : 185, 1.0, 0.24, 'sawtooth');
    this.tone(category, exit ? 440 : 150, exit ? 120 : 440, 0.85, 0.1, 'sine', 0.1);
    this.noise(category, exit ? 1.8 : 2.2, 0.48, 100, exit ? 1900 : 1200, 0.45);
    if (exit) {
      this.noise(category, 0.5, 0.52, 1600, 90, 1.75);
      this.tone(category, 190, 45, 0.4, 0.28, 'triangle', 1.9);
    }
  }
  private ambience() {
    const ctx = this.context!, category = 'DIMENSION_AMBIENCE', voice = this.voice(category), now = ctx.currentTime;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 280;
    filter.connect(voice.gain); voice.nodes.push(filter);
    // Upper harmonic keeps the atmosphere audible on laptop/mobile speakers.
    for (const frequency of [43, 64.7, 87.3, 174.6]) {
      const oscillator = ctx.createOscillator(); oscillator.type = 'sine'; oscillator.frequency.value = frequency;
      oscillator.connect(filter); oscillator.start(); voice.sources.push(oscillator);
    }
    const lfo = ctx.createOscillator(), depth = ctx.createGain();
    lfo.frequency.value = 0.09; depth.gain.value = 0.01;
    lfo.connect(depth); depth.connect(voice.gain.gain); lfo.start(); voice.sources.push(lfo); voice.nodes.push(depth);
    voice.gain.gain.setValueAtTime(0, now); voice.gain.gain.linearRampToValueAtTime(0.055, now + 1.5);
  }
  stop(category: SoundEffectType) { for (const voice of [...(this.voices.get(category) ?? [])]) this.dispose(category, voice); }
  private stopAll() { for (const category of this.voices.keys()) this.stop(category); this.activeWarp = null; }
  disposeAll() {
    this.destroyed = true; this.stopAll();
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointerdown', this.gesture, true); window.removeEventListener('keydown', this.gesture, true);
      document.removeEventListener('visibilitychange', this.visibility); window.removeEventListener('pagehide', this.pageHide);
    }
    this.master?.disconnect(); this.compressor?.disconnect(); void this.context?.close();
  }
  getDiagnostics() { return { scene: this.scene, contextState: this.context?.state ?? 'uninitialized', contexts: this.context ? 1 : 0,
    categories: Object.fromEntries([...this.voices].map(([key, voices]) => [key, voices.size])) }; }

  getUniversalAudioProps(clickEffect: SoundEffectType = 'CARD_CLICK', hoverEffect: SoundEffectType = 'CARD_HOVER',
    callback?: (e: React.MouseEvent | React.KeyboardEvent | React.PointerEvent) => void) {
    return {
      onPointerEnter: (e: React.PointerEvent) => { if (e.pointerType === 'mouse') this.playSound(hoverEffect); },
      // Touch sound is emitted on accepted click, never on a scroll or cancelled pointer.
      onClick: (e: React.MouseEvent) => { this.playSound(clickEffect); callback?.(e); },
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.target !== e.currentTarget || e.currentTarget.matches('button,a[href],input,select,textarea,summary') || e.repeat) return;
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.playSound(clickEffect); callback?.(e); }
      },
    };
  }
}
export const soundManager = new SoundManager();
if (import.meta.hot) import.meta.hot.dispose(() => soundManager.disposeAll());
