import React from 'react';
import { Trophy } from 'lucide-react';

interface GlitteringTrophyIconProps {
  className?: string;
}

export const GlitteringTrophyIcon: React.FC<GlitteringTrophyIconProps> = ({ className = "w-3.5 h-3.5" }) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 overflow-visible ${className}`}>
      <style>{`
        @keyframes trophy-shimmer-tilt {
          0%, 100% {
            transform: rotate(0deg) scale(1);
            filter: drop-shadow(0 0 2px rgba(255, 143, 0, 0.4));
          }
          25% {
            transform: rotate(-10deg) scale(1.18);
            filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.95)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.9));
          }
          50% {
            transform: rotate(10deg) scale(1.18);
            filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.95)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.9));
          }
          75% {
            transform: rotate(-4deg) scale(1.05);
          }
        }

        @keyframes glitter-rise-left {
          0% {
            opacity: 0;
            transform: translate(0px, 0px) scale(0.2);
          }
          35% {
            opacity: 1;
            transform: translate(-5px, -7px) scale(1.1);
          }
          80%, 100% {
            opacity: 0;
            transform: translate(-9px, -14px) scale(0.1);
          }
        }

        @keyframes glitter-rise-right {
          0% {
            opacity: 0;
            transform: translate(0px, 0px) scale(0.2);
          }
          35% {
            opacity: 1;
            transform: translate(5px, -8px) scale(1.2);
          }
          80%, 100% {
            opacity: 0;
            transform: translate(9px, -15px) scale(0.1);
          }
        }

        @keyframes glitter-rise-center {
          0% {
            opacity: 0;
            transform: translate(0px, 0px) scale(0.2);
          }
          35% {
            opacity: 1;
            transform: translate(0px, -9px) scale(1);
          }
          80%, 100% {
            opacity: 0;
            transform: translate(0px, -16px) scale(0.1);
          }
        }

        .anim-trophy-tilt {
          animation: trophy-shimmer-tilt 2.2s ease-in-out infinite;
          transform-origin: center bottom;
        }

        .anim-glitter-left {
          animation: glitter-rise-left 1.6s ease-out infinite;
          animation-delay: 0s;
        }

        .anim-glitter-right {
          animation: glitter-rise-right 1.6s ease-out infinite;
          animation-delay: 0.5s;
        }

        .anim-glitter-center {
          animation: glitter-rise-center 1.6s ease-out infinite;
          animation-delay: 1.0s;
        }
      `}</style>

      <div className="relative w-full h-full flex items-center justify-center overflow-visible">
        {/* Main Tilt & Shimmer Trophy */}
        <Trophy className="w-full h-full text-[#FF8F00] anim-trophy-tilt" />

        {/* Floating Golden Glitter Sparkles Emitted From Trophy */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 24 24" fill="none">
          {/* Sparkle 1 (Drifts Left) */}
          <g className="anim-glitter-left">
            <path d="M12 2L13 4.5L15.5 5.5L13 6.5L12 9L11 6.5L8.5 5.5L11 4.5Z" fill="#FFFFFF" />
            <circle cx="12" cy="5.5" r="1" fill="#FFD740" />
          </g>

          {/* Sparkle 2 (Drifts Right) */}
          <g className="anim-glitter-right">
            <path d="M12 2L13 4.5L15.5 5.5L13 6.5L12 9L11 6.5L8.5 5.5L11 4.5Z" fill="#FFD740" />
          </g>

          {/* Sparkle 3 (Rises Center) */}
          <g className="anim-glitter-center">
            <path d="M12 2L13 4.5L15.5 5.5L13 6.5L12 9L11 6.5L8.5 5.5L11 4.5Z" fill="#FFFFFF" />
          </g>
        </svg>
      </div>
    </div>
  );
};
