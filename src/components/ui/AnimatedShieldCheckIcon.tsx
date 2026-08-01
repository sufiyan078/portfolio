import React from 'react';

export const AnimatedShieldCheckIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes shieldBounce {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.08); opacity: 0.85; }
      }
      @keyframes checkPulseGlow {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.6; }
      }
      .shield-frame-anim { transform-origin: 12px 12px; animation: shieldBounce 2s ease-in-out infinite; }
      .check-mark-anim { transform-origin: 12px 11px; animation: checkPulseGlow 1.2s ease-in-out infinite alternate; }
    `}</style>
    
    <g className="shield-frame-anim">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2.2" />
    </g>
    <path className="check-mark-anim" d="M9 12l2.2 2.2 4.3-4.3" strokeWidth="2.5" />
  </svg>
);
