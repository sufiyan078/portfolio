import { useEffect, useRef } from 'react';
interface Props { mode: 'enter' | 'exit'; origin: { x: number; y: number; size: number }; onTraverse: () => void; onComplete: () => void }
const clamp = (n: number) => Math.max(0, Math.min(1, n));
/** Finite physical-gate approach and fractured dimensional passage. */
export function DimensionalWarpCanvas({ mode, origin, onTraverse, onComplete }: Props) {
  const hostRef = useRef<HTMLDivElement>(null), canvasRef = useRef<HTMLCanvasElement>(null), fallbackRef = useRef<HTMLCanvasElement>(null);
  const callbacks = useRef({ onTraverse, onComplete }); callbacks.current = { onTraverse, onComplete };
  useEffect(() => {
    const host = hostRef.current, canvas = canvasRef.current, fallback = fallbackRef.current;
    if (!host || !canvas || !fallback) return;
    let alive = true, finished = false, crossed = false, frame = 0;
    let scene: ReturnType<typeof import('./vault/gateScene')['createGateScene']> | undefined;
    const ctx = fallback.getContext('2d');
    const duration = mode === 'enter' ? 3000 : 2600, start = performance.now();
    let w = innerWidth, h = innerHeight;
    const resize = () => { w = innerWidth; h = innerHeight; fallback.width = w; fallback.height = h; scene?.resize(w, h); };
    resize(); window.addEventListener('resize', resize);
    const finish = () => { if (!finished && alive) { finished = true; cancelAnimationFrame(frame); callbacks.current.onComplete(); } };
    const timer = setTimeout(finish, duration + 800);
    const lost = (event: Event) => { event.preventDefault(); scene?.dispose(); scene = undefined; canvas.style.opacity = '0'; };
    canvas.addEventListener('webglcontextlost', lost);
    void import('./vault/gateScene').then(module => {
      if (!alive || finished) return;
      try { scene = module.createGateScene(canvas, true); scene.resize(w, h); }
      catch { scene?.dispose(); scene = undefined; }
    }).catch(() => { /* The geometric fallback is already running. */ });
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const reduced = () => { if (preference.matches) finish(); };
    preference.addEventListener('change', reduced);
    const render = (now: number) => {
      if (!alive || finished) return;
      const p = clamp((now - start) / duration), approach = clamp(p / 0.34), flight = clamp((p - 0.34) / 0.66);
      if (p >= 0.34 && !crossed) { crossed = true; callbacks.current.onTraverse(); }
      const pull = approach * approach * approach;
      const scale = Math.max(0.12, origin.size / Math.min(w, h)) * (1 - pull) + pull;
      host.style.backgroundColor = p < 0.34 ? `rgba(3,3,10,${approach * 0.95})` : 'transparent';
      const visual = scene ? canvas : fallback;
      canvas.style.opacity = scene ? '1' : '0'; fallback.style.opacity = scene ? '0' : '1';
      visual.style.transform = p < 0.34
        ? `translate(${(origin.x - w / 2) * (1 - pull)}px,${(origin.y - h / 2) * (1 - pull)}px) scale(${scale})`
        : 'none';
      // Two jagged dimensional curtains rip open during the outward release.
      const release = clamp((p - 0.79) / 0.21);
      const edge = 50 * release;
      const clip = release ? `polygon(0 0,${50-edge}% 0,${48-edge}% 25%,${52-edge}% 55%,${50-edge}% 100%,0 100%,0 0,100% 0,${50+edge}% 0,${52+edge}% 25%,${48+edge}% 55%,${50+edge}% 100%,100% 100%,100% 0)` : 'none';
      visual.style.clipPath = clip;
      if (scene) {
        try { scene.render((now - start) / 1000, 1, 0, 0, p, mode === 'exit'); }
        catch { scene.dispose(); scene = undefined; }
      } else if (ctx) {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#03030a'; ctx.fillRect(0, 0, w, h);
        const travel = mode === 'exit' ? Math.pow(flight, .65) : flight * flight;
        // Asymmetric solid rock faces, connected seams and stretched fragments, never rings.
        for (let i = 0; i < 90; i++) {
          const z = ((i / 90 - travel * 2.5) % 1 + 1) % 1, angle = i * 2.39996;
          const depth = 1 / (0.08 + z), radius = Math.min(w, h) * 0.19 * depth;
          const x = w / 2 + Math.cos(angle) * radius, y = h / 2 + Math.sin(angle) * radius;
          const size = depth * 35;
          ctx.fillStyle = i % 3 ? '#171723' : '#29212a'; ctx.strokeStyle = `rgba(215,143,63,${(1-z)*.5})`;
          ctx.beginPath(); ctx.moveTo(x, y - size); ctx.lineTo(x + size * .65, y + size * .3);
          ctx.lineTo(x + size * .2, y + size * 1.4); ctx.lineTo(x - size * .8, y + size * .2); ctx.closePath(); ctx.fill(); ctx.stroke();
        }
        if (p < 0.34) {
          const opening = Math.min(1, approach * 1.4), cx = w / 2, cy = h / 2;
          ctx.fillStyle = '#59432d'; ctx.strokeStyle = '#d99a47'; ctx.lineWidth = 9;
          ctx.beginPath(); ctx.moveTo(cx-w*.2,cy+h*.36);ctx.lineTo(cx-w*.2,cy-h*.25);ctx.lineTo(cx-w*.13,cy-h*.36);ctx.lineTo(cx+w*.13,cy-h*.36);ctx.lineTo(cx+w*.2,cy-h*.25);ctx.lineTo(cx+w*.2,cy+h*.36);ctx.stroke();
          ctx.fillStyle = '#15171e';
          ctx.fillRect(cx-w*.18-w*.18*opening,cy-h*.31,w*.18,h*.65);
          ctx.fillRect(cx+w*.18*opening,cy-h*.31,w*.18,h*.65);
        }
      }
      if (p >= 1) finish(); else frame = requestAnimationFrame(render);
    };
    if (preference.matches) finish(); else frame = requestAnimationFrame(render);
    return () => {
      alive = false; cancelAnimationFrame(frame); clearTimeout(timer); window.removeEventListener('resize', resize);
      preference.removeEventListener('change', reduced); canvas.removeEventListener('webglcontextlost', lost); scene?.dispose();
    };
  }, [mode, origin]);
  return <div ref={hostRef} className="dimensional-crossing" role="status" aria-label={mode === 'enter' ? 'Crossing into the Mission Vault' : 'Returning through the exit gate'}>
    <canvas ref={fallbackRef} aria-hidden="true" /><canvas ref={canvasRef} aria-hidden="true" />
  </div>;
}
