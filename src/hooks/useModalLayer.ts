import { useLayoutEffect, type RefObject } from 'react';

const layers: HTMLElement[] = [];
let restorePage: (() => void) | undefined;

/** Keep keyboard focus inside the topmost portal, preserving nested scroll locks. */
export function useModalLayer(active: boolean, ref: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const node = ref.current;
    if (!active || !node) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const root = document.getElementById('root');
    if (!layers.length) {
      const bodyOverflow = document.body.style.overflow;
      const htmlOverflow = document.documentElement.style.overflow;
      const rootInert = root?.inert ?? false;
      restorePage = () => {
        document.body.style.overflow = bodyOverflow;
        document.documentElement.style.overflow = htmlOverflow;
        if (root) root.inert = rootInert;
      };
    }
    const parent = layers.at(-1);
    if (parent) parent.inert = true;
    layers.push(node);
    if (root) root.inert = true;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    const focusable = () => Array.from(node.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
    )).filter(el => el.getClientRects().length && !el.closest('[inert]'));
    node.focus({ preventScroll: true });
    const trap = (event: KeyboardEvent) => {
      if (layers.at(-1) !== node || event.key !== 'Tab') return;
      const items = focusable();
      const current = items.indexOf(document.activeElement as HTMLElement);
      if (!items.length || current === -1 || (event.shiftKey ? current === 0 : current === items.length - 1)) {
        event.preventDefault();
        (event.shiftKey ? items.at(-1) : items[0])?.focus();
      }
    };
    document.addEventListener('keydown', trap);
    return () => {
      document.removeEventListener('keydown', trap);
      layers.splice(layers.indexOf(node), 1);
      const top = layers.at(-1);
      if (top) top.inert = false;
      else { restorePage?.(); restorePage = undefined; }
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [active, ref]);
}
