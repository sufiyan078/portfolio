import React from 'react';
import { playCyberSound } from '../../utils/soundEffects';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  variant?: 'cyan' | 'emerald' | 'purple' | 'gold' | 'crimson' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

export const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  onClick,
  variant = 'cyan',
  size = 'md',
  icon,
  className = '',
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel
}) => {
  const sizeMap = {
    sm: 'px-3.5 py-2 text-xs',
    md: 'px-5 py-3 text-xs sm:text-sm',
    lg: 'px-8 py-4 text-sm sm:text-base'
  };

  const variantMap = {
    cyan: 'cyber-btn',
    emerald: 'cyber-btn cyber-btn-emerald',
    purple: 'cyber-btn border-[#b026ff] text-[#b026ff] hover:bg-[#b026ff]/30 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)]',
    gold: 'cyber-btn border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700]/30 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]',
    crimson: 'cyber-btn border-[#ff2a6d] text-[#ff2a6d] hover:bg-[#ff2a6d]/30 hover:shadow-[0_0_20px_rgba(255,42,109,0.4)]',
    outline: 'bg-transparent border border-white/20 text-gray-300 hover:text-white hover:border-white/50 hover:bg-white/5'
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    playCyberSound('click');
    if (onClick) onClick(e);
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      aria-label={ariaLabel}
      onMouseEnter={() => !disabled && playCyberSound('hover')}
      className={`${variantMap[variant]} ${sizeMap[size]} font-orbitron font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#00f3ff] ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
