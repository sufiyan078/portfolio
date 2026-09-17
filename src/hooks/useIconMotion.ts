import { useEffect } from 'react';

/** Staggers smooth continuous floating animation strictly across the designated SVG icons. */
export function useIconMotion() {
  useEffect(() => {
    const icons = new Set<SVGSVGElement>();
    const selector = 'svg.realm-animated-icon';

    const visit = (node: Node, add: boolean) => {
      if (!(node instanceof Element)) return;
      const candidates = [...node.querySelectorAll<SVGSVGElement>(selector)];
      if (node instanceof SVGSVGElement && node.matches(selector)) candidates.push(node);

      for (const svg of candidates) {
        if (!add) {
          icons.delete(svg);
          continue;
        }
        if (icons.has(svg)) continue;
        if (!svg.style.animationDelay) {
          svg.style.setProperty('--icon-delay', `${-(icons.size % 8) * 0.38}s`);
        }
        icons.add(svg);
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
      icons.forEach(svg => {
        svg.style.removeProperty('--icon-delay');
      });
    };
  }, []);
}
