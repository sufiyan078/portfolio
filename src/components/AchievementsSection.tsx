import React from 'react';
import { ACHIEVEMENTS, CLIENT_REWARDS } from '../data/achievements';
import { 
  Trophy, CheckCircle2, Gift, Cog, 
  TrendingUp, Link, Globe, Wrench 
} from 'lucide-react';
import { playCyberSound } from '../utils/soundEffects';
import { GlitteringTrophyIcon } from './ui/GlitteringTrophyIcon';
import { AnimatedBotIcon } from './ui/AnimatedBotIcon';
import { AnimatedChartIcon } from './ui/AnimatedChartIcon';
import { AnimatedRocketIcon } from './ui/AnimatedRocketIcon';

// Custom animated fast stopwatch icon matching Screenshot 2 (speed dashes + spinning hands)
const FastStopwatchIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes speedDash {
        0%, 100% { opacity: 1; transform: translateX(0); }
        50% { opacity: 0.3; transform: translateX(-2px); }
      }
      @keyframes handSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .speed-line-1 { animation: speedDash 0.8s ease-in-out infinite; }
      .speed-line-2 { animation: speedDash 0.8s ease-in-out 0.2s infinite; }
      .speed-line-3 { animation: speedDash 0.8s ease-in-out 0.4s infinite; }
      .clock-hand-spin { transform-origin: 16px 13px; animation: handSpin 2.5s linear infinite; }
    `}</style>
    {/* Speed Motion Lines */}
    <path className="speed-line-1" d="M2 9h4" />
    <path className="speed-line-2" d="M1 13h5" />
    <path className="speed-line-3" d="M3 17h3" />
    {/* Stopwatch Body */}
    <circle cx="16" cy="13" r="6.5" />
    {/* Top Button */}
    <path d="M14.5 3.5h3" />
    <path d="M16 3.5v3" />
    {/* Right Knob */}
    <path d="M20.2 8.2l1.3-1.3" />
    {/* Animated Spinning Clock Hands */}
    <g className="clock-hand-spin">
      <path d="M16 13l-2-3" />
      <path d="M16 13l2.5 1.5" />
    </g>
  </svg>
);

// Custom animated Save Money icon matching Screenshot 2 (clean gear with dollar, floating bill, stacked coins)
const SaveMoneyIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes gearSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes billFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-1.5px); }
      }
      .animated-gear { transform-origin: 9px 9px; animation: gearSpin 8s linear infinite; }
      .animated-bill { animation: billFloat 2.5s ease-in-out infinite; }
    `}</style>
    {/* Clean Symmetrical Gear Wheel (Top Left) */}
    <g className="animated-gear">
      <circle cx="9" cy="9" r="4.5" />
      <path d="M9 2v2.5M9 13.5V16M2 9h2.5M13.5 9H16M4.05 4.05l1.77 1.77M12.18 12.18l1.77 1.77M4.05 13.95l1.77-1.77M12.18 5.82l1.77-1.77" strokeWidth="1.5" />
    </g>

    {/* Stationary Upright Dollar Sign ($) in Gear Center */}
    <text x="9" y="11.8" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="currentColor" stroke="none" fontFamily="monospace">$</text>

    {/* Money Banknote Bill (Right) */}
    <g className="animated-bill">
      <rect x="13" y="11" width="9" height="5.5" rx="1" strokeWidth="1.5" />
      <circle cx="17.5" cy="13.75" r="1" strokeWidth="1.2" />
    </g>

    {/* Stacked Coins (Bottom Left) */}
    <ellipse cx="6" cy="18.5" rx="3.5" ry="1.4" strokeWidth="1.5" />
    <path d="M2.5 18.5v1.8c0 .8 1.6 1.4 3.5 1.4s3.5-.6 3.5-1.4v-1.8" strokeWidth="1.5" />
  </svg>
);

