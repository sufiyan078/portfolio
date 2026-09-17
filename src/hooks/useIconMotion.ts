import { useEffect } from 'react';

/** Animate visible SVG icons in 3D, while strictly safeguarding ShieldKnightEmblem and warrior artwork. */
export function useIconMotion() {
  useEffect(() => {
    const icons = new Set<SVGSVGElement>();
    const selector = 'svg';
    let frame = 0, active: SVGSVGElement[] = [];

    const resetTilt = () => {
      active.forEach(svg => {
        svg.style.removeProperty('--icon-x');
        svg.style.removeProperty('--icon-y');
      });
      active = [];
    };

    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const target = (event.target as Element).closest?.('button,a,summary,.glass-panel,.cyber-card,.realm-business-tile,[role="button"],.group');
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        resetTilt();
        if (!target) return;
        const r = target.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (event.clientX - r.left) / r.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (event.clientY - r.top) / r.height * 2 - 1));
        active = [...target.querySelectorAll<SVGSVGElement>('.realm-depth-icon')];
        active.forEach(svg => {
          svg.style.setProperty('--icon-x', `${-y * 10}deg`);
          svg.style.setProperty('--icon-y', `${x * 14}deg`);
        });
      });
    };

    document.addEventListener('pointermove', pointer, { passive: true });
    window.addEventListener('blur', resetTilt);

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        entry.target.classList.toggle('realm-icon-visible', entry.isIntersecting);
      }
    }, { rootMargin: '50px' });

    const isEligibleIcon = (svg: SVGSVGElement): boolean => {
      // 1. STRICT REQUIREMENT: ShieldKnightEmblem and warrior artwork must remain unchanged!
      if (
        svg.getAttribute('viewBox') === '0 0 100 100' ||
        svg.closest('.shield-knight-emblem') ||
        svg.classList.contains('shield-knight-emblem') ||
        svg.getAttribute('data-no-3d') === 'true'
      ) {
        return false;
      }

      // 2. Ignore large illustrations, canvas elements, and wide scenic diagrams
      const box = svg.viewBox?.baseVal;
      const width = box?.width || svg.clientWidth || parseFloat(svg.getAttribute('width') || '0');
      const height = box?.height || svg.clientHeight || parseFloat(svg.getAttribute('height') || '0');

      if (width > 120 || height > 120) return false;
      if (width > 0 && height > 0 && (width > height * 2.5 || height > width * 2.5)) return false;

      return true;
    };

    const visit = (node: Node, add: boolean) => {
      if (!(node instanceof Element)) return;
      const candidates = [...node.querySelectorAll<SVGSVGElement>(selector)];
      if (node instanceof SVGSVGElement && node.matches(selector)) candidates.push(node);

      for (const svg of candidates) {
        if (!add) {
          observer.unobserve(svg);
          icons.delete(svg);
          continue;
        }

        if (icons.has(svg) || !isEligibleIcon(svg)) continue;

        svg.style.setProperty('--icon-delay', `${-(icons.size % 12) * 0.45}s`);
        svg.classList.add('realm-depth-icon');
        icons.add(svg);
        observer.observe(svg);
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
      mutations.disconnect();
      observer.disconnect();
      cancelAnimationFrame(frame);
      resetTilt();
      document.removeEventListener('pointermove', pointer);
      window.removeEventListener('blur', resetTilt);
      icons.forEach(svg => {
        svg.classList.remove('realm-depth-icon', 'realm-icon-visible');
        svg.style.removeProperty('--icon-delay');
      });
    };
  }, []);
}
