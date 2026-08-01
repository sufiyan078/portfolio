import React from 'react';

export const AnimatedLayersIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes layerTopSlide {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-2.5px); }
      }
      @keyframes layerMidSlide {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(0); }
      }
      @keyframes layerBotSlide {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(2.5px); }
      }
      .layer-top-anim { animation: layerTopSlide 1.8s ease-in-out infinite; }
      .layer-mid-anim { animation: layerMidSlide 1.8s ease-in-out infinite; }
      .layer-bot-anim { animation: layerBotSlide 1.8s ease-in-out infinite; }
    `}</style>
    
    <polygon className="layer-top-anim" points="12 2 2 7 12 12 22 7 12 2" strokeWidth="2.2" />
    <polyline className="layer-mid-anim" points="2 12 12 17 22 12" strokeWidth="2" />
    <polyline className="layer-bot-anim" points="2 17 12 22 22 17" strokeWidth="2" />
  </svg>
);
