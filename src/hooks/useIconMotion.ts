import { useEffect } from 'react';

/** Staggers smooth continuous floating animation across SVG icons, safeguarding ShieldKnightEmblem. */
export function useIconMotion() {
  useEffect(() => {
    const icons = new Set<SVGSVGElement>();
    const selector = 'svg';

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

        svg.style.setProperty('--icon-delay', `${-(icons.size % 8) * 0.38}s`);
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
      icons.forEach(svg => {
        svg.classList.remove('realm-depth-icon', 'realm-icon-visible');
        svg.style.removeProperty('--icon-delay');
      });
    };
  }, []);
}
