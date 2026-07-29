import React, { useState } from 'react';
import { GlassPanel } from './GlassPanel';
import { AchievementBadge } from './AchievementBadge';
import { Bug, ChevronDown, ChevronUp, AlertTriangle, ShieldCheck, Cpu, Lightbulb } from 'lucide-react';
import type { BossBattle } from '../../data/bossBattles';

interface BossBattleCardProps {
  battle: BossBattle;
  defaultExpanded?: boolean;
}

export const BossBattleCard: React.FC<BossBattleCardProps> = ({ battle, defaultExpanded = false }) => {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);

  return (
    <GlassPanel borderGlowColor="crimson" className="transition-all duration-300">
      <div
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ff2a6d]/15 border border-[#ff2a6d]/40 flex items-center justify-center text-[#ff2a6d] shrink-0">
            <Bug className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AchievementBadge rarity="Expert" label={`${battle.threatLevel} PRIORITY`} />
              <span className="font-mono text-xs text-gray-400">| {battle.category}</span>
            </div>
            <h3 className="font-orbitron font-bold text-lg sm:text-xl text-white">
              {battle.bossName}: <span className="text-gray-300 font-normal">{battle.title}</span>
            </h3>
          </div>
        </div>

        <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white shrink-0 self-end sm:self-auto focus:outline-none focus:ring-2 focus:ring-[#ff2a6d]">
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-6 pt-6 border-t border-white/10 space-y-6 animate-fadeIn">
          {/* Symptoms & Problem */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#080b14] border border-[#ff2a6d]/30">
              <h4 className="font-orbitron text-xs text-[#ff2a6d] font-bold uppercase mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Observed Symptoms
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300 font-mono">
                {battle.symptoms.map((s, i) => (
                  <li key={i}>&gt; {s}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-[#080b14] border border-white/10">
              <h4 className="font-orbitron text-xs text-gray-300 font-bold uppercase mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00f3ff]" /> Problem Context
              </h4>
              <p className="text-sm text-gray-300 font-sans leading-relaxed">{battle.problem}</p>
            </div>
          </div>

          {/* Investigation & Solution */}
          <div className="p-5 rounded-xl bg-[#00ff9d]/10 border border-[#00ff9d]/30">
            <h4 className="font-orbitron text-xs text-[#00ff9d] font-bold uppercase mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Technical Solution & Outcome
            </h4>
            <p className="text-sm text-white font-mono leading-relaxed mb-3">{battle.solution}</p>
            <div className="text-xs sm:text-sm font-mono text-[#00ff9d] font-bold">OUTCOME: {battle.outcome}</div>
          </div>

          {/* Key Takeaway */}
          <div className="p-4 rounded-xl bg-[#ffd700]/10 border border-[#ffd700]/30 flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-[#ffd700] shrink-0" />
            <div className="text-xs sm:text-sm font-mono text-gray-200">
              <strong className="text-[#ffd700]">KEY ENGINEERING TAKEAWAY:</strong> {battle.takeaway}
            </div>
          </div>
        </div>
      )}
    </GlassPanel>
  );
};
