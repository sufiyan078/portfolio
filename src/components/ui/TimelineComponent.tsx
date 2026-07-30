import React from 'react';
import { GlassPanel } from './GlassPanel';
import { AchievementBadge } from './AchievementBadge';
import { CheckCircle2, Clock } from 'lucide-react';
import type { Quest } from '../../data/timeline';

interface TimelineComponentProps {
  quests: Quest[];
}

export const TimelineComponent: React.FC<TimelineComponentProps> = ({ quests }) => {
  return (
    <div className="relative pl-6 sm:pl-8 border-l-2 border-l-[#443199]/40 space-y-10">
      {quests.map((quest) => {
        const isCurrent = quest.status === 'IN PROGRESS';

        return (
          <div key={quest.id} className="relative">
            <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 rounded-full border-2 flex items-center justify-center ${
              isCurrent
                ? 'bg-[#443199] border-white text-white shadow-[0_0_15px_rgba(68,49,153,0.8)] animate-pulse'
                : 'bg-[#070B14] border-[#443199]/50 text-[#443199]'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>

            <GlassPanel borderGlowColor={isCurrent ? 'cyan' : 'purple'}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#443199] font-bold">{quest.period}</span>
                  <span className="text-gray-500">|</span>
                  <AchievementBadge rarity={isCurrent ? 'Legendary' : 'Rare'} label={quest.questType} />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#10B981]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>STATUS: {quest.status}</span>
                </div>
              </div>

              <h3 className="font-heading font-extrabold text-xl text-white mb-1">{quest.title}</h3>
              <div className="font-mono text-xs text-gray-400 mb-3">{quest.role}</div>
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-4">{quest.description}</p>

              <div className="pt-2 border-t border-white/10 text-xs font-mono text-[#10B981]">
                <strong className="text-[#F59E0B]">REWARD:</strong> {quest.reward}
              </div>
            </GlassPanel>
          </div>
        );
      })}
    </div>
  );
};
