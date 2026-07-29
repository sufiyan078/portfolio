import React from 'react';
import { GlassPanel } from './GlassPanel';
import { AchievementBadge } from './AchievementBadge';
import type { InventoryItem } from '../../data/inventory';

interface InventoryCardProps {
  skill: InventoryItem;
  isSelected?: boolean;
  onClick?: () => void;
}

export const InventoryCard: React.FC<InventoryCardProps> = ({ skill, isSelected = false, onClick }) => {
  const glowColorMap: Record<string, 'gold' | 'purple' | 'cyan'> = {
    Legendary: 'gold',
    Epic: 'purple',
    Rare: 'cyan',
    Common: 'cyan'
  };

  return (
    <GlassPanel
      borderGlowColor={glowColorMap[skill.rarity] || 'cyan'}
      onClick={onClick}
      className={`transition-all ${isSelected ? 'border-2 border-[#10B981] bg-[#111827]' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-heading font-bold text-sm text-white">{skill.name}</span>
        <AchievementBadge rarity={skill.rarity === 'Legendary' ? 'Legendary' : skill.rarity === 'Epic' ? 'Epic' : 'Rare'} label={skill.rarity} />
      </div>

      <div className="font-mono text-[11px] text-[#10B981] mb-2">
        {skill.category}
      </div>

      <p className="text-xs text-gray-400 font-sans line-clamp-2 mb-4">
        {skill.description}
      </p>

      <div>
        <div className="flex justify-between text-[11px] font-mono mb-1">
          <span className="text-gray-400">{skill.rarity}</span>
          <span className="text-[#10B981] font-bold">{skill.mastery}%</span>
        </div>
        <div className="w-full bg-[#070B14] h-2 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#443199] to-[#10B981] rounded-full transition-all duration-700"
            style={{ width: `${skill.mastery}%` }}
          />
        </div>
      </div>
    </GlassPanel>
  );
};
