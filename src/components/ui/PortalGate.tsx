import { useEffect, useRef, useState } from 'react';

export function PortalGate({ active = true, compact = false }: { active?: boolean; compact?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const energyRef = useRef({ charge: 0, x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState('DORMANT');
  const [rendererReady, setRendererReady] = useState(false);
  useEffect(() => {
    const host = hostRef.current; if (!host) return;
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { rootMargin: '80px' });
    observer.observe(host); return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const host = hostRef.current; if (!host || !active || !visible) return;
    setState('DORMANT');
    const update = (x: number, y: number, force = false) => {
      const r = host.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const distance = Math.hypot(x - cx, y - cy), radius = Math.max(r.width, r.height) * 0.5;
      const inside = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      const charge = force || inside ? 1 : Math.max(0, 1 - Math.max(0, distance - radius) / (radius * 1.1));
      energyRef.current = { charge, x: Math.max(-1, Math.min(1, (x - cx) / radius)), y: Math.max(-1, Math.min(1, (y - cy) / radius)) };
      host.style.setProperty('--gate-charge', String(charge));
      host.style.setProperty('--gate-x', String(energyRef.current.x));
      host.style.setProperty('--gate-y', String(energyRef.current.y));
      setState(charge > 0.9 ? 'ARMED' : charge > 0.05 ? 'CHARGING' : 'DORMANT');
    };
    const move = (event: PointerEvent) => { if (event.pointerType === 'mouse' || event.pointerType === 'pen') update(event.clientX, event.clientY); };
    const touch = (event: PointerEvent) => { if (event.pointerType !== 'mouse') update(event.clientX, event.clientY, true); };
    const reset = () => { energyRef.current.charge = 0; host.style.setProperty('--gate-charge', '0'); setState('DORMANT'); };
    const release = (event: PointerEvent) => { if (event.pointerType !== 'mouse') reset(); };
    const focus = () => { const r = host.getBoundingClientRect(); update(r.left + r.width / 2, r.top + r.height / 2, true); };
    window.addEventListener('pointermove', move, { passive: true }); window.addEventListener('blur', reset);
    host.addEventListener('pointerdown', touch, { passive: true }); host.addEventListener('pointercancel', reset);
    host.addEventListener('pointerup', release); host.parentElement?.addEventListener('focusin', focus); host.parentElement?.addEventListener('focusout', reset);
    return () => {
      energyRef.current = { charge: 0, x: 0, y: 0 };
      host.style.setProperty('--gate-charge', '0');
      window.removeEventListener('pointermove', move); window.removeEventListener('blur', reset);
      host.removeEventListener('pointerdown', touch); host.removeEventListener('pointercancel', reset); host.removeEventListener('pointerup', release);
      host.parentElement?.removeEventListener('focusin', focus); host.parentElement?.removeEventListener('focusout', reset);
    };
  }, [active, visible]);
  useEffect(() => {
    const host = hostRef.current;
    if (!host || !active || !visible || compact) { setRendererReady(false); return; }
    // A disposed WebGL context cannot be reused. Own a fresh canvas per visible session.
    const canvas = document.createElement('canvas');
    canvas.className = 'gate-webgl'; canvas.setAttribute('aria-hidden', 'true'); host.appendChild(canvas);
    let alive = true, frame = 0, last = 0;
    let scene: Awaited<ReturnType<typeof import('../vault/gateScene')['createGateScene']>> | undefined;
    const size = new ResizeObserver(() => { if (scene) scene.resize(host.clientWidth, host.clientHeight); }); size.observe(host);
    const lost = (event: Event) => { event.preventDefault(); cancelAnimationFrame(frame); scene?.dispose(); scene = undefined; setRendererReady(false); };
    canvas.addEventListener('webglcontextlost', lost);
    void import('../vault/gateScene').then(module => {
      if (!alive) return;
      try {
        scene = module.createGateScene(canvas); scene.resize(host.clientWidth, host.clientHeight); setRendererReady(true);
        const render = (time: number) => {
          if (!alive) return;
          if (time - last > 32 && !document.hidden) {
            const e = energyRef.current; scene?.render(matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : time / 1000, e.charge, e.x, e.y); last = time;
          }
          frame = requestAnimationFrame(render);
        };
        frame = requestAnimationFrame(render);
      } catch { setRendererReady(false); scene?.dispose(); }
    }).catch(() => { if (alive) setRendererReady(false); });
    return () => { alive = false; cancelAnimationFrame(frame); size.disconnect(); canvas.removeEventListener('webglcontextlost', lost); scene?.dispose(); canvas.remove(); };
  }, [active, visible, compact]);
  return <div ref={hostRef} className={`physical-gate ${compact ? 'physical-gate-compact' : ''}`} data-gate-state={active ? state : 'DORMANT'} data-renderer={rendererReady ? 'webgl' : 'layered'} role="img" aria-label="Physical dimensional gate">
    <div className="gate-foundation" /><div className="gate-housing"><div className="gate-field" /><div className="gate-rivets" /></div>
  </div>;
}
