import React, { useState, useEffect } from 'react';
import { Package, PackageOpen } from 'lucide-react';

interface AnimatedPackageIconProps {
  className?: string;
}

export const AnimatedPackageIcon: React.FC<AnimatedPackageIconProps> = ({ className = "w-3.5 h-3.5" }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(prev => !prev);
    }, 1400); // Smoothly toggles open / close every 1.4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 overflow-visible ${className}`}>
      <style>{`
        @keyframes package-float-bob {
          0%, 100% {
            transform: translateY(0px) scale(1);
            filter: drop-shadow(0 0 2px rgba(255, 143, 0, 0.4));
          }
          50% {
            transform: translateY(-3px) scale(1.1);
            filter: drop-shadow(0 0 9px rgba(255, 143, 0, 0.95)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.8));
          }
        }

        @keyframes box-open-pop {
          0% {
            transform: scale(0.85);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.18);
            opacity: 1;
            filter: drop-shadow(0 0 10px #FF8F00);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .anim-box-float {
          animation: package-float-bob 2.2s ease-in-out infinite;
          transform-origin: center center;
        }

        .anim-box-state-pop {
          animation: box-open-pop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>

      <div className="anim-box-float w-full h-full relative flex items-center justify-center">
        {isOpen ? (
          <div key="open" className="anim-box-state-pop relative flex items-center justify-center w-full h-full">
            {/* Native Open Box Icon */}
            <PackageOpen className="w-full h-full text-[#FF8F00]" />
          </div>
        ) : (
          <div key="closed" className="anim-box-state-pop flex items-center justify-center w-full h-full">
            {/* Native Closed Box Icon */}
            <Package className="w-full h-full text-[#FF8F00]" />
          </div>
        )}
      </div>
    </div>
  );
};
