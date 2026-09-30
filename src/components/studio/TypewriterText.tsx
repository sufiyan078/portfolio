import { useEffect, useRef, useState } from 'react';

export function TypewriterText({
  text,
  className = '',
  speed = 36,
  delay = 100,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof window === 'undefined') {
      setDisplayedText(text);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayedText(text);
      return;
    }

    let startTimer: number | undefined;
    let timer: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          startTimer = window.setTimeout(() => {
            setIsTyping(true);
            let idx = 0;
            const step = () => {
              idx++;
              setDisplayedText(text.slice(0, idx));
              if (idx < text.length) {
                timer = window.setTimeout(step, speed);
              } else {
                setIsTyping(false);
              }
            };
            step();
          }, delay);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (startTimer !== undefined) window.clearTimeout(startTimer);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [text, speed, delay]);

  return (
    <span
      ref={containerRef}
      className={`typewriter-container ${className}`}
      aria-label={text}
    >
      <span aria-hidden="true">{displayedText}</span>
      {isTyping && <span className="typewriter-cursor" aria-hidden="true" />}
    </span>
  );
}
