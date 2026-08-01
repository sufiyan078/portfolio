import React from 'react';

export const AnimatedLayersIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes layerTop {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-1.5px); }
      }
      @keyframes layerMid {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-0.75px); }
      }
      .layer-top { animation: layerTop 2.5s ease-in-out infinite; }
      .layer-mid { animation: layerMid 2.5s ease-in-out 0.2s infinite; }
    `}</style>
    
    <polygon className="layer-top" points="12 2 2 7 12 12 22 7 12 2" />
    <polyline className="layer-mid" points="2 12 12 17 22 12" />
    <polyline points="2 17 12 22 22 17" />
  </svg>
);
