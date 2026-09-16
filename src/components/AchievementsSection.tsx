import React from 'react';
import { ACHIEVEMENTS, CLIENT_REWARDS } from '../data/achievements';
import { 
  Trophy, CheckCircle2, Gift, 
  Link, Wrench, Rocket, Bot, BarChart3,
  Cog, TrendingUp, Globe, Timer, Coins,
  Eye, Zap, Gauge
} from './ui/RealmIcons';
import { getUniversalAudioProps } from '../utils/soundEffects';
import { IntelDisclosure } from './ui/IntelDisclosure';

export const AchievementsSection: React.FC = () => {
  const getRarityClass = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'badge-legendary';
      case 'Epic': return 'badge-epic';
      default: return 'badge-rare';
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Rocket': return Rocket;
      case 'Bot': return Bot;
      case 'BarChart3': return BarChart3;
      case 'Cog': return Cog;
      case 'TrendingUp': return TrendingUp;
      case 'Link': return Link;
      case 'Globe': return Globe;
      case 'Wrench': return Wrench;
      case 'Clock': return Timer;
      case 'Coins': return Coins;
      case 'Eye': return Eye;
      case 'Zap': return Zap;
      case 'Speedometer': return Gauge;
      default: return Trophy;
    }
  };

  return (
    <section id="achievements" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Section Header per Section 15 */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag border border-[#FF8F00]/40 bg-[#FF8F00]/10 text-[#FF8F00] mb-3 group">
          <Trophy className="w-3.5 h-3.5 text-[#FF8F00] transition-transform duration-300 group-hover:scale-110" />
          <span className="text-[#FF8F00] font-bold">ACHIEVEMENTS</span>
        </div>
        <h2 className="font-heading font-extrabold text-[32px] sm:text-[38px] text-white tracking-tight">
          UNLOCKED <span className="text-[#FF8F00]">CAPABILITIES</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          Explore the collection. Inspect an unlock to learn more.
        </p>
      </div>

      {/* 8 Capability Achievement Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {ACHIEVEMENTS.map((ach) => {
          const rarityClass = getRarityClass(ach.rarity);
          const IconComp = getIcon(ach.icon);

          const rarityStyle = ach.rarity === 'Legendary'
            ? {
                border: 'border-2 border-[#FFD700]/35 hover:border-[#FFD700]',
                shadow: 'hover:shadow-[0_12px_25px_rgba(255,215,0,0.25)]',
                iconBox: 'bg-[#FFD700]/15 border-[#FFD700]/40 text-[#FFD700]',
                hoverTitle: 'group-hover:text-[#FFD700]',
              }
            : ach.rarity === 'Epic'
            ? {
                border: 'border-2 border-[#FF4500]/35 hover:border-[#FF4500]',
                shadow: 'hover:shadow-[0_12px_25px_rgba(255,69,0,0.25)]',
                iconBox: 'bg-[#FF4500]/15 border-[#FF4500]/40 text-[#FF4500]',
                hoverTitle: 'group-hover:text-[#FF4500]',
              }
            : {
                border: 'border-2 border-[#A855F7]/35 hover:border-[#A855F7]',
                shadow: 'hover:shadow-[0_12px_25px_rgba(168,85,247,0.25)]',
                iconBox: 'bg-[#A855F7]/15 border-[#A855F7]/40 text-[#A855F7]',
                hoverTitle: 'group-hover:text-[#A855F7]',
              };

          return (
            <div
              key={ach.id}
              {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER')}
              className={`glass-panel p-6 flex flex-col justify-between group ${rarityStyle.border} ${rarityStyle.shadow} hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{ach.category}</span>
                  <span className={`badge-tag ${rarityClass} text-[10px] uppercase font-bold`}>
                    {ach.rarity}
                  </span>
                </div>

                <div className="realm-collectible flex flex-col items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center shrink-0 p-3 transition-all ${rarityStyle.iconBox}`}>
                    <IconComp className="w-9 h-9 shrink-0" />
                  </div>
                  <div>
                    <h3 className={`font-heading font-bold text-base text-white ${rarityStyle.hoverTitle} transition-colors leading-tight`}>
                      {ach.title}
                    </h3>
                  </div>
                </div>

                <IntelDisclosure label="Inspect capability">
                  {ach.description}
                </IntelDisclosure>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#10B981]">
                <span className="flex items-center gap-1 font-bold tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  UNLOCKED
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── YOUR REWARD FOR HIRING ME Banner ──────────────────────── */}
      <div className="glass-panel p-6 sm:p-8 border-2 border-[#FF8F00]/40 shadow-[0_0_35px_rgba(255,143,0,0.15)] relative overflow-hidden group">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FF8F00]/15 border border-[#FF8F00]/50 flex items-center justify-center text-[#FF8F00] shrink-0">
              <Gift className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white tracking-tight">
                YOUR REWARD FOR HIRING ME
              </h3>
              <span className="font-mono text-xs text-[#FF8F00]">
                Measurable business outcomes & direct ROI on every project
              </span>
            </div>
          </div>
          <span className="badge-tag badge-legendary text-xs font-bold px-3 py-1">
            CLIENT REWARD VAULT
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CLIENT_REWARDS.map((reward) => {
            const RewardIcon = getIcon(reward.icon);
            return (
              <div
                key={reward.id}
                {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER')}
                className="p-4 rounded-xl bg-[#000000]/80 border border-[#FF8F00]/30 hover:border-[#FF8F00] hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(255,143,0,0.22)] transition-all duration-200 flex flex-col items-center justify-center text-center gap-2.5 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#FF8F00]/15 border border-[#FF8F00]/40 flex items-center justify-center text-[#FF8F00] group-hover:scale-110 group-hover:bg-[#FF8F00]/25 transition-all">
                  <RewardIcon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="font-mono text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">{reward.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
