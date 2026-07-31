import React from 'react';

export const AnimatedRocketIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes rocketFly {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(1.2px, -1.5px); }
      }
      @keyframes thrustFlicker {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(0.85); }
      }
      @keyframes eyeGlint {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.25); }
      }
      .rocket-ship { animation: rocketFly 1.8s ease-in-out infinite; }
      .thrust-trail { transform-origin: 6px 18px; animation: thrustFlicker 0.4s ease-in-out infinite alternate; }
      .window-glint { transform-origin: 14.5px 8.5px; animation: eyeGlint 2s ease-in-out infinite; }
    `}</style>
    
    <g className="rocket-ship">
      {/* Lightning Flame Thrust Trail (Matching Screenshot 2) */}
      <g className="thrust-trail">
        <path d="M7.5 17L4.5 18.5L6 19.5L2 22L7.5 19.5L6.5 18.5Z" fill="currentColor" strokeWidth="1" />
      </g>

      {/* Top Fin / Wing */}
      <path d="M11 8.5C9 5.5 5 7 7.5 12" strokeWidth="1.6" />

      {/* Bottom Fin / Leg */}
      <path d="M12.5 15.5C11 18.5 13 20.5 15.5 17.5" strokeWidth="1.6" />

      {/* Main Rocket Torpedo Body (Matching Screenshot 2 Nose & Curves) */}
      <path d="M7 16C8 10 16 4 22 2C20 10 14 18 8.5 17C7.5 17 7 16.5 7 16Z" strokeWidth="1.8" />

      {/* Rear Nozzle Cap Rim */}
      <path d="M7 16L8.5 17" strokeWidth="2" />

      {/* Porthole Window with Pupil (Matching Screenshot 2) */}
      <circle cx="14.5" cy="8.5" r="2.2" strokeWidth="1.5" />
      <circle className="window-glint" cx="14.5" cy="8.5" r="0.9" fill="currentColor" />
    </g>
  </svg>
);
