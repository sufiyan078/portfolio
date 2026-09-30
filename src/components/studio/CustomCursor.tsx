import { useEffect, useRef, useState } from 'react';
import './cursor.css';

type CursorMode = 'default' | 'hand' | 'arrow' | 'hidden';

export function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const blendWrapperRef = useRef<HTMLDivElement>(null);
  const normalWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate custom cursor on fine-pointer devices (desktops/laptops with a mouse)
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const blendEl = blendWrapperRef.current;
    const normalEl = normalWrapperRef.current;
    if (!blendEl || !normalEl) return;

    const mouse = { x: -200, y: -200 };
    const spring = { x: -200, y: -200 };
    let entered = false;
    let animId: number;

    const SELECTOR = 'a, button, [role="button"], summary, input, select, textarea, .hoverable, label';

    const onMouseMove = (e: MouseEvent) => {
      if (!entered) {
        entered = true;
        setIsVisible(true);
        mouse.x = spring.x = e.clientX;
        mouse.y = spring.y = e.clientY;
        return;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseEnter = (e: MouseEvent) => {
      entered = true;
      setIsVisible(true);
      mouse.x = spring.x = e.clientX;
      mouse.y = spring.y = e.clientY;
    };

    const onMouseLeave = () => {
      entered = false;
      setIsVisible(false);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for arrow cursor targets (external links, case study links, arrow badges)
      const arrowTarget = target.closest(
        '[hover-arrow], [data-cursor="arrow"], .case-link, .header-cta, .hero-actions a, .work-visual-link'
      );
      if (arrowTarget) {
        setMode('arrow');
        return;
      }

      // Check for general interactive/hoverable elements (buttons, nav links, summaries, etc.)
      const hoverTarget = target.closest(SELECTOR);
      if (hoverTarget) {
        setMode('hand');
        return;
      }

      setMode('default');
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related) {
        setMode('default');
        return;
      }

      const arrowTarget = related.closest(
        '[hover-arrow], [data-cursor="arrow"], .case-link, .header-cta, .hero-actions a, .work-visual-link'
      );
      if (arrowTarget) {
        setMode('arrow');
        return;
      }

      const hoverTarget = related.closest(SELECTOR);
      if (hoverTarget) {
        setMode('hand');
        return;
      }

      setMode('default');
    };

    // Smooth spring physics loop (0.14 lerp matching mecha-xyz.webflow.io)
    const animate = () => {
      spring.x += (mouse.x - spring.x) * 0.14;
      spring.y += (mouse.y - spring.y) * 0.14;

      const cx = spring.x - window.innerWidth / 2;
      const cy = spring.y - window.innerHeight / 2;

      const transformStr = `translate3d(${cx}px, ${cy}px, 0px)`;
      blendEl.style.transform = transformStr;
      normalEl.style.transform = transformStr;

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`mecha-cursor-host ${isVisible ? 'is-visible' : 'is-hidden'}`}
      aria-hidden="true"
    >
      {/* Normal blend container for hand and arrow icons */}
      <div ref={normalWrapperRef} className="cursor-wrap not-blend">
        <div className={`arrow-cursor ${mode === 'arrow' ? 'is-active' : ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 11 11"
            fill="none"
          >
            <path
              d="M9.625 1.375L1.375 9.625"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.125 1.375H9.625V6.875"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={`hand-cursor ${mode === 'hand' ? 'is-active' : ''}`}>
          <img
            src="/cursor-hand.png"
            alt=""
            width="20"
            height="25"
            draggable={false}
          />
        </div>
      </div>

      {/* Exclusion blend container for the crisp 8x8px square dot */}
      <div ref={blendWrapperRef} className="cursor-wrap">
        <div className={`custom-cursor art ${mode === 'default' ? 'is-active' : ''}`} />
      </div>
    </div>
  );
}
