import { useEffect, useRef } from 'react';
export function DimensionAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current; if (!host) return;
    let frame = 0, x = 0, y = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      x = (event.clientX / innerWidth - .5) * 12; y = (event.clientY / innerHeight - .5) * 8;
      if (!frame) frame = requestAnimationFrame(() => { host.style.setProperty('--drift-x', `${x}px`); host.style.setProperty('--drift-y', `${y}px`); frame = 0; });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); };
  }, []);
  return <div ref={ref} className="dimension-atmosphere" aria-hidden="true">
    <div className="dimension-distance" /><div className="dimension-fog dimension-fog-back" /><div className="dimension-fog dimension-fog-front" />
    <div className="dimension-fissure" />
    {Array.from({ length: 18 }, (_, i) => <i key={i} className="dimension-mote" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 23) % 100}%`, animationDelay: `-${i * 1.7}s`, animationDuration: `${18 + i % 7}s` }} />)}
  </div>;
}
