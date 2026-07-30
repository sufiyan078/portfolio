import React from 'react';
import {
  User, Search, Layers, Zap, ShieldCheck, Rocket, HeartHandshake,
  Target, Bot, MessageSquare, Sparkles, TrendingUp, GitBranch, Crown,
  Crosshair
} from 'lucide-react';
import { BUILDER_PROFILE, DEV_PROCESS, CLIENT_REASONS } from '../data/profile';
import type { ProcessStage, ClientCard } from '../data/profile';
import { playCyberSound } from '../utils/soundEffects';

/* ── Icon resolver ────────────────────────────────────────── */
const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Search, Layers, Zap, ShieldCheck, Rocket, HeartHandshake,
  Target, Bot, MessageSquare, Sparkles, TrendingUp, GitBranch, Crown
};

const resolveIcon = (name: string) => iconMap[name] ?? Target;

/* ── Dev Process Stage Node ───────────────────────────────── */
const StageNode: React.FC<{ stage: ProcessStage; index: number; total: number }> = ({ stage, index, total }) => {
  const Icon = resolveIcon(stage.icon);
  const isLast = index === total - 1;

  return (
    <div className="relative flex items-start gap-4 group">
      {/* Vertical connector line */}
      {!isLast && (
        <div className="absolute left-[19px] top-[44px] w-[2px] h-[calc(100%-12px)] bg-gradient-to-b from-[#FF8F00]/60 to-[#FF8F00]/10" />
      )}

      {/* Node circle */}
      <div className="relative z-10 w-10 h-10 shrink-0 rounded-xl bg-[#FF8F00]/10 border border-[#FF8F00]/40 flex items-center justify-center group-hover:bg-[#FF8F00]/20 group-hover:border-[#FF8F00]/70 group-hover:shadow-[0_0_14px_rgba(255,143,0,0.35)] transition-all duration-300">
        <Icon className="w-4.5 h-4.5 text-[#FF8F00]" />
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
      onMouseEnter={() => playCyberSound('hover')}
      className="p-5 rounded-2xl bg-[#000000]/60 border border-white/5 hover:border-[#FF8F00]/40 transition-all duration-300 group cursor-default"
    >
      <div className="flex items-start gap-3.5">
        {/* Icon badge */}
        <div className="w-9 h-9 shrink-0 rounded-lg bg-[#FF8F00]/10 border border-[#FF8F00]/30 flex items-center justify-center group-hover:bg-[#FF8F00]/20 group-hover:border-[#FF8F00]/50 group-hover:shadow-[0_0_10px_rgba(255,143,0,0.25)] transition-all duration-300">
          <Icon className="w-4 h-4 text-[#FF8F00]" />
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
          <Crosshair className="w-3.5 h-3.5 text-[#FF8F00]" />
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
              <div className="w-12 h-12 rounded-xl bg-[#FF8F00]/15 border border-[#FF8F00]/40 flex items-center justify-center text-[#FF8F00]">
                <User className="w-6 h-6" />
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
                <Layers className="w-4 h-4 text-[#FF8F00]" />
                DEVELOPMENT PROCESS
              </h4>

              <div className="pl-0.5">
                {DEV_PROCESS.map((stage, idx) => (
                  <StageNode key={stage.id} stage={stage} index={idx} total={DEV_PROCESS.length} />
                ))}
              </div>
            </div>
          </div>

          {/* Mission Callout */}
          <div className="glass-panel p-6 border-l-4 border-l-[#FF8F00]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF8F00] mb-2 font-bold uppercase">
              <Rocket className="w-4 h-4" />
              <span>READY FOR DEPLOYMENT</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Every project follows this process — from a one-page landing site to a full-scale business application. No shortcuts, no surprises.
            </p>
          </div>
        </div>

        {/* ═══ RIGHT COLUMN — Why Clients Choose Me ═══ */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="glass-panel p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#D90000]/15 border border-[#D90000]/40 flex items-center justify-center text-[#D90000]">
                <ShieldCheck className="w-5 h-5" />
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
