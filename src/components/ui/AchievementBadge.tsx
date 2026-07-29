import React from 'react';
import { Award, ShieldCheck, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

export type RarityType = 'Legendary' | 'Epic' | 'Rare' | 'Expert' | 'Advanced' | 'Core' | 'High-Priority' | 'Production';

interface AchievementBadgeProps {
  rarity?: RarityType;
  label: string;
  iconName?: string;
  className?: string;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  rarity = 'Core',
  label,
  iconName,
  className = ''
}) => {
  const rarityMap: Record<string, string> = {
    Legendary: 'badge-legendary',
    Epic: 'badge-epic',
    Rare: 'badge-rare',
    Expert: 'badge-legendary',
    Advanced: 'badge-epic',
    Core: 'badge-rare',
    'High-Priority': 'badge-legendary',
    Production: 'badge-rare'
  };

  const renderBadgeIcon = () => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-3 h-3" />;
      case 'Zap': return <Zap className="w-3 h-3" />;
      case 'Sparkles': return <Sparkles className="w-3 h-3" />;
      case 'Award': return <Award className="w-3 h-3" />;
      default: return <CheckCircle2 className="w-3 h-3" />;
    }
  };

  return (
    <span className={`cyber-badge ${rarityMap[rarity] || 'badge-rare'} ${className}`}>
      {iconName && renderBadgeIcon()}
      <span>{label}</span>
    </span>
  );
};
