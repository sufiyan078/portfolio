import React from 'react';

export const AnimatedSmartphoneIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes uiCardSlide {
        0%, 100% { opacity: 0.4; transform: translateY(0); }
        50% { opacity: 1; transform: translateY(-1px); }
      }
      @keyframes signalWave {
        0%, 100% { opacity: 0.2; transform: scale(0.9); }
        50% { opacity: 1; transform: scale(1.15); }
      }
      @keyframes homeLedPulse {
        0%, 100% { opacity: 0.5; fill-opacity: 0.3; }
        50% { opacity: 1; fill-opacity: 1; }
      }
      .phone-ui-card { animation: uiCardSlide 2s ease-in-out infinite; }
      .phone-signal-wave { transform-origin: 17px 4px; animation: signalWave 1.6s ease-in-out infinite; }
      .phone-home-led { animation: homeLedPulse 1.2s ease-in-out infinite alternate; }
    `}</style>
    
    {/* Smartphone Frame Outer Body */}
    <rect x="4.5" y="3" width="13" height="18" rx="2.5" strokeWidth="2" />
    
    {/* Inner Screen App UI Elements (Highly Visible Animations) */}
    <g className="phone-ui-card">
      <rect x="7" y="6" width="8" height="2" rx="0.75" fill="currentColor" opacity="0.8" stroke="none" />
      <rect x="7" y="10" width="8" height="4" rx="1" strokeWidth="1.2" />
      <path d="M7 16.5h5" strokeWidth="1.5" />
    </g>

    {/* Home Button LED Dot */}
    <circle className="phone-home-led" cx="11" cy="18.5" r="0.9" fill="currentColor" stroke="none" />

    {/* Wireless Signal Waves (Top Right) */}
    <g className="phone-signal-wave" strokeWidth="1.5">
      <path d="M18 3a4 4 0 0 1 4 4" />
      <path d="M18 6a2 2 0 0 1 2 2" />
    </g>
  </svg>
);
