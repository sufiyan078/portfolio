import React from 'react';

export const AnimatedSmartphoneIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes phoneTilt {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-1.2px) rotate(2deg); }
      }
      @keyframes screenPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.65; }
      }
      @keyframes buttonPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.4); opacity: 0.5; }
      }
      .animated-phone-body { transform-origin: 12px 12px; animation: phoneTilt 3s ease-in-out infinite; }
      .animated-phone-screen { animation: screenPulse 2.2s ease-in-out infinite; }
      .animated-home-btn { transform-origin: 12px 18px; animation: buttonPulse 1.5s ease-in-out infinite alternate; }
    `}</style>
    
    <g className="animated-phone-body">
      {/* Smartphone Device Outer Frame */}
      <rect className="animated-phone-screen" x="5" y="2" width="14" height="20" rx="3" ry="3" />
      {/* Home Button Dot */}
      <line className="animated-home-btn" x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
    </g>
  </svg>
);
