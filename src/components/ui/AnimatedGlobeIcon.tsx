import React from 'react';

export const AnimatedGlobeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes globeSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes equatorPulse {
        0%, 100% { transform: scaleX(1); opacity: 1; }
        50% { transform: scaleX(0.8); opacity: 0.6; }
      }
      .animated-globe-core { transform-origin: 12px 12px; animation: globeSpin 12s linear infinite; }
      .animated-equator { transform-origin: 12px 12px; animation: equatorPulse 3s ease-in-out infinite; }
    `}</style>
    
    {/* Outer Planet Sphere Outline */}
    <circle cx="12" cy="12" r="10" />

    {/* Spinning Globe Grid Curves */}
    <g className="animated-globe-core">
      <path className="animated-equator" d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </g>
  </svg>
);
