import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './cursor.css';

type CursorMode = 'default' | 'hand' | 'arrow';

function parseColorLuminance(colorStr: string): number {
  if (!colorStr) return 1;
  const str = colorStr.trim();
  if (str.startsWith('#')) {
    const hex = str.replace('#', '');
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }
    if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }
  }
  const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }
  return 0.5;
}

function getCursorColorAt(x: number, y: number): 'white' | 'black' {
  if (typeof document === 'undefined') return 'black';
  const el = document.elementFromPoint(x, y);
  if (!el) return 'black';

  // Priority 1: When hovering directly over project art titles inside cards (e.g. Monthly / Quarterly / CareerAI)
  const titleEl = el.closest('.project-art-title span, .project-art-title small');
  if (titleEl) {
    const textColor = window.getComputedStyle(titleEl).color;
    const textLum = parseColorLuminance(textColor);
    return textLum > 0.5 ? 'black' : 'white';
  }

  // Priority 2: Buttons, CTAs, and explicit theme containers
  if (el.closest('.header-cta, .studio-hero .button, .contact-form-wrap .button')) {
    return 'white';
  }

  // Priority 3: Traverse up ancestors to evaluate background luminance
  let current: HTMLElement | null = el as HTMLElement;
  while (current && current !== document.documentElement) {
    if (
      current.classList.contains('theme-dark') ||
      current.classList.contains('theme-matrix') ||
      current.classList.contains('studio-hero') ||
      current.classList.contains('contact-form-wrap') ||
      current.classList.contains('studio-footer') ||
      current.classList.contains('studio-process') ||
      current.getAttribute('data-theme') === 'dark' ||
      current.classList.contains('bg-black')
    ) {
      return 'white';
    }

    const style = window.getComputedStyle(current);
    const bg = style.backgroundColor;

    if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (match) {
        const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
        if (a > 0.25) {
          const lum = parseColorLuminance(bg);
          return lum < 0.5 ? 'white' : 'black';
        }
      }
    }

    current = current.parentElement;
  }

  if (document.body) {
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    if (bodyBg && bodyBg !== 'transparent' && bodyBg !== 'rgba(0, 0, 0, 0)') {
      const lum = parseColorLuminance(bodyBg);
      return lum < 0.5 ? 'white' : 'black';
    }
  }

  return 'black';
}

export function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const currentColorRef = useRef<'white' | 'black'>('black');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const hand = handRef.current;
    const arrow = arrowRef.current;
    if (!dot) return;

    // Initialize hand & arrow default contrast on light canvas
    if (arrow) {
      arrow.style.backgroundColor = '#0c1e29';
      arrow.style.color = '#ffffff';
      arrow.style.borderColor = 'rgba(255, 255, 255, 0.25)';
    }
    if (hand) {
      hand.style.filter = 'invert(1) drop-shadow(0 2px 6px rgba(0,0,0,0.25))';
    }

    const mouse = { x: -200, y: -200 };
    const spring = { x: -200, y: -200 };
    let entered = false;
    let animId: number;

    const SELECTOR = 'a, button, [role="button"], [role="tab"], [role="option"], [role="menuitem"], [role="checkbox"], [role="radio"], [role="switch"], summary, input, select, textarea, label, .hoverable';

    const updateColor = (x: number, y: number) => {
      const color = getCursorColorAt(x, y);
      if (color !== currentColorRef.current) {
        currentColorRef.current = color;
        if (color === 'white') {
          if (hand) hand.style.filter = 'invert(0) drop-shadow(0 2px 8px rgba(0,0,0,0.6))';
          if (arrow) {
            arrow.style.backgroundColor = '#ffffff';
            arrow.style.color = '#0c1e29';
            arrow.style.borderColor = 'rgba(0, 0, 0, 0.15)';
          }
        } else {
          if (hand) hand.style.filter = 'invert(1) drop-shadow(0 2px 6px rgba(0,0,0,0.25))';
          if (arrow) {
            arrow.style.backgroundColor = '#0c1e29';
            arrow.style.color = '#ffffff';
            arrow.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          }
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!entered) {
        entered = true;
        setIsVisible(true);
        mouse.x = spring.x = e.clientX;
        mouse.y = spring.y = e.clientY;
      } else {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }

      updateColor(e.clientX, e.clientY);
    };

    const onMouseEnter = (e: MouseEvent) => {
      entered = true;
      setIsVisible(true);
      mouse.x = spring.x = e.clientX;
      mouse.y = spring.y = e.clientY;
      updateColor(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      entered = false;
      setIsVisible(false);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hoverTarget = target.closest(SELECTOR);
      if (hoverTarget) {
        setMode('hand');
        return;
      }

      const arrowTarget = target.closest(
        '[hover-arrow], [data-cursor="arrow"], .case-link, .header-cta, .hero-actions a, .work-visual-link'
      );
      if (arrowTarget) {
        setMode('arrow');
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

      const hoverTarget = related.closest(SELECTOR);
      if (hoverTarget) {
        setMode('hand');
        return;
      }

      const arrowTarget = related.closest(
        '[hover-arrow], [data-cursor="arrow"], .case-link, .header-cta, .hero-actions a, .work-visual-link'
      );
      if (arrowTarget) {
        setMode('arrow');
        return;
      }

      setMode('default');
    };

    // Smooth spring physics loop (0.14 lerp exactly matching mecha-xyz.webflow.io)
    const animate = () => {
      spring.x += (mouse.x - spring.x) * 0.14;
      spring.y += (mouse.y - spring.y) * 0.14;

      const sx = spring.x;
      const sy = spring.y;

      dot.style.transform = `translate3d(${sx}px, ${sy}px, 0px) translate(-50%, -50%)`;
      if (hand) {
        hand.style.transform = `translate3d(${sx}px, ${sy}px, 0px)`;
      }
      if (arrow) {
        arrow.style.transform = `translate3d(${sx}px, ${sy}px, 0px) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(animate);
    };

    const onScroll = () => {
      if (entered) {
        updateColor(mouse.x, mouse.y);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return createPortal(
    <>
      {/* 8x8px square dot with GPU difference blending: direct child of document.body */}
      <div
        ref={dotRef}
        className={`custom-cursor art ${mode === 'default' && isVisible ? 'is-active' : ''}`}
        aria-hidden="true"
      />

      {/* Normal host: interactive hand cursor and directional arrow badge */}
      <div
        className={`mecha-cursor-host ${isVisible ? 'is-visible' : 'is-hidden'}`}
        aria-hidden="true"
      >
        {/* Cyber hand cursor on interactive elements */}
        <div
          ref={handRef}
          className={`hand-cursor ${mode === 'hand' ? 'is-active' : ''}`}
        >
          <img
            src="/cursor-hand.png"
            alt=""
            width="20"
            height="25"
            draggable={false}
          />
        </div>

        {/* Directional 45-degree arrow badge */}
        <div
          ref={arrowRef}
          className={`arrow-cursor ${mode === 'arrow' ? 'is-active' : ''}`}
        >
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
      </div>
    </>,
    document.body
  );
}
