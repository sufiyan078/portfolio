import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  showCorners?: boolean;
  borderGlowColor?: 'cyan' | 'emerald' | 'purple' | 'gold' | 'crimson';
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  showCorners = true,
  borderGlowColor = 'cyan',
  onClick,
  onMouseEnter
}) => {
  const topBorderMap = {
    cyan: 'border-t-[#00f3ff]',
    emerald: 'border-t-[#00ff9d]',
    purple: 'border-t-[#b026ff]',
    gold: 'border-t-[#ffd700]',
    crimson: 'border-t-[#ff2a6d]'
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`cyber-card p-6 sm:p-8 rounded-2xl border-t-2 ${topBorderMap[borderGlowColor]} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {showCorners && (
        <>
          <div className="hud-corner hud-top-left" />
          <div className="hud-corner hud-top-right" />
          <div className="hud-corner hud-bottom-left" />
          <div className="hud-corner hud-bottom-right" />
        </>
      )}
      {children}
    </div>
  );
};
