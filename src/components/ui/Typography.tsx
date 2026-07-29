import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const CyberHeading: React.FC<TypographyProps & { level?: 1 | 2 | 3 | 4 }> = ({
  children,
  className = '',
  level = 2
}) => {
  const baseClasses = "font-orbitron font-black tracking-tight text-white";
  
  switch (level) {
    case 1:
      return <h1 className={`${baseClasses} text-4xl sm:text-6xl lg:text-7xl leading-tight ${className}`}>{children}</h1>;
    case 2:
      return <h2 className={`${baseClasses} text-3xl sm:text-4xl lg:text-5xl leading-tight ${className}`}>{children}</h2>;
    case 3:
      return <h3 className={`${baseClasses} text-xl sm:text-2xl ${className}`}>{children}</h3>;
    case 4:
      return <h4 className={`${baseClasses} text-base sm:text-lg ${className}`}>{children}</h4>;
    default:
      return <h2 className={`${baseClasses} text-3xl sm:text-4xl ${className}`}>{children}</h2>;
  }
};

export const MonoText: React.FC<TypographyProps & { color?: 'cyan' | 'emerald' | 'purple' | 'gold' | 'crimson' | 'muted' | 'white' }> = ({
  children,
  className = '',
  color = 'muted'
}) => {
  const colorMap = {
    cyan: 'text-[#00f3ff]',
    emerald: 'text-[#00ff9d]',
    purple: 'text-[#b026ff]',
    gold: 'text-[#ffd700]',
    crimson: 'text-[#ff2a6d]',
    muted: 'text-[#94a3b8]',
    white: 'text-white'
  };

  return (
    <span className={`font-mono text-xs sm:text-sm ${colorMap[color]} ${className}`}>
      {children}
    </span>
  );
};

export const BodyText: React.FC<TypographyProps> = ({ children, className = '' }) => {
  return (
    <p className={`font-sans text-sm sm:text-base text-gray-300 leading-relaxed ${className}`}>
      {children}
    </p>
  );
};
