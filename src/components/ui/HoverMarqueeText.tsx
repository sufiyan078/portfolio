import React, { useRef, useState, useEffect, useCallback } from 'react';

interface HoverMarqueeTextProps {
  text: string;
  className?: string;
  containerClassName?: string;
  speed?: number; // pixels per second, default: 32
  title?: string;
  forceHover?: boolean;
}

export const HoverMarqueeText: React.FC<HoverMarqueeTextProps> = ({
  text,
  className = '',
  containerClassName = '',
  speed = 32,
  title,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const animRef = useRef<Animation | null>(null);

  const [dist, setDist] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);

  // Dynamic overflow measurement based on rendered text vs container width
  const measure = useCallback(() => {
    if (!containerRef.current || !textRef.current) return;
    const containerW = containerRef.current.clientWidth;
    if (containerW <= 0) return;

    // Temporarily unconstrain to read true natural unclipped text width
    const el = textRef.current;
    const prevMaxW = el.style.maxWidth;
    const prevOverflow = el.style.overflow;
    const prevDisplay = el.style.display;
    const prevTextOverflow = el.style.textOverflow;

    el.style.display = 'inline-block';
    el.style.maxWidth = 'none';
    el.style.overflow = 'visible';
    el.style.textOverflow = 'clip';

    const textW = Math.ceil(
      el.getBoundingClientRect().width || el.scrollWidth
    );

    el.style.display = prevDisplay;
    el.style.maxWidth = prevMaxW;
    el.style.overflow = prevOverflow;
    el.style.textOverflow = prevTextOverflow;

    // If unclipped text exceeds container width by > 1.5px
    if (textW > containerW + 1.5) {
      // 10px comfort buffer so end of text is not flush against edge
      setDist(Math.ceil(textW - containerW) + 10);
    } else {
      setDist(0);
    }
  }, []);

  // Measurement lifecycle (on mount, font load, resize, text change)
  useEffect(() => {
    measure();

    const t1 = setTimeout(measure, 60);
    const t2 = setTimeout(measure, 300);

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(measure);
    }

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      ro = new ResizeObserver(() => {
        measure();
      });
      ro.observe(containerRef.current);
    }

    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, text]);

  // Touch device dismiss-on-tap-outside handler
  useEffect(() => {
    if (!isTouchActive) return;

    const handleTapOutside = (e: MouseEvent | TouchEvent | PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsTouchActive(false);
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener('pointerdown', handleTapOutside, { capture: true });
      window.addEventListener('touchstart', handleTapOutside, { capture: true });
    }, 20);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', handleTapOutside, { capture: true });
      window.removeEventListener('touchstart', handleTapOutside, { capture: true });
    };
  }, [isTouchActive]);

  const isActive = (isHovered || isTouchActive) && dist > 0;

  // Animation controller: Web Animations API for exact timing & immediate stop
  useEffect(() => {
    // Immediately cancel any existing running animation
    if (animRef.current) {
      animRef.current.cancel();
      animRef.current = null;
    }

    if (!isActive || !textRef.current || dist <= 0) {
      return;
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Animation Timing:
    // 1. Initial readability pause: 700ms
    // 2. Slow right-to-left marquee: dist / speed (min 1200ms)
    // 3. Readable end pause: 2500ms (approx 2–3s)
    // 4. Smooth reset back to start: 400ms
    const startPauseMs = 700;
    const scrollDurationMs = Math.max(1200, (dist / speed) * 1000);
    const endPauseMs = 2500;
    const resetDurationMs = 400;
    const totalDurationMs =
      startPauseMs + scrollDurationMs + endPauseMs + resetDurationMs;

    const p1 = startPauseMs / totalDurationMs;
    const p2 = (startPauseMs + scrollDurationMs) / totalDurationMs;
    const p3 = (startPauseMs + scrollDurationMs + endPauseMs) / totalDurationMs;

    try {
      const anim = textRef.current.animate(
        [
          { transform: 'translateX(0px)', offset: 0, easing: 'linear' },
          { transform: 'translateX(0px)', offset: p1, easing: 'linear' },
          { transform: `translateX(-${dist}px)`, offset: p2, easing: 'linear' },
          { transform: `translateX(-${dist}px)`, offset: p3, easing: 'ease-in-out' },
          { transform: 'translateX(0px)', offset: 1 },
        ],
        {
          duration: totalDurationMs,
          iterations: Infinity,
        }
      );
      animRef.current = anim;
    } catch {
      // Fallback in environments without Web Animations API
    }

    return () => {
      if (animRef.current) {
        animRef.current.cancel();
        animRef.current = null;
      }
    };
  }, [isActive, dist, speed]);

  // Pointer event handlers (Desktop mouse hover)
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    measure();
    if (dist > 0) {
      setIsHovered(true);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    setIsHovered(false);
  };

  // Touch event handler (Mobile tap activation)
  const handleClick = (e: React.MouseEvent) => {
    if (dist > 0) {
      measure();
      setIsTouchActive((prev) => !prev);
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      title={title || text}
      className={`hover-marquee-root relative overflow-hidden whitespace-nowrap max-w-full min-w-0 ${
        dist > 0 ? 'is-overflowing cursor-help' : ''
      } ${containerClassName}`}
    >
      <span
        ref={textRef}
        className={`hover-marquee-text inline-block whitespace-nowrap ${
          isActive ? 'is-animating' : 'truncate max-w-full'
        } ${className}`}
      >
        {text}
      </span>
    </div>
  );
};

