import React, { useEffect, useRef, useState } from 'react';

export interface LiquidTextMorphProps {
  statements?: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
}

const DEFAULT_STATEMENTS = [
  'Complexity,<br/>meet <em>clarity.</em>',
  'Ambition,<br/>meet <em>momentum.</em>',
  'Ideas,<br/>meet <em>execution.</em>'
];

export const LiquidTextMorph: React.FC<LiquidTextMorphProps> = ({
  statements = DEFAULT_STATEMENTS,
  morphTime = 0.95,
  cooldownTime = 2.2,
  className = ''
}) => {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const [currentText, setCurrentText] = useState(() =>
    (statements[0] || '').replace(/<[^>]*>/g, ' ')
  );

  useEffect(() => {
    if (!statements || statements.length === 0) return;

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (text1Ref.current) {
        text1Ref.current.innerHTML = statements[0];
        text1Ref.current.style.opacity = '1';
        text1Ref.current.style.filter = '';
      }
      return;
    }

    let textIndex = 0;
    let time = performance.now();
    let morph = 0;
    let cooldown = cooldownTime;
    let animId = 0;
    let dwellTimer = 0;
    const phone = window.matchMedia('(max-width: 640px)').matches;
    let visible = true;
    let disposed = false;
    const cancelPhoneFrame = () => {
      cancelAnimationFrame(animId);
      window.clearTimeout(dwellTimer);
      animId = 0;
      dwellTimer = 0;
    };

    const setContent = () => {
      const current = statements[textIndex % statements.length];
      const next = statements[(textIndex + 1) % statements.length];

      if (text1Ref.current) {
        text1Ref.current.innerHTML = current;
        text1Ref.current.style.opacity = '1';
        text1Ref.current.style.filter = '';
      }
      if (text2Ref.current) {
        text2Ref.current.innerHTML = next;
        text2Ref.current.style.opacity = '0';
        text2Ref.current.style.filter = '';
      }
      setCurrentText(current.replace(/<[^>]*>/g, ' '));
    };

    setContent();

    const animate = (now: number) => {
      animId = 0;
      if (phone && (disposed || !visible || document.hidden)) return;
      const dt = (now - time) / 1000;
      time = now;

      if (cooldown > 0) {
        cooldown -= dt;
      } else {
        morph += dt;
        let fraction = morph / morphTime;

        if (fraction >= 1) {
          cooldown = cooldownTime;
          morph = 0;
          fraction = 0;
          textIndex++;
          setContent();
        } else {
          // Dynamic blur and opacity power curve matching the liquid threshold physics
          if (text1Ref.current && text2Ref.current) {
            // Incoming text: fraction 0 -> 1
            const blur2 = Math.min(8 / Math.max(fraction, 0.001) - 8, 100);
            const opacity2 = Math.min(100, 100 * Math.pow(fraction, 0.4));
            text2Ref.current.style.filter = `blur(${blur2}px)`;
            text2Ref.current.style.opacity = `${opacity2}%`;

            // Outgoing text: fraction 0 -> 1 (inv 1 -> 0)
            const inv = Math.max(1 - fraction, 0.0001);
            const blur1 = Math.min(8 / inv - 8, 100);
            const opacity1 = Math.min(100, 100 * Math.pow(inv, 0.4));
            text1Ref.current.style.filter = `blur(${blur1}px)`;
            text1Ref.current.style.opacity = `${opacity1}%`;
          }
        }
      }

      if (phone && cooldown > 0) {
        // Keep the readable dwell without rendering unchanged filtered text
        // on every phone frame. The same liquid morph runs during transitions.
        dwellTimer = window.setTimeout(() => {
          dwellTimer = 0;
          cooldown = 0;
          time = performance.now();
          if (!disposed && visible && !document.hidden) animId = requestAnimationFrame(animate);
        }, cooldown * 1000);
      } else {
        animId = requestAnimationFrame(animate);
      }
    };

    const resumePhone = () => {
      cancelPhoneFrame();
      if (!disposed && visible && !document.hidden) {
        time = performance.now();
        animId = requestAnimationFrame(animate);
      }
    };
    const phoneObserver = phone ? new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resumePhone();
    }) : null;
    const stage = text1Ref.current?.closest('.liquid-morph-stage');
    if (phoneObserver && stage) phoneObserver.observe(stage);
    if (phone) {
      document.addEventListener('visibilitychange', resumePhone);
      window.addEventListener('pageshow', resumePhone);
    }
    animId = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelPhoneFrame();
      phoneObserver?.disconnect();
      if (phone) {
        document.removeEventListener('visibilitychange', resumePhone);
        window.removeEventListener('pageshow', resumePhone);
      }
    };
  }, [statements, morphTime, cooldownTime]);

  return (
    <div translate="no" className={`liquid-morph-stage notranslate ${className}`} aria-live="polite">
      {/* SVG Threshold Filter for Liquid Melting Effect */}
      <svg
        className="liquid-morph-filter-def"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="liquid-text-threshold" x="-25%" y="-25%" width="150%" height="150%">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      {/* Grid overlap sizer guarantees max dimensions without any CLS */}
      <span className="liquid-morph-sizer" aria-hidden="true">
        {statements.map((stmt, idx) => (
          <span
            key={idx}
            className="liquid-morph-sizer-item"
            dangerouslySetInnerHTML={{ __html: stmt }}
          />
        ))}
      </span>

      {/* Liquid morph container with SVG threshold filter applied */}
      <div className="liquid-morph-layer" style={{ filter: 'url(#liquid-text-threshold)' }}>
        <span ref={text1Ref} className="liquid-morph-text" />
        <span ref={text2Ref} className="liquid-morph-text" />
      </div>

      <span className="sr-only">{currentText}</span>
    </div>
  );
};
