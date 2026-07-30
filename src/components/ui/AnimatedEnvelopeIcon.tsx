import React from 'react';

interface AnimatedEnvelopeIconProps {
  className?: string;
}

export const AnimatedEnvelopeIcon: React.FC<AnimatedEnvelopeIconProps> = ({ className = "w-3.5 h-3.5" }) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 overflow-visible ${className}`}>
      <style>{`
        @keyframes mail-float-pulse {
          0%, 100% {
            transform: translateY(0) scale(1);
            filter: drop-shadow(0 0 2px rgba(255, 143, 0, 0.4));
          }
          40% {
            transform: translateY(-2px) scale(1.15);
            filter: drop-shadow(0 0 9px rgba(255, 143, 0, 0.95)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.8));
          }
          60% {
            transform: translateY(0.5px) scale(0.96);
          }
        }

        @keyframes mail-top-flap-open {
          0%, 25%, 85%, 100% {
            d: path("M2 7 L12 13.5 L22 7");
          }
          40%, 70% {
            d: path("M2 7 L12 1 L22 7");
          }
        }

        @keyframes mail-letter-slide {
          0%, 30%, 82%, 100% {
            transform: translateY(4px);
            opacity: 0;
          }
          45%, 68% {
            transform: translateY(-2.5px);
            opacity: 1;
          }
        }

        .anim-mail-wrapper {
          animation: mail-float-pulse 2.2s ease-in-out infinite;
          transform-origin: center center;
        }

        .anim-mail-flap {
          animation: mail-top-flap-open 2.2s ease-in-out infinite;
        }

        .anim-mail-letter {
          animation: mail-letter-slide 2.2s ease-in-out infinite;
        }
      `}</style>

      <div className="anim-mail-wrapper w-full h-full">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF8F00"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full overflow-visible"
        >
          {/* Inner Letter Paper that slides up when flap opens */}
          <g className="anim-mail-letter" stroke="none">
            <rect x="5" y="6" width="14" height="9" rx="1" fill="#FF8F00" opacity="0.9" />
            <line x1="7" y1="9" x2="17" y2="9" stroke="#000" strokeWidth="1" />
            <line x1="7" y1="12" x2="14" y2="12" stroke="#000" strokeWidth="1" />
          </g>

          {/* Main Envelope Base Box */}
          <rect x="2" y="7" width="20" height="13" rx="2" />
          
          {/* Bottom Fold Lines */}
          <path d="M2 19L9.5 13M22 19L14.5 13" opacity="0.6" />

          {/* Animated Opening & Closing Top Flap */}
          <path className="anim-mail-flap" d="M2 7 L12 13.5 L22 7" fill="none" />
        </svg>
      </div>
    </div>
  );
};
