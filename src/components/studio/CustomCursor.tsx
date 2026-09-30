import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './cursor.css';

type CursorMode = 'default' | 'hand' | 'arrow';

function parseColorLuminance(colorStr: string): number {
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return 0.5;
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function getRangeFromPoint(x: number, y: number): Range | null {
  if (typeof document === 'undefined') return null;
  if (document.caretRangeFromPoint) {
    return document.caretRangeFromPoint(x, y);
  }
  const doc = document as any;
  if (doc.caretPositionFromPoint) {
    const pos = doc.caretPositionFromPoint(x, y);
    if (pos && pos.offsetNode) {
      const range = document.createRange();
      range.setStart(pos.offsetNode, pos.offset);
      range.setEnd(pos.offsetNode, pos.offset);
      return range;
    }
  }
  return null;
}

function isOverAlphabetGlyph(x: number, y: number): 'white' | 'black' | null {
  const range = getRangeFromPoint(x, y);
  if (!range) return null;

  const node = range.startContainer;
  if (node.nodeType === Node.TEXT_NODE && node.textContent) {
    const text = node.textContent;
    const offset = range.startOffset;

    // 1. Must be within text bounds and strictly non-whitespace
    if (offset < 0 || offset >= text.length) return null;
    const char = text[offset];
    if (!char || /\s/.test(char)) return null;

    // 2. Measure ONLY the exact single character glyph
    const charRange = document.createRange();
    try {
      charRange.setStart(node, offset);
      charRange.setEnd(node, offset + 1);

      const rects = charRange.getClientRects();
      if (rects.length === 0) return null;

      const parent = node.parentElement;
      if (!parent) return null;

      const style = window.getComputedStyle(parent);
      const fontSize = parseFloat(style.fontSize) || 16;

      for (let i = 0; i < rects.length; i++) {
        const r = rects[i];

        // Strict horizontal bounds: must be inside character advance
        if (x < r.left || x > r.right) continue;

        // Strict vertical bounds: exclude empty line leading above and below
        const glyphTop = r.bottom - fontSize * 0.92;
        const glyphBottom = r.bottom + fontSize * 0.12;

        if (y >= glyphTop && y <= glyphBottom) {
          const color = style.color;
          const lum = parseColorLuminance(color);
          // If the alphabet is dark (black/dark text) -> cursor turns WHITE!
          // If the alphabet is light (white/cream text) -> cursor turns BLACK!
          return lum < 0.5 ? 'white' : 'black';
        }
      }
    } catch {
      // Fallback on boundary issues
    }
  }
  return null;
}

function getBackgroundLuminance(x: number, y: number): 'white' | 'black' {
  if (typeof document === 'undefined') return 'black';
  const el = document.elementFromPoint(x, y);
  if (!el) return 'black';

  // Explicit dark components / sections
  if (
    el.closest(
      '.theme-dark, .theme-matrix, .button, .header-cta, .studio-footer, .report-source, .career-analysis, [data-theme="dark"], .bg-black'
    )
  ) {
    return 'white';
  }

  // Walk up ancestors for solid background
  let current: HTMLElement | null = el as HTMLElement;
  while (current && current !== document.documentElement && current !== document.body) {
    const bg = window.getComputedStyle(current).backgroundColor;
    if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (match) {
        const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
        if (a > 0.3) {
          const lum = parseColorLuminance(bg);
          return lum < 0.5 ? 'white' : 'black';
        }
      }
    }
    current = current.parentElement;
  }

  if (el.closest('.studio-hero')) {
    return 'white';
  }

  // Default portfolio surface (--paper = #F2EFE7) is light
  return 'black';
}

function getCursorColorAt(x: number, y: number): 'white' | 'black' {
  // 1. First priority: is cursor directly touching an alphabet character glyph?
  const alphabetColor = isOverAlphabetGlyph(x, y);
  if (alphabetColor !== null) {
    return alphabetColor;
  }

  // 2. Otherwise: color strictly based on background
  return getBackgroundLuminance(x, y);
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

    // Initialize with black dot for light paper surface
    dot.style.backgroundColor = '#0c1e29';
    dot.style.boxShadow = '0 0 0 1px rgba(255, 255, 255, 0.45)';

    const mouse = { x: -200, y: -200 };
    const spring = { x: -200, y: -200 };
    let entered = false;
    let animId: number;

    const SELECTOR = 'a, button, [role="button"], summary, input, select, textarea, .hoverable';

    const updateColor = (x: number, y: number) => {
      const color = getCursorColorAt(x, y);
      if (color !== currentColorRef.current) {
        currentColorRef.current = color;
        if (color === 'white') {
          dot.style.backgroundColor = '#ffffff';
          dot.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.45)';
          if (hand) hand.style.filter = 'invert(0) drop-shadow(0 2px 8px rgba(0,0,0,0.6))';
          if (arrow) {
            arrow.style.backgroundColor = '#ffffff';
            arrow.style.color = '#0c1e29';
            arrow.style.borderColor = 'rgba(0, 0, 0, 0.15)';
          }
        } else {
          dot.style.backgroundColor = '#0c1e29';
          dot.style.boxShadow = '0 0 0 1px rgba(255, 255, 255, 0.45)';
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

      const arrowTarget = target.closest(
        '[hover-arrow], [data-cursor="arrow"], .case-link, .header-cta, .hero-actions a, .work-visual-link'
      );
      if (arrowTarget) {
        setMode('arrow');
        return;
      }

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

  return createPortal(
    <div
      className={`mecha-cursor-host ${isVisible ? 'is-visible' : 'is-hidden'}`}
      aria-hidden="true"
    >
      {/* 8x8px square dot with strict glyph & background color switching */}
      <div
        ref={dotRef}
        className={`custom-cursor art ${mode === 'default' ? 'is-active' : ''}`}
      />

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
    </div>,
    document.body
  );
}
