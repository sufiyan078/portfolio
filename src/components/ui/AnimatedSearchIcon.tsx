import React from 'react';

export const AnimatedSearchIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes searchScan {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-1px, -1px) scale(1.08); }
      }
      @keyframes lensGlow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
      .animated-search-group { transform-origin: 11px 11px; animation: searchScan 2.5s ease-in-out infinite; }
      .lens-beam { animation: lensGlow 1.8s ease-in-out infinite alternate; }
    `}</style>
    
    <g className="animated-search-group">
      <circle className="lens-beam" cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </g>
  </svg>
);
