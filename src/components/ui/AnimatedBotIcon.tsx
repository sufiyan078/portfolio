import React from 'react';

export const AnimatedBotIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes antennaSignal {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.4); opacity: 0.5; }
      }
      @keyframes robotEyeBlink {
        0%, 90%, 100% { transform: scaleY(1); }
        95% { transform: scaleY(0.15); }
      }
      @keyframes botBob {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-1.2px); }
      }
      .bot-antenna-signal { transform-origin: 12px 3px; animation: antennaSignal 1.5s ease-in-out infinite; }
      .bot-eye-blink { transform-origin: 12px 11.5px; animation: robotEyeBlink 3.5s ease-in-out infinite; }
      .bot-head-bob { animation: botBob 3s ease-in-out infinite; }
    `}</style>
    
    <g className="bot-head-bob">
      {/* Top Antenna Stem & Pulsing Signal Beacon Bulb */}
      <path d="M12 7V4" />
      <circle className="bot-antenna-signal" cx="12" cy="3" r="1.5" fill="currentColor" />

      {/* Main Retro Robot Screen Head */}
      <rect x="4" y="7" width="16" height="11" rx="2.5" strokeWidth="1.8" />

      {/* Side Ear Bolt Caps */}
      <path d="M2 11.5h2M20 11.5h2" strokeWidth="2" />

      {/* Animated Robot Eyes (Arched eye shapes matching user screenshot) */}
      <g className="bot-eye-blink">
        <path d="M8 13.5v-2a1.5 1.5 0 0 1 3 0v2" fill="currentColor" />
        <path d="M13 13.5v-2a1.5 1.5 0 0 1 3 0v2" fill="currentColor" />
      </g>

      {/* Neck Stand Base */}
      <path d="M9.5 18l-1.5 3h8l-1.5-3" strokeWidth="1.5" />
    </g>
  </svg>
);
