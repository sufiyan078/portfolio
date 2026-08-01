import React from 'react';

export const AnimatedHeartHandshakeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes heartBeatPulse {
        0%, 100% { transform: scale(1); }
        15% { transform: scale(1.15); }
        30% { transform: scale(1); }
        45% { transform: scale(1.12); }
        60% { transform: scale(1); }
      }
      .heart-beat-anim { transform-origin: 12px 12px; animation: heartBeatPulse 1.6s ease-in-out infinite; }
    `}</style>
    
    <g className="heart-beat-anim">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" strokeWidth="2.2" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a1 1 0 0 1 1.46.08l1.38 1.54a1 1 0 0 0 1.42.07l.63-.58" strokeWidth="1.8" />
    </g>
  </svg>
);
