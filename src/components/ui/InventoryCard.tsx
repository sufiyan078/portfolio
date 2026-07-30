import React from 'react';
import { GlassPanel } from './GlassPanel';
import { AchievementBadge } from './AchievementBadge';
import type { InventoryCategoryCard } from '../../data/inventory';

interface InventoryCardProps {
  skill: InventoryCategoryCard;
  isSelected?: boolean;
  onClick?: () => void;
}

export const InventoryCard: React.FC<InventoryCardProps> = ({ skill, isSelected = false, onClick }) => {
  const glowColorMap: Record<string, 'gold' | 'purple' | 'cyan'> = {
    LEGENDARY: 'gold',
    EPIC: 'purple',
    RARE: 'cyan'
  };

  return (
    <GlassPanel
      borderGlowColor={glowColorMap[skill.rarity] || 'cyan'}
      onClick={onClick}
      className={`transition-all ${isSelected ? 'border-2 border-[#FF8F00] bg-[#1F150C]' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-heading font-bold text-sm text-white">{skill.name}</span>
        <AchievementBadge rarity={skill.rarity === 'LEGENDARY' ? 'Legendary' : skill.rarity === 'EPIC' ? 'Epic' : 'Rare'} label={skill.rarity} />
      </div>

      <div className="font-mono text-[11px] text-[#FF8F00] mb-2">
        {skill.categoryName}
      </div>

      <p className="text-xs text-gray-400 font-sans line-clamp-2 mb-4">
        {skill.description}
      </p>

      <div>
        <div className="flex justify-between text-[11px] font-mono mb-1">
          <span className="text-gray-400">{skill.rarity}</span>
          <span className="text-[#FF8F00] font-bold">100% READY</span>
        </div>
        <div className="w-full bg-[#000000] h-2 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#FF8F00] to-[#FFD700] rounded-full transition-all duration-700 w-full"
          />
        </div>
      </div>
    </GlassPanel>
  );
};
