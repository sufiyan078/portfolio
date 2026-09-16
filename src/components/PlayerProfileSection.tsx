import React from 'react';
import {
  Target, MessageSquare, Sparkles, GitBranch, Crown,
  Crosshair, Search, Layers, Zap, ShieldCheck, Rocket, HeartHandshake, Bot, TrendingUp
} from './ui/RealmIcons';
import { BUILDER_PROFILE, DEV_PROCESS, CLIENT_REASONS, BUSINESS_HELP_ITEMS } from '../data/profile';
import type { ProcessStage, ClientCard } from '../data/profile';
import { getUniversalAudioProps } from '../utils/soundEffects';
import { ShieldKnightEmblem } from './ui/ShieldKnightEmblem';
import { IntelDisclosure } from './ui/IntelDisclosure';

/* ── Icon resolver ────────────────────────────────────────── */
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Search,
  Layers,
  Zap,
  ShieldCheck,
  Rocket,
  HeartHandshake,
  Target,
  Bot,
  MessageSquare,
  Sparkles,
  TrendingUp,
  GitBranch,
  Crown
};

const resolveIcon = (name: string) => iconMap[name] ?? Target;
const businessIcons: Record<string, React.FC<{ className?: string }>> = {
  dashboard: TrendingUp, automate: Zap, 'ai-workflow': Bot,
  'internal-app': Layers, reports: GitBranch, 'saas-mvp': Rocket,
};

