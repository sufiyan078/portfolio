import { useEffect, type RefObject } from 'react';
import { clamp } from './timelineMath';

/** One passive, event-driven frame scheduler per film; never a continuous React render loop. */
export function useScrollTimeline(ref: RefObject<HTMLElement | null>, update: (progress: number, reduced: boolean) => void) {
  useEffect(() => {
    const track = ref.current; if (!track) return;
    const scroller = track.closest<HTMLElement>('[data-story-scroll-root]');
    const source = scroller ?? window;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (document.hidden || track.closest('[inert]')) return;
      const viewport = scroller?.getBoundingClientRect();
      const rect = track.getBoundingClientRect();
      const height = viewport?.height ?? innerHeight;
      update(clamp(((viewport?.top ?? 0) - rect.top) / Math.max(1, rect.height - height)), preference.matches);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const resize = new ResizeObserver(schedule); resize.observe(track); if (scroller) resize.observe(scroller);
    const overlay = new MutationObserver(schedule), root = document.getElementById('root');
    if (root) overlay.observe(root, { attributes:true, attributeFilter:['inert'] });
    source.addEventListener('scroll', schedule, { passive:true }); window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', schedule); preference.addEventListener('change', schedule); schedule();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); overlay.disconnect(); source.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); document.removeEventListener('visibilitychange', schedule); preference.removeEventListener('change', schedule); };
  }, [ref, update]);
}
