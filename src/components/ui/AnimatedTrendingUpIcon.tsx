import React from 'react';

export const AnimatedTrendingUpIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes lineDraw {
        0% { stroke-dashoffset: 32; opacity: 0.4; }
        50%, 100% { stroke-dashoffset: 0; opacity: 1; }
      }
      @keyframes headPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.22); opacity: 0.75; }
      }
      @keyframes sparkClimb {
        0% { transform: translate(1px, 18px); opacity: 0; }
        25% { opacity: 1; }
        75% { transform: translate(22px, 6px); opacity: 1; }
        100% { transform: translate(22px, 6px); opacity: 0; }
      }
      .trend-path { stroke-dasharray: 32; animation: lineDraw 2.5s ease-in-out infinite; }
      .arrow-head { transform-origin: 20px 9px; animation: headPulse 1.5s ease-in-out infinite alternate; }
      .climb-spark { animation: sparkClimb 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
    `}</style>
    
    {/* Dynamic Ascending Line Trace */}
    <polyline className="trend-path" points="23 6 13.5 15.5 8.5 10.5 1 18" />

    {/* Pulsing Arrowhead Tip */}
    <polyline className="arrow-head" points="17 6 23 6 23 12" />

    {/* Ascending Data Energy Spark */}
    <circle className="climb-spark" cx="0" cy="0" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
