/** Timeline navigation changes scroll position only; it has no access to vault traversal. */
export function revealStoryTarget(id: string) {
  const timeline = document.querySelector('.realm-timeline');
  const references = ['inventory','boss-battles','achievements','quest-log'];
  if (timeline && references.includes(id)) { window.dispatchEvent(new CustomEvent('realm:reference',{detail:id})); return; }
  if (timeline && document.querySelector('.realm-reference-modal')) { window.dispatchEvent(new CustomEvent('realm:leave-reference',{detail:id})); return; }
  const aliases: Record<string,string> = { 'chapter-builder':'builder','chapter-forge':'capabilities','chapter-vault':'missions','chapter-architecture':'architecture','chapter-profile':'profile','chapter-signal':'contact','journey':'builder','principles':'principles' };
  const key = aliases[id] ?? id;
  const markers = [...document.querySelectorAll<HTMLElement>('[data-timeline-target]')];
  const marker = markers.find(node => node.dataset.timelineTarget === key);
  const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
  if (marker) {
    const track = marker.closest<HTMLElement>('.realm-distance');
    if (track && !timeline?.classList.contains('realm-reading')) {
      const top = track.getBoundingClientRect().top + scrollY;
      window.scrollTo({top:top + Number(marker.dataset.storyAt) * (track.offsetHeight - innerHeight),behavior});
      return;
    }
  }
  const target = document.getElementById(key);
  if (!target) return;
  let parent = target.parentElement;
  while (parent) { if (parent instanceof HTMLDetailsElement) parent.open = true; parent = parent.parentElement; }
  requestAnimationFrame(() => target.scrollIntoView({behavior}));
}
