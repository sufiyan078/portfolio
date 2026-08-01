import React from 'react';

export const AnimatedShieldCheckIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes shieldPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      @keyframes checkPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.15); opacity: 0.8; }
      }
      .shield-body { animation: shieldPulse 2.5s ease-in-out infinite; }
      .check-mark { transform-origin: 12px 11px; animation: checkPulse 1.8s ease-in-out infinite alternate; }
    `}</style>
    
    <path className="shield-body" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path className="check-mark" d="M9 12l2 2 4-4" strokeWidth="2.2" />
  </svg>
);
