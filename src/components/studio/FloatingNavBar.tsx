import React, { useEffect, useState, useCallback, useRef } from 'react';
import { projectPresentation, type ProjectId } from './projectPresentation';

interface FloatingNavBarProps {
  activeCase?: ProjectId | null;
  onCloseCase?: () => void;
  onNavigate?: (id: string) => void;
}

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const FloatingNavBar: React.FC<FloatingNavBarProps> = ({
  activeCase = null,
  onCloseCase,
  onNavigate,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverKey, setHoverKey] = useState(0);

  // Directly and reliably track scroll progress for the progressive dark fill
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)';
        return;
      }
      const remaining = scrollHeight - scrollTop;
      const progress = remaining <= 5 ? 1 : Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [activeCase]);

  // Track active visible section
  useEffect(() => {
    if (activeCase) return;

    const sectionIds = ['top', 'work', 'services', 'process', 'about', 'contact'];
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      entries => {
        // Find visible entries
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          // Sort by visibility ratio / position
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const currentId = visible[0].target.id;
          if (currentId !== 'top') {
            setActiveSection(currentId);
          } else {
            setActiveSection('');
          }
        }
      },
      {
        threshold: [0.15, 0.4, 0.7],
        rootMargin: '-10% 0px -40% 0px',
      }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCase]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      if (activeCase && onCloseCase) {
        onCloseCase();
      }
      onNavigate?.(id);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', `#${id}`);
      }
    },
    [activeCase, onCloseCase, onNavigate]
  );

  const handleMouseEnter = (id: string) => {
    setHoveredItem(id);
    setHoverKey(k => k + 1);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // If a case study is open, show the contextual bar
  if (activeCase) {
    const presentation = projectPresentation[activeCase];
    return (
      <nav className="floating-nav" aria-label="Case study navigation">
        <div className="floating-nav__container is-case-active">
          <div
            ref={progressRef}
            className="floating-nav__progress"
            aria-hidden="true"
          />
          <button
            type="button"
            className="floating-nav__back-btn"
            onClick={onCloseCase}
            aria-label="Back to selected work"
          >
            <span className="back-arrow" aria-hidden="true">←</span>
            <span className="back-text">Back to Work</span>
          </button>
          <span className="floating-nav__case-divider" aria-hidden="true">/</span>
          <span className="floating-nav__case-title">
            {presentation ? presentation.shortName : 'Case Study'}
          </span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="floating-nav" aria-label="Floating section navigation">
      <div className="floating-nav__container">
        {/* Scroll Progress Fill Layer (Tracks scroll position from 0 to 1) */}
        <div
          ref={progressRef}
          className="floating-nav__progress"
          aria-hidden="true"
        />

        {/* Navigation Links with Ripple Hover Effect */}
        <div className="floating-nav__links">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = activeSection === id;
            const isHovered = hoveredItem === id;

            return (
              <a
                key={id}
                href={`#${id}`}
                className={`floating-nav__link ${isActive ? 'is-active' : ''}`}
                onClick={e => handleLinkClick(e, id)}
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="floating-nav__label" aria-hidden="true">
                  {label.split('').map((char, charIdx) => (
                    <span
                      key={`${charIdx}-${isHovered ? hoverKey : 0}`}
                      className="nav-char"
                      style={
                        isHovered
                          ? { animationDelay: `${charIdx * 0.035}s` }
                          : undefined
                      }
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="sr-only">{label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