/* ── Dev Process Stage Node ───────────────────────────────── */
const StageNode: React.FC<{ stage: ProcessStage; index: number; total: number }> = ({ stage, index, total }) => {
  const Icon = resolveIcon(stage.icon);
  const isLast = index === total - 1;

  return (
    <div
      {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER')}
      className="relative flex items-start gap-4 group cursor-pointer"
    >
      {/* Vertical connector line */}
      {!isLast && (
        <div className="absolute left-[19px] top-[44px] w-[2px] h-[calc(100%-12px)] bg-gradient-to-b from-[#FF8F00]/60 to-[#FF8F00]/10" />
      )}

      {/* Solid Opaque Node Circle (Blocks line behind icon badge completely) */}
      <div className="relative z-10 w-10 h-10 shrink-0 rounded-xl bg-[#1A1009] border border-[#FF8F00]/50 flex items-center justify-center overflow-hidden p-2 group-hover:bg-[#2A180C] group-hover:border-[#FF8F00] group-hover:shadow-[0_0_16px_rgba(255,143,0,0.4)] transition-all duration-300">
        <Icon className="w-5 h-5 text-[#FF8F00] shrink-0 transition-transform duration-300 group-hover:scale-110" />
      </div>

      {/* Content */}
      <div className="pb-7 min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[10px] text-[#FF8F00]/60 font-bold">0{index + 1}</span>
          <h4 className="font-heading text-xs font-bold text-white group-hover:text-[#FF8F00] transition-colors tracking-wide">
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
      {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER')}
      className="p-5 rounded-2xl bg-[#000000]/75 border border-white/10 hover:border-[#D90000]/60 hover:shadow-[0_8px_20px_rgba(217,0,0,0.18)] transition-all duration-200 group cursor-default"
    >
      <div className="flex items-start gap-3.5">
        {/* Icon badge */}
        <div className="w-9 h-9 shrink-0 rounded-lg bg-[#D90000]/15 border border-[#D90000]/40 flex items-center justify-center overflow-hidden p-1.5 group-hover:bg-[#D90000]/25 group-hover:border-[#D90000] group-hover:shadow-[0_0_10px_rgba(217,0,0,0.3)] transition-all duration-300">
          <Icon className="w-4 h-4 text-[#FF4500] shrink-0 transition-transform duration-300 group-hover:scale-110" />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[9px] text-[#FF4500] font-bold">✔</span>
            <h4 className="font-heading text-sm font-bold text-white group-hover:text-[#FF4500] transition-colors">
              {card.title}
            </h4>
          </div>
          <IntelDisclosure label="Read intel">
            {card.description}
          </IntelDisclosure>
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
        <div className="badge-tag border border-[#FF8F00]/40 bg-[#FF8F00]/10 text-[#FF8F00] mb-3 group">
          <Crosshair className="w-3.5 h-3.5 text-[#FF8F00] transition-transform duration-300 group-hover:scale-110" />
          <span className="text-[#FF8F00] font-bold">BUILDER INTEL</span>
        </div>
        <h2 className="font-heading font-extrabold text-[32px] sm:text-[38px] text-white tracking-tight">
          HOW I <span className="text-[#FF8F00]">BUILD SOFTWARE</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          From discovery to deployment. A clear path through every quest.
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
                  <span className="px-1.5 py-0.5 rounded bg-[#CD1818]/20 border border-[#CD1818]/50 text-[#FF8F00] font-bold">CLASS: <span className="text-[#FF4500]">{BUILDER_PROFILE.playerClass}</span></span>
                </div>
              </div>
            </div>

            {/* Roles */}
            <div className="space-y-2 mb-6">
              {BUILDER_PROFILE.roles.map((role, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-heading font-semibold tracking-wide text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8F00] shrink-0" />
                  <span>{role}</span>
                </div>
              ))}
            </div>

            {/* Development Process — RPG Skill Tree */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="font-mono text-xs text-slate-300 uppercase tracking-widest mb-5 font-bold flex items-center gap-2 group">
                <Layers className="w-4 h-4 text-[#FF8F00] transition-transform duration-300 group-hover:scale-110" />
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
          <div className="glass-panel p-6 sm:p-8 border-2 border-[#FF8F00]/30 shadow-[0_0_30px_rgba(255,143,0,0.1)] relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF8F00]/15 border border-[#FF8F00]/40 flex items-center justify-center text-[#FF8F00]">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-white tracking-tight">HOW I CAN HELP YOUR BUSINESS</h3>
                <span className="font-mono text-xs text-[#FF8F00]">Custom software engineering solutions</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {BUSINESS_HELP_ITEMS.map((item) => (
                <div
                  key={item.id}
                  {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER', () => {
                    const targetId = item.id === 'saas-mvp' || item.id === 'automate' ? 'contact' : 'missions';
                    const el = document.getElementById(targetId);
                    el?.scrollIntoView({ behavior: 'smooth' });
                  })}
                  role="button" tabIndex={0}
                  className="realm-business-tile p-4 rounded-xl bg-[#000000]/80 border border-[#FF8F00]/30 hover:border-[#FF8F00] hover:-translate-y-1 hover:shadow-[0_8px_18px_rgba(255,143,0,0.22)] transition-all duration-200 group flex flex-col items-start justify-center gap-3 cursor-pointer"
                >
                  {React.createElement(businessIcons[item.id] ?? Target, { className: 'w-8 h-8 text-[#FF8F00] shrink-0' })}
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-mono font-medium text-slate-200 group-hover:text-white transition-colors">
                      {item.question}
                    </div>
                    <div className="text-xs font-heading font-bold text-[#FF8F00] mt-1 tracking-normal group-hover:translate-x-0.5 transition-transform">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
          {/* Full-width perks prevent a long right column and empty space on the left. */}
          <div className="glass-panel p-6 sm:p-8 border-2 border-[#D90000]/30 shadow-[0_0_30px_rgba(217,0,0,0.12)] group lg:col-span-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#D90000]/15 border border-[#D90000]/40 flex items-center justify-center text-[#D90000]">
                <ShieldCheck className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-white tracking-tight">WHY CLIENTS CHOOSE ME</h3>
                <span className="font-mono text-xs text-gray-400">How I deliver reliable business software</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* How I Work Group */}
            <div>
              <div className="badge-tag border border-[#D90000]/40 bg-[#D90000]/15 text-[#FF4500] text-[10px] font-bold tracking-widest uppercase mb-3">
                <span>HOW I WORK</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['business-first', 'structured-process', 'ai-accelerated', 'transparent-comms']
                  .map(id => CLIENT_REASONS.find(c => c.id === id))
                  .filter((card): card is NonNullable<typeof card> => Boolean(card))
                  .map((card) => (
                    <ReasonCard key={card.id} card={card} />
                  ))}
              </div>
            </div>

            {/* What You Get Group */}
            <div>
              <div className="badge-tag border border-[#D90000]/40 bg-[#D90000]/15 text-[#FF4500] text-[10px] font-bold tracking-widest uppercase mb-3">
                <span>WHAT YOU GET</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['production-ready', 'clean-ux', 'long-term', 'full-ownership']
                  .map(id => CLIENT_REASONS.find(c => c.id === id))
                  .filter((card): card is NonNullable<typeof card> => Boolean(card))
                  .map((card) => (
                    <ReasonCard key={card.id} card={card} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
