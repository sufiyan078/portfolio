import React from 'react';

export const AnimatedChartIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes barGrow1 {
        0%, 100% { transform: scaleY(0.45); }
        50% { transform: scaleY(1); }
      }
      @keyframes barGrow2 {
        0%, 100% { transform: scaleY(0.55); }
        50% { transform: scaleY(1.15); }
      }
      @keyframes barGrow3 {
        0%, 100% { transform: scaleY(0.35); }
        50% { transform: scaleY(0.95); }
      }
      .chart-bar-1 { transform-origin: 7px 18px; animation: barGrow1 1.6s ease-in-out infinite; }
      .chart-bar-2 { transform-origin: 12px 18px; animation: barGrow2 1.6s ease-in-out 0.25s infinite; }
      .chart-bar-3 { transform-origin: 17px 18px; animation: barGrow3 1.6s ease-in-out 0.5s infinite; }
    `}</style>
    
    {/* Chart Axis Base Frame */}
    <path d="M3 3v15a2 2 0 0 0 2 2h16" strokeWidth="2" />

    {/* Staggered Animated Growing Bar Chart Bars */}
    <path className="chart-bar-1" d="M7 18v-4" strokeWidth="2.5" />
    <path className="chart-bar-2" d="M12 18V7" strokeWidth="2.5" />
    <path className="chart-bar-3" d="M17 18v-7" strokeWidth="2.5" />
  </svg>
);
