import React from 'react';

export const AnimatedCircuitGearIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes gearSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes nodePulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.35); opacity: 0.6; }
      }
      @keyframes traceGlow {
        0%, 100% { stroke-dashoffset: 0; opacity: 1; }
        50% { stroke-dashoffset: 4; opacity: 0.5; }
      }
      .animated-center-gear { transform-origin: 12px 12px; animation: gearSpin 8s linear infinite; }
      .circuit-node-top { transform-origin: 12px 3px; animation: nodePulse 1.8s ease-in-out infinite; }
      .circuit-node-top-left { transform-origin: 6.5px 3.5px; animation: nodePulse 1.8s ease-in-out 0.3s infinite; }
      .circuit-node-top-right { transform-origin: 17.5px 3.5px; animation: nodePulse 1.8s ease-in-out 0.6s infinite; }
      .circuit-node-bottom { transform-origin: 12px 21px; animation: nodePulse 1.8s ease-in-out 0.9s infinite; }
      .circuit-node-bottom-left { transform-origin: 6.5px 20.5px; animation: nodePulse 1.8s ease-in-out 1.2s infinite; }
      .circuit-node-bottom-right { transform-origin: 17.5px 20.5px; animation: nodePulse 1.8s ease-in-out 1.5s infinite; }
      .circuit-traces { animation: traceGlow 2s ease-in-out infinite; }
    `}</style>
    
    {/* Top Circuit Traces (Matching Screenshot 2) */}
    <g className="circuit-traces" strokeWidth="1.6">
      <path d="M12 7.5V4.5" />
      <path d="M9.5 8.5L6.5 6.5V4.5" />
      <path d="M14.5 8.5L17.5 6.5V4.5" />
      {/* Bottom Circuit Traces (Matching Screenshot 2) */}
      <path d="M12 16.5V19.5" />
      <path d="M9.5 15.5L6.5 17.5V19.5" />
      <path d="M14.5 15.5L17.5 17.5V19.5" />
    </g>

    {/* Top 3 Pulsing Circuit Node Dots */}
    <circle className="circuit-node-top" cx="12" cy="3" r="1.4" fill="currentColor" />
    <circle className="circuit-node-top-left" cx="6.5" cy="3.5" r="1.4" fill="currentColor" />
    <circle className="circuit-node-top-right" cx="17.5" cy="3.5" r="1.4" fill="currentColor" />

    {/* Bottom 3 Pulsing Circuit Node Dots */}
    <circle className="circuit-node-bottom" cx="12" cy="21" r="1.4" fill="currentColor" />
    <circle className="circuit-node-bottom-left" cx="6.5" cy="20.5" r="1.4" fill="currentColor" />
    <circle className="circuit-node-bottom-right" cx="17.5" cy="20.5" r="1.4" fill="currentColor" />

    {/* Center Rotating Gear Cog (Matching Screenshot 2) */}
    <g className="animated-center-gear">
      <circle cx="12" cy="12" r="4.2" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2" strokeWidth="1.4" fill="currentColor" />
      {/* 8 Gear Notches */}
      <path d="M12 6.5v1.2M12 16.3v1.2M6.5 12h1.2M16.3 12h1.2M8.1 8.1l.85.85M15.05 15.05l.85.85M8.1 15.9l.85-.85M15.05 8.95l.85-.85" strokeWidth="1.8" />
    </g>
  </svg>
);
