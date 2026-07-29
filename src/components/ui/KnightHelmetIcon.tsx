import React from 'react';

interface KnightHelmetIconProps {
  className?: string;
  size?: number;
}

export const KnightHelmetIcon: React.FC<KnightHelmetIconProps> = ({ className = "w-6 h-6", size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 1. Vibrant Crimson Red Plume / Crest */}
      <path
        d="M16 9 C16 9 10 2 3 4 C0 5 0 9 4 10 C9 12 14 8 16 11 Z"
        fill="#D90000"
      />
      <path
        d="M16 9 C16 9 11 1 5 2.5 C2 3 2 5.5 5 6.5 C10 8 13 4.5 16 9 Z"
        fill="#FF2222"
      />

      {/* Plume Base Mount Ring */}
      <rect x="14" y="9" width="4" height="2.5" rx="0.5" fill="#FF8F00" />

      {/* 2. Knight Helmet Main Dome */}
      <path
        d="M8 15 C8 11 11.5 10 16 10 C20.5 10 24 11 24 15 V20 C24 25 20.5 28 16 28 C11.5 28 8 25 8 20 V15 Z"
        fill="#111827"
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />

      {/* 3. Visor Eye Slit Cutout (Bold Black with Amber Accent) */}
      <path
        d="M10 16 L16 18 L22 16 V19 L16 21 L10 19 Z"
        fill="#000000"
        stroke="#FF8F00"
        strokeWidth="1.2"
      />

      {/* Visor Eye Slot Hole */}
      <path d="M11 16.8 L16 18.5 L21 16.8 Z" fill="#FF8F00" />

      {/* 4. Breathing Slit Grille (High Visibility Lines) */}
      <line x1="12.5" y1="22.5" x2="12.5" y2="25.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16" y1="22.5" x2="16" y2="26.2" stroke="#FF8F00" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="19.5" y1="22.5" x2="19.5" y2="25.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

      {/* 5. Base Collar Guard */}
      <path
        d="M9.5 27 C12.5 30 19.5 30 22.5 27 L23.5 29.5 C19.5 32 12.5 32 8.5 29.5 Z"
        fill="#FF8F00"
      />
    </svg>
  );
};
