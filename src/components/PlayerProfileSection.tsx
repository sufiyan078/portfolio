import React from 'react';
import {
  Target, MessageSquare, Sparkles, GitBranch, Crown,
  Crosshair
} from 'lucide-react';
import { BUILDER_PROFILE, DEV_PROCESS, CLIENT_REASONS, BUSINESS_HELP_ITEMS } from '../data/profile';
import type { ProcessStage, ClientCard } from '../data/profile';
import { getUniversalAudioProps } from '../utils/soundEffects';
import { ShieldKnightEmblem } from './ui/ShieldKnightEmblem';
import { AnimatedBotIcon } from './ui/AnimatedBotIcon';
import { AnimatedRocketIcon } from './ui/AnimatedRocketIcon';
import { AnimatedCircuitGearIcon } from './ui/AnimatedCircuitGearIcon';
import { AnimatedTrendingUpIcon } from './ui/AnimatedTrendingUpIcon';
import { AnimatedSearchIcon } from './ui/AnimatedSearchIcon';
import { AnimatedLayersIcon } from './ui/AnimatedLayersIcon';
import { AnimatedShieldCheckIcon } from './ui/AnimatedShieldCheckIcon';
import { AnimatedHeartHandshakeIcon } from './ui/AnimatedHeartHandshakeIcon';

/* ── Icon resolver ────────────────────────────────────────── */
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Search: AnimatedSearchIcon,
  Layers: AnimatedLayersIcon,
  Zap: AnimatedCircuitGearIcon,
  ShieldCheck: AnimatedShieldCheckIcon,
  Rocket: AnimatedRocketIcon,
  HeartHandshake: AnimatedHeartHandshakeIcon,
  Target,
  Bot: AnimatedBotIcon,
  MessageSquare,
  Sparkles,
  TrendingUp: AnimatedTrendingUpIcon,
  GitBranch,
  Crown
};

const resolveIcon = (name: string) => iconMap[name] ?? Target;

/* ── Dev Process Stage Node ───────────────────────────────── */
const StageNode: React.FC<{ stage: ProcessStage; index: number; total: number }> = ({ stage, index, total }) => {
  const Icon = resolveIcon(stage.icon);
  const isLast = index === total - 1;

  return (
    <div
      {...getUniversalAudioProps('click', 'hover')}
      className="relative flex items-start gap-4 group cursor-pointer"
    >
      {/* Vertical connector line */}
      {!isLast && (
        <div className="absolute left-[19px] top-[44px] w-[2px] h-[calc(100%-12px)] bg-gradient-to-b from-[#FF8F00]/60 to-[#FF8F00]/10" />
      )}

      {/* Solid Opaque Node Circle (Blocks line behind icon badge completely) */}
      <div className="relative z-10 w-10 h-10 shrink-0 rounded-xl bg-[#1A1009] border border-[#FF8F00]/50 flex items-center justify-center overflow-hidden p-2 group-hover:bg-[#2A180C] group-hover:border-[#FF8F00] group-hover:shadow-[0_0_16px_rgba(255,143,0,0.4)] transition-all duration-300">
        <Icon className="w-5 h-5 text-[#FF8F00] shrink-0" />
      </div>

      {/* Content */}
      <div className="pb-7 min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[10px] text-[#FF8F00]/60 font-bold">0{index + 1}</span>
          <h4 className="font-pixel text-[10px] sm:text-[11px] font-bold text-white group-hover:text-[#FF8F00] transition-colors tracking-wider">
            {stage.label}
          </h4>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed font-sans">
          {stage.description}
        </p>
      </div>
    </div>
  );
};

