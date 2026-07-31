import React from 'react';

export const AnimatedTrendingUpIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes trendPulse {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(1.5px, -1.5px); }
      }
      @keyframes lineGlow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
      .animated-trend-arrow { animation: trendPulse 1.8s ease-in-out infinite; }
      .animated-trend-line { animation: lineGlow 2s ease-in-out infinite; }
    `}</style>
    
    <g className="animated-trend-arrow">
      <polyline className="animated-trend-line" points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </g>
  </svg>
);
