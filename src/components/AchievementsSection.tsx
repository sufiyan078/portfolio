import React from 'react';
import { ACHIEVEMENTS } from '../data/achievements';
import { Trophy, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { playCyberSound } from '../utils/soundEffects';

export const AchievementsSection: React.FC = () => {
  const getRarityClass = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'badge-legendary';
      case 'Epic': return 'badge-epic';
      default: return 'badge-rare';
    }
  };

  return (
    <section id="achievements" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Section Header per Section 15 */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag badge-legendary mb-3">
          <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>ACHIEVEMENTS</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          UNLOCKED <span className="text-[#F59E0B]">MILESTONES & BADGES</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          &gt; Key engineering achievements and unlockable portfolio milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((ach) => {
          const rarityClass = getRarityClass(ach.rarity);

          return (
            <div
              key={ach.id}
              onMouseEnter={() => playCyberSound('hover')}
              className="glass-panel p-6 flex flex-col justify-between group hover:border-[#F59E0B]/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{ach.category}</span>
                  <span className={`badge-tag ${rarityClass} text-[10px] uppercase font-bold`}>
                    {ach.rarity}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-white group-hover:text-[#F59E0B] transition-colors">
                      {ach.title}
                    </h3>
                    <span className="font-mono text-[10px] text-gray-400">{ach.date}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 font-sans leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#10B981]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ACHIEVEMENT UNLOCKED
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
