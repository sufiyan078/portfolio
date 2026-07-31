import React from 'react';

export const AnimatedRocketIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes rocketThrust {
        0% { transform: translate(0, 0); }
        50% { transform: translate(1.2px, -1.8px); }
        100% { transform: translate(0, 0); }
      }
      @keyframes flamePulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.55; transform: scale(0.85); }
      }
      @keyframes exhaustSmoke {
        0% { opacity: 0.9; transform: translate(0, 0); }
        100% { opacity: 0; transform: translate(-3.5px, 3.5px); }
      }
      .rocket-body { animation: rocketThrust 1.8s ease-in-out infinite; }
      .rocket-flame { transform-origin: 5px 19px; animation: flamePulse 0.4s ease-in-out infinite alternate; }
      .rocket-smoke { animation: exhaustSmoke 0.8s linear infinite; }
    `}</style>
    
    <g className="rocket-body">
      {/* Rocket Main Hull Body */}
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 2 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z" />
      <path d="M9 12l-5 5" />
      <path d="M15 12l5 5" />

      {/* Thrust Flame Core (Bottom Left Nozzle) */}
      <path className="rocket-flame" d="M4.5 19.5c-1 1-2.5 1.5-3.5 1.5.5-1 1-2.5 2-3.5" fill="currentColor" strokeWidth="1.5" />

      {/* Particle Sparks */}
      <circle className="rocket-smoke" cx="3" cy="21" r="0.8" fill="currentColor" />
    </g>
  </svg>
);
