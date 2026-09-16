import { useEffect } from 'react';

/** Animate visible SVG icons, including icons mounted later in dialogs. */
export function useIconMotion() {
  useEffect(() => {
    const icons = new Set<SVGSVGElement>();
    const selector = 'svg[data-icon-kind],svg.lucide,svg[data-realm-icon]';
    let frame = 0, active: SVGSVGElement[] = [];
    const resetTilt = () => { active.forEach(svg => { svg.style.removeProperty('--icon-x'); svg.style.removeProperty('--icon-y'); }); active = []; };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const target = (event.target as Element).closest?.('button,a,summary,.glass-panel,.cyber-card');
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        resetTilt(); if (!target) return;
        const r = target.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (event.clientX-r.left)/r.width*2-1));
        const y = Math.max(-1, Math.min(1, (event.clientY-r.top)/r.height*2-1));
        active = [...target.querySelectorAll<SVGSVGElement>('.realm-depth-icon')];
        active.forEach(svg => { svg.style.setProperty('--icon-x', `${-y*8}deg`); svg.style.setProperty('--icon-y', `${x*12}deg`); });
      });
    };
    document.addEventListener('pointermove', pointer, { passive:true });
    window.addEventListener('blur', resetTilt);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) entry.target.classList.toggle('realm-icon-visible', entry.isIntersecting);
    }, { rootMargin: '40px' });
    const visit = (node: Node, add: boolean) => {
      if (!(node instanceof Element)) return;
      const candidates = [...node.querySelectorAll<SVGSVGElement>(selector)];
      if (node instanceof SVGSVGElement && node.matches(selector)) candidates.push(node);
      for (const svg of candidates) {
        if (!add) { observer.unobserve(svg); icons.delete(svg); continue; }
        // Warrior artwork is locked, including every 100x100 emblem instance.
        if (icons.has(svg) || svg.getAttribute('viewBox') === '0 0 100 100') continue;
        // Long, wide SVGs are scenery or diagrams, rather than icons.
        const box = svg.viewBox.baseVal;
        if (box.width > box.height * 2 || box.height > box.width * 2) continue;
        svg.style.setProperty('--icon-delay', `${-(icons.size % 8) * 0.4}s`);
        svg.classList.add('realm-depth-icon'); icons.add(svg); observer.observe(svg);
      }
    };
    visit(document.body, true);
    const mutations = new MutationObserver(records => {
      for (const record of records) {
        record.removedNodes.forEach(node => visit(node, false));
        record.addedNodes.forEach(node => visit(node, true));
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect(); observer.disconnect();
      cancelAnimationFrame(frame); resetTilt(); document.removeEventListener('pointermove', pointer); window.removeEventListener('blur', resetTilt);
      icons.forEach(svg => { svg.classList.remove('realm-depth-icon', 'realm-icon-visible'); svg.style.removeProperty('--icon-delay'); });
    };
  }, []);
}
