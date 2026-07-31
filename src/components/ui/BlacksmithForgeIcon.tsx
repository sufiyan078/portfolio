import React from 'react';

export const BlacksmithForgeIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="forgeFlameGrad" x1="32" y1="0" x2="32" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF3D00" />
        <stop offset="50%" stopColor="#FF6D00" />
        <stop offset="100%" stopColor="#FFAB00" />
      </linearGradient>
    </defs>
    <style>{`
      @keyframes forgeFlameFlicker {
        0%, 100% { transform: scaleY(1) scaleX(1) skewX(0deg); opacity: 1; }
        25% { transform: scaleY(1.1) scaleX(0.94) skewX(-2deg); opacity: 0.95; }
        50% { transform: scaleY(0.92) scaleX(1.05) skewX(2deg); opacity: 1; }
        75% { transform: scaleY(1.12) scaleX(0.96) skewX(-1deg); opacity: 0.9; }
      }
      @keyframes forgeCoreFlicker {
        0%, 100% { transform: scale(1) translateY(0); opacity: 1; }
        50% { transform: scale(1.18) translateY(-1.5px); opacity: 0.85; }
      }
      @keyframes forgeSparkLeft {
        0% { transform: translate(28px, 14px); opacity: 0; }
        40% { opacity: 1; }
        100% { transform: translate(22px, -2px); opacity: 0; }
      }
      @keyframes forgeSparkRight {
        0% { transform: translate(36px, 16px); opacity: 0; }
        40% { opacity: 1; }
        100% { transform: translate(42px, 0px); opacity: 0; }
      }
      @keyframes hammerHeadStrikeLeft {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-22deg); }
        45% { transform: rotate(125deg); }
        52% { transform: rotate(115deg); }
        75% { transform: rotate(0deg); }
      }
      @keyframes hammerHeadStrikeRight {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(22deg); }
        45% { transform: rotate(-125deg); }
        52% { transform: rotate(-115deg); }
        75% { transform: rotate(0deg); }
      }
      @keyframes impactLeftSpark {
        0%, 42%, 55%, 100% { opacity: 0; transform: scale(0.3); }
        45% { opacity: 1; transform: scale(1.6); }
      }
      @keyframes impactRightSpark {
        0%, 42%, 55%, 100% { opacity: 0; transform: scale(0.3); }
        45% { opacity: 1; transform: scale(1.6); }
      }

      .animated-outer-flame { transform-origin: 32px 24px; animation: forgeFlameFlicker 0.45s ease-in-out infinite; }
      .animated-inner-flame { transform-origin: 32px 22px; animation: forgeCoreFlicker 0.35s ease-in-out infinite alternate; }
      .forge-spark-1 { animation: forgeSparkLeft 1.2s ease-out infinite; }
      .forge-spark-2 { animation: forgeSparkRight 1.4s ease-out 0.5s infinite; }
      .animated-hammer-left { transform-origin: 22px 32px; animation: hammerHeadStrikeLeft 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      .animated-hammer-right { transform-origin: 42px 32px; animation: hammerHeadStrikeRight 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.75s infinite; }
      .impact-spark-left { transform-origin: 39px 36px; animation: impactLeftSpark 1.5s ease-out infinite; }
      .impact-spark-right { transform-origin: 25px 36px; animation: impactRightSpark 1.5s ease-out 0.75s infinite; }
    `}</style>

    {/* Flying Ember Sparks */}
    <circle className="forge-spark-1" cx="0" cy="0" r="1.2" fill="#FFD740" />
    <circle className="forge-spark-2" cx="0" cy="0" r="1" fill="#FF9100" />

    {/* Flame — Animated Teardrop, Sits Above Anvil */}
    <path className="animated-outer-flame" d="M32 0C32 0 20 12 20 20C20 26.6 25.4 24 32 24C38.6 24 44 26.6 44 20C44 12 32 0 32 0Z" fill="url(#forgeFlameGrad)" />
    <path className="animated-inner-flame" d="M32 8C32 8 27 15 27 19C27 22 29.2 22 32 22C34.8 22 37 22 37 19C37 15 32 8 32 8Z" fill="#FFD740" />

    {/* Anvil Strike Impact Sparks */}
    <circle className="impact-spark-left" cx="39" cy="36" r="3" fill="#FFE082" />
    <circle className="impact-spark-right" cx="25" cy="36" r="3" fill="#FFE082" />

    {/* Left Hammer — Hammer Head Arc Swing Striking Anvil Surface */}
    <g className="animated-hammer-left">
      <path d="M8 16L20 34L24 31L12 13Z" fill="#CFD8DC" stroke="#90A4AE" strokeWidth="1" />
      <rect x="3" y="11" width="12" height="7" rx="2" transform="rotate(-35 9 14.5)" fill="#B0BEC5" stroke="#78909C" strokeWidth="1" />
    </g>

    {/* Right Hammer — Hammer Head Arc Swing Striking Anvil Surface (Alternating Rhythm) */}
    <g className="animated-hammer-right">
      <path d="M56 16L44 34L40 31L52 13Z" fill="#CFD8DC" stroke="#90A4AE" strokeWidth="1" />
      <rect x="49" y="11" width="12" height="7" rx="2" transform="rotate(35 55 14.5)" fill="#B0BEC5" stroke="#78909C" strokeWidth="1" />
    </g>

    {/* Anvil — Bold, Clear T-Shape */}
    <rect x="10" y="36" width="44" height="6" rx="2" fill="#6D4C41" stroke="#4E342E" strokeWidth="1" />
    <path d="M48 36L58 39V41L48 42Z" fill="#5D4037" />
    <rect x="18" y="42" width="28" height="8" rx="1" fill="#4E342E" stroke="#3E2723" strokeWidth="1" />
    <rect x="14" y="50" width="36" height="6" rx="2" fill="#3E2723" stroke="#2D1B14" strokeWidth="1" />
    <rect x="11" y="36" width="42" height="2" rx="1" fill="#8D6E63" opacity="0.6" />
  </svg>
);