// Custom animated Eye icon for Better Visibility (smooth iris scan + pupil glow + realistic natural blink)
const AnimatedEyeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes irisScan {
        0%, 100% { transform: translateX(0); }
        35% { transform: translateX(-2.5px); }
        70% { transform: translateX(2.5px); }
      }
      @keyframes pupilGlow {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.75; }
      }
      @keyframes realisticBlink {
        0%, 94%, 100% { transform: scaleY(1); }
        96.5% { transform: scaleY(0.08); }
        98% { transform: scaleY(1); }
      }
      .eye-blink-wrapper { transform-origin: 12px 12px; animation: realisticBlink 4.5s ease-in-out infinite; }
      .iris-scan-group { transform-origin: 12px 12px; animation: irisScan 4s ease-in-out infinite; }
      .pupil-pulse-group { transform-origin: 12px 12px; animation: pupilGlow 2s ease-in-out infinite; }
    `}</style>
    
    <g className="eye-blink-wrapper">
      {/* Outer Eye Outline */}
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      
      {/* Smooth Scanning Iris & Pupil */}
      <g className="iris-scan-group">
        <circle cx="12" cy="12" r="3" />
        <circle className="pupil-pulse-group" cx="12" cy="12" r="1.2" fill="currentColor" />
      </g>
    </g>
  </svg>
);

// Custom animated Speedometer icon matching Screenshot 2 (clean centered gauge, sleek flame crest, sweeping needle, speed dashes)
const AnimatedSpeedometerIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`fill-none stroke-current ${className}`} viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      @keyframes needleSweep {
        0% { transform: rotate(-50deg); }
        50% { transform: rotate(50deg); }
        100% { transform: rotate(-50deg); }
      }
      @keyframes flamePulse {
        0%, 100% { opacity: 1; transform: translateX(0); }
        50% { opacity: 0.5; transform: translateX(-1.5px); }
      }
      .speed-needle { transform-origin: 13px 14px; animation: needleSweep 2.2s ease-in-out infinite; }
      .speed-dashes { animation: flamePulse 0.8s ease-in-out infinite; }
    `}</style>
    
    {/* Speed Motion Dashes on Left */}
    <g className="speed-dashes" strokeWidth="1.5">
      <path d="M2 9h3.5" />
      <path d="M1 13h4.5" />
      <path d="M2.5 17h3" />
    </g>

    {/* Centered Speedometer Outer Arc Gauge */}
    <path d="M7 16a7 7 0 1 1 12 0" strokeWidth="2" />
    
    {/* Inner Speed Indicator Ticks */}
    <path d="M9.5 11a4.5 4.5 0 0 1 7 0" strokeDasharray="1 2" strokeWidth="1.4" />

    {/* Animated Sweeping Gauge Needle */}
    <g className="speed-needle">
      <path d="M13 14L17 7.5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="13" cy="14" r="1.5" fill="currentColor" />
    </g>

    {/* Sleek Flame Trail Wisp */}
    <path d="M5.5 10c-1.5-2 0-4.5 3-4.5 1.5 1 2 2 1.2 3.5" strokeWidth="1.4" />
  </svg>
);

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
      case 'Rocket': return AnimatedRocketIcon;
      case 'Bot': return AnimatedBotIcon;
      case 'BarChart3': return AnimatedChartIcon;
      case 'Cog': return Cog;
      case 'TrendingUp': return TrendingUp;
      case 'Link': return Link;
      case 'Globe': return Globe;
      case 'Wrench': return Wrench;
      case 'Clock': return FastStopwatchIcon;
      case 'Coins': return SaveMoneyIcon;
      case 'Eye': return AnimatedEyeIcon;
      case 'Zap': return AnimatedSpeedometerIcon;
      default: return Trophy;
    }
  };

  return (
    <section id="achievements" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Section Header per Section 15 */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag border border-[#FF8F00]/40 bg-[#FF8F00]/10 text-[#FF8F00] mb-3">
          <GlitteringTrophyIcon className="w-3.5 h-3.5" />
          <span className="text-[#FF8F00] font-bold">ACHIEVEMENTS</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          UNLOCKED <span className="text-[#FF8F00]">MILESTONES & CAPABILITIES</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          &gt; Key engineering capabilities, delivered business software solutions, and client ROI rewards.
        </p>
      </div>

      {/* 8 Capability Achievement Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {ACHIEVEMENTS.map((ach) => {
          const rarityClass = getRarityClass(ach.rarity);
          const IconComp = getIcon(ach.icon);

          return (
            <div
              key={ach.id}
              onMouseEnter={() => playCyberSound('hover')}
              className="glass-panel p-6 flex flex-col justify-between group hover:border-[#FF8F00]/70 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_12px_25px_rgba(255,143,0,0.18)] transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{ach.category}</span>
                  <span className={`badge-tag ${rarityClass} text-[10px] uppercase font-bold`}>
                    {ach.rarity}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF8F00]/15 border border-[#FF8F00]/40 flex items-center justify-center text-[#FF8F00] shrink-0 group-hover:scale-110 group-hover:border-[#FF8F00] transition-all">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-white group-hover:text-[#FF8F00] transition-colors leading-tight">
                      {ach.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-gray-300 font-sans leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#10B981]">
                <span className="flex items-center gap-1 font-bold tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  CAPABILITY UNLOCKED
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── YOUR REWARD FOR HIRING ME Banner ──────────────────────── */}
      <div className="glass-panel p-6 sm:p-8 border-2 border-[#FF8F00]/40 shadow-[0_0_35px_rgba(255,143,0,0.15)] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FF8F00]/15 border border-[#FF8F00]/50 flex items-center justify-center text-[#FF8F00] shrink-0">
              <Gift className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-black-ops font-bold text-lg sm:text-xl text-white tracking-wide">
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
                onMouseEnter={() => playCyberSound('hover')}
                className="p-4 rounded-xl bg-[#000000]/70 border border-[#FF8F00]/30 hover:border-[#FF8F00]/70 hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-[0_10px_20px_rgba(255,143,0,0.2)] transition-all duration-300 flex flex-col items-center justify-center text-center gap-2.5 cursor-pointer group"
              >
                <div className="w-9 h-[#FF8F00] w-9 h-9 rounded-lg bg-[#FF8F00]/15 border border-[#FF8F00]/40 flex items-center justify-center text-[#FF8F00] group-hover:scale-110 group-hover:bg-[#FF8F00]/25 transition-all">
                  <RewardIcon className="w-4.5 h-4.5" />
                </div>
                <span className="font-mono text-xs font-bold text-gray-200 group-hover:text-white transition-colors">{reward.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
