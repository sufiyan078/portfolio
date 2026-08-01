import React from 'react';

export const AnimatedSearchIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes searchScanMotion {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(1px, -1.5px) rotate(4deg); }
        50% { transform: translate(-1px, -1px) rotate(-4deg); }
        75% { transform: translate(1px, 1px) rotate(2deg); }
      }
      @keyframes searchBeamGlow {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.85); }
      }
      .animated-search-group { transform-origin: 11px 11px; animation: searchScanMotion 2.2s ease-in-out infinite; }
      .search-lens-beam { transform-origin: 11px 11px; animation: searchBeamGlow 1.2s ease-in-out infinite alternate; }
    `}</style>
    
    <g className="animated-search-group">
      <circle className="search-lens-beam" cx="11" cy="11" r="7.5" strokeWidth="2.2" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" strokeWidth="2.4" />
      <path d="M9 8a3.5 3.5 0 0 1 3.5 3.5" strokeWidth="1.4" opacity="0.8" />
    </g>
  </svg>
);
