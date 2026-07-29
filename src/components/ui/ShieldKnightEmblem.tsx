import React from 'react';

interface ShieldKnightEmblemProps {
  className?: string;
  size?: number;
}

export const ShieldKnightEmblem: React.FC<ShieldKnightEmblemProps> = ({ className = "w-10 h-10", size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} drop-shadow-[0_0_12px_rgba(255,143,0,0.4)]`}
    >
      {/* 1. Outer Shield Container Frame (Replaces Rounded Square Box) */}
      <path
        d="M50 4 L88 18 V48 C88 72 70 88 50 96 C30 88 12 72 12 48 V18 L50 4 Z"
        fill="rgba(31, 21, 12, 0.95)"
        stroke="#FF8F00"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Inner Shield Accent Rim */}
      <path
        d="M50 10 L82 22 V46 C82 67 66 82 50 89 C34 82 18 67 18 46 V22 L50 10 Z"
        fill="rgba(7, 11, 20, 0.9)"
        stroke="rgba(255, 143, 0, 0.3)"
        strokeWidth="1.5"
      />

      {/* 2. Vibrant Crimson Red Plume / Crest */}
      <path
        d="M50 22 C50 22 32 8 16 12 C8 14 4 20 12 22 C22 25 38 18 48 24 C45 18 48 22 50 22 Z"
        fill="#D90000"
      />
      <path
        d="M50 22 C50 22 36 6 22 8 C15 9 10 14 16 16 C24 19 38 14 48 23 Z"
        fill="#FF2222"
      />

      {/* Plume Base Mount Ring */}
      <rect x="46" y="22" width="8" height="5" rx="1" fill="#FF8F00" />

      {/* 3. Knight Helmet Dome */}
      <path
        d="M30 40 C30 28 40 26 50 26 C60 26 70 28 70 40 V54 C70 64 60 74 50 74 C40 74 30 64 30 54 V40 Z"
        fill="#111827"
        stroke="#FFFFFF"
        strokeWidth="3"
      />

      {/* 4. Visor Eye Slit Cutout (Bold Black with Amber Accent) */}
      <path
        d="M34 44 L50 48 L66 44 V52 L50 56 L34 52 Z"
        fill="#000000"
        stroke="#FF8F00"
        strokeWidth="2"
      />

      {/* Visor Eye Slot Hole */}
      <path d="M36 46 L50 50 L64 46 Z" fill="#FF8F00" />

      {/* 5. Breathing Slit Grille (High Visibility Lines) */}
      <line x1="40" y1="60" x2="40" y2="67" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="60" x2="45" y2="68" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="60" x2="50" y2="69" stroke="#FF8F00" strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="60" x2="55" y2="68" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="60" x2="60" y2="67" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

      {/* 6. Base Collar Guard */}
      <path
        d="M33 70 C40 77 60 77 67 70 L70 76 C60 84 40 84 30 76 Z"
        fill="#FF8F00"
      />
    </svg>
  );
};
