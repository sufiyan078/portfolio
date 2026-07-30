import React from 'react';
import { Swords } from 'lucide-react';

interface ClashingSwordsIconProps {
  className?: string;
}

export const ClashingSwordsIcon: React.FC<ClashingSwordsIconProps> = ({ className = "w-3.5 h-3.5" }) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <style>{`
        @keyframes native-swords-clash {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 0px rgba(255, 143, 0, 0));
          }
          32% {
            transform: scale(0.88) rotate(-14deg);
            filter: drop-shadow(0 0 0px rgba(255, 143, 0, 0));
          }
          46% {
            transform: scale(1.25) rotate(10deg);
            filter: drop-shadow(0 0 10px #FF8F00) drop-shadow(0 0 4px #FFFFFF);
          }
          58% {
            transform: scale(1.02) rotate(-3deg);
            filter: drop-shadow(0 0 4px rgba(255, 143, 0, 0.6));
          }
        }

        .native-swords-anim {
          animation: native-swords-clash 1.1s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          transform-origin: center center;
        }
      `}</style>

      <Swords className="w-full h-full text-[#FF8F00] native-swords-anim" />
    </div>
  );
};
