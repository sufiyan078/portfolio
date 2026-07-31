import React from 'react';

export const AnimatedSpeedometerIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes needleSweep {
        0% { transform: rotate(-50deg); }
        50% { transform: rotate(50deg); }
        100% { transform: rotate(-50deg); }
      }
      @keyframes flamePulse {
        0%, 100% { opacity: 1; transform: translateX(0); }
        50% { opacity: 0.5; transform: translateX(-1.5px); }
      }
      .speed-needle { transform-origin: 13px 14px; animation: needleSweep 2.2s ease-in-out infinite; }
      .speed-dashes { animation: flamePulse 0.8s ease-in-out infinite; }
    `}</style>
    
    {/* Speed Motion Dashes on Left */}
    <g className="speed-dashes" strokeWidth="1.5">
      <path d="M2 9h3.5" />
      <path d="M1 13h4.5" />
      <path d="M2.5 17h3" />
    </g>

    {/* Centered Speedometer Outer Arc Gauge */}
    <path d="M7 16a7 7 0 1 1 12 0" strokeWidth="2" />
    
    {/* Inner Speed Indicator Ticks */}
    <path d="M9.5 11a4.5 4.5 0 0 1 7 0" strokeDasharray="1 2" strokeWidth="1.4" />

    {/* Animated Sweeping Gauge Needle */}
    <g className="speed-needle">
      <path d="M13 14L17 7.5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="13" cy="14" r="1.5" fill="currentColor" />
    </g>

    {/* Sleek Flame Trail Wisp */}
    <path d="M5.5 10c-1.5-2 0-4.5 3-4.5 1.5 1 2 2 1.2 3.5" strokeWidth="1.4" />
  </svg>
);