/* ── Client Reason Card ───────────────────────────────────── */
const ReasonCard: React.FC<{ card: ClientCard }> = ({ card }) => {
  const Icon = resolveIcon(card.icon);

  return (
    <div
      {...getUniversalAudioProps('click', 'hover')}
      className="p-5 rounded-2xl bg-[#000000]/60 border border-white/5 hover:border-[#FF8F00]/40 transition-all duration-300 group cursor-default"
    >
      <div className="flex items-start gap-3.5">
        {/* Icon badge */}
        <div className="w-9 h-9 shrink-0 rounded-lg bg-[#FF8F00]/10 border border-[#FF8F00]/30 flex items-center justify-center overflow-hidden p-1.5 group-hover:bg-[#FF8F00]/20 group-hover:border-[#FF8F00]/50 group-hover:shadow-[0_0_10px_rgba(255,143,0,0.25)] transition-all duration-300">
          <Icon className="w-4 h-4 text-[#FF8F00] shrink-0" />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[9px] text-[#FF8F00]/40 font-bold">✔</span>
            <h4 className="font-heading text-sm font-bold text-white group-hover:text-[#FF8F00] transition-colors">
              {card.title}
            </h4>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════ */
/* ██  MAIN SECTION COMPONENT                              ██ */
/* ═══════════════════════════════════════════════════════════ */
export const PlayerProfileSection: React.FC = () => {
  return (
    <section id="profile" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">

      {/* ── Section Header ─────────────────────────────── */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag border border-[#FF8F00]/40 bg-[#FF8F00]/10 text-[#FF8F00] mb-3">
          <div className="relative inline-flex items-center justify-center">
            <style>{`
              @keyframes radar-scan-spin {
                0% {
                  transform: rotate(0deg) scale(1);
                  filter: drop-shadow(0 0 2px rgba(255, 143, 0, 0.4));
                }
                50% {
                  transform: rotate(180deg) scale(1.15);
                  filter: drop-shadow(0 0 8px rgba(255, 143, 0, 0.9));
                }
                100% {
                  transform: rotate(360deg) scale(1);
                  filter: drop-shadow(0 0 2px rgba(255, 143, 0, 0.4));
                }
              }
              .anim-radar-crosshair {
                animation: radar-scan-spin 3s linear infinite;
                transform-origin: center center;
              }
            `}</style>
            <Crosshair className="w-3.5 h-3.5 text-[#FF8F00] anim-radar-crosshair" />
          </div>
          <span className="text-[#FF8F00] font-bold">BUILDER INTEL</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          HOW I <span className="text-[#FF8F00]">BUILD SOFTWARE</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          &gt; Structured process, business-first thinking, and AI-accelerated delivery — from discovery to production.
        </p>
      </div>

      {/* ── Two-Column Layout ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ═══ LEFT COLUMN — Builder Profile + Process ═══ */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* Builder Profile Card */}
          <div className="glass-panel p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                <ShieldKnightEmblem className="w-10 h-10" size={40} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-white">{BUILDER_PROFILE.name}</h3>
                <div className="flex items-center gap-2 font-mono text-xs mt-0.5">
                  <span className="px-1.5 py-0.5 rounded bg-[#FF8F00]/20 border border-[#FF8F00]/40 text-[#FF8F00] font-bold">CLASS: <span className="text-[#CD1818]">{BUILDER_PROFILE.playerClass}</span></span>
                </div>
              </div>
            </div>

            {/* Roles */}
            <div className="space-y-2 mb-6">
              {BUILDER_PROFILE.roles.map((role, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-black-ops tracking-wide text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8F00] shrink-0" />
                  <span>{role}</span>
                </div>
              ))}
            </div>

            {/* Development Process — RPG Skill Tree */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="font-pixel text-[9px] sm:text-[10px] text-gray-300 uppercase tracking-wider mb-5 font-bold flex items-center gap-2">
                <AnimatedLayersIcon className="w-4 h-4 text-[#FF8F00]" />
                DEVELOPMENT PROCESS
              </h4>

              <div className="pl-0.5">
                {DEV_PROCESS.map((stage, idx) => (
                  <StageNode key={stage.id} stage={stage} index={idx} total={DEV_PROCESS.length} />
                ))}
              </div>
            </div>
          </div>


        </div>

        {/* ═══ RIGHT COLUMN — Business Value + Why Clients Choose Me ═══ */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* How I Can Help Your Business Card */}
          <div className="glass-panel p-6 sm:p-8 border-2 border-[#FF8F00]/40 shadow-[0_0_30px_rgba(255,143,0,0.15)] relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF8F00]/15 border border-[#FF8F00]/50 flex items-center justify-center text-[#FF8F00]">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-pixel font-bold text-base sm:text-lg text-white tracking-wide">HOW I CAN HELP YOUR BUSINESS</h3>
                <span className="font-mono text-xs text-[#FF8F00]">Custom software engineering solutions</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {BUSINESS_HELP_ITEMS.map((item) => (
                <div
                  key={item.id}
                  {...getUniversalAudioProps('click', 'hover')}
                  className="p-4 rounded-xl bg-[#000000]/70 border border-[#FF8F00]/30 hover:border-[#FF8F00]/60 hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_8px_18px_rgba(255,143,0,0.18)] transition-all duration-300 group flex items-start gap-3 cursor-pointer"
                >
                  <span className="font-bold text-[#FF8F00] text-sm shrink-0 mt-0.5 select-none">✓</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-mono font-medium text-gray-200 group-hover:text-white transition-colors">
                      {item.question}
                    </div>
                    <div className="text-xs font-black-ops font-bold text-[#FF8F00] mt-1 tracking-wide group-hover:translate-x-0.5 transition-transform">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Clients Choose Me Card */}
          <div className="glass-panel p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#D90000]/15 border border-[#D90000]/40 flex items-center justify-center text-[#D90000]">
                <AnimatedShieldCheckIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-pixel font-bold text-base sm:text-lg text-white">WHY CLIENTS CHOOSE ME</h3>
                <span className="font-mono text-xs text-gray-400">How I deliver reliable business software</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CLIENT_REASONS.map((card) => (
                <ReasonCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
