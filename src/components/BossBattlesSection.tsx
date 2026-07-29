import React, { useState } from 'react';
import { BOSS_BATTLES } from '../data/bossBattles';
import { Swords, AlertTriangle, ShieldCheck, ChevronDown, ChevronUp, Bug, Activity, Award } from 'lucide-react';
import { playCyberSound } from '../utils/soundEffects';

export const BossBattlesSection: React.FC = () => {
  const [expandedBattleId, setExpandedBattleId] = useState<string>(BOSS_BATTLES[0].id);

  const toggleBattle = (id: string) => {
    playCyberSound('click');
    setExpandedBattleId(prev => (prev === id ? '' : id));
  };

  return (
    <section id="boss-battles" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag badge-legendary mb-3">
          <Swords className="w-3.5 h-3.5 text-[#FF8F00]" />
          <span className="text-[#FF8F00]">BOSS BATTLES</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          ENGINEERING <span className="text-[#FF8F00]">BOSS BATTLES</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          &gt; Signature engineering problem-solving stories: Problem Context → Investigation → Technical Solution → Outcome.
        </p>
      </div>

      {/* Production Case Studies List */}
      <div className="space-y-6">
        {BOSS_BATTLES.map((battle) => {
          const isExpanded = expandedBattleId === battle.id;

          return (
            <div
              key={battle.id}
              className={`cyber-card p-6 sm:p-8 transition-all duration-300 ${
                isExpanded ? 'border-2 border-[#D90000]/60 bg-[#280905]/90 shadow-[0_0_35px_rgba(217,0,0,0.25)]' : ''
              }`}
            >
              {/* Header Banner */}
              <div
                onClick={() => toggleBattle(battle.id)}
                onMouseEnter={() => playCyberSound('hover')}
                className="cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D90000]/15 border border-[#D90000]/40 flex items-center justify-center text-[#D90000] shrink-0">
                    <Bug className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="badge-tag badge-epic text-[10px]">
                        THREAT LEVEL: {battle.threatLevel}
                      </span>
                      <span className="font-mono text-xs text-gray-400">| {battle.category}</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white hover:text-[#D90000] transition-colors">
                      {battle.bossName}: <span className="text-gray-300 font-normal">{battle.title}</span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    aria-label={isExpanded ? 'Collapse case study details' : 'Expand case study details'}
                    className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white shrink-0 focus:outline-none cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Case Study Content */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-white/10 space-y-6">
                  {/* Problem & Observed Symptoms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-[#000000] border border-[#D90000]/30">
                      <h4 className="font-mono text-xs text-[#D90000] font-bold uppercase mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> OBSERVED SYMPTOMS
                      </h4>
                      <ul className="space-y-1.5 text-xs text-gray-300 font-mono">
                        {battle.symptoms.map((s, i) => (
                          <li key={i}>&gt; {s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#000000] border border-white/10">
                      <h4 className="font-mono text-xs text-gray-300 font-bold uppercase mb-3 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#FF8F00]" /> PROBLEM CONTEXT
                      </h4>
                      <p className="text-xs text-gray-300 font-sans leading-relaxed">{battle.problem}</p>
                    </div>
                  </div>

                  {/* Investigation & Root Cause */}
                  <div className="p-5 rounded-2xl bg-[#000000] border border-[#FF8F00]/30">
                    <h4 className="font-mono text-xs text-[#FF8F00] font-bold uppercase mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4" /> INVESTIGATION TRAJECTORY
                    </h4>
                    <p className="text-xs text-gray-300 font-mono leading-relaxed mb-3">{battle.investigation}</p>
                    <div className="text-xs font-mono text-gray-300 pt-2 border-t border-white/10">
                      <strong className="text-[#FF8F00]">ROOT CAUSE:</strong> {battle.rootCause}
                    </div>
                  </div>

                  {/* Solution & Outcome */}
                  <div className="p-5 rounded-2xl bg-[#FF8F00]/10 border border-[#FF8F00]/30">
                    <h4 className="font-mono text-xs text-[#FF8F00] font-bold uppercase mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> TECHNICAL SOLUTION
                    </h4>
                    <p className="text-xs text-white font-mono leading-relaxed mb-3">{battle.solution}</p>
                    <div className="text-xs font-mono text-[#FF8F00] font-bold">OUTCOME: {battle.outcome}</div>
                  </div>

                  {/* Key Takeaway & Reward */}
                  <div className="p-4 rounded-2xl bg-[#FF8F00]/10 border border-[#FF8F00]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-[#FF8F00] shrink-0" />
                      <div className="text-xs font-mono text-gray-200">
                        <strong className="text-[#FF8F00]">KEY ENGINEERING TAKEAWAY:</strong> {battle.takeaway}
                      </div>
                    </div>
                    <span className="badge-tag badge-legendary text-xs shrink-0 font-bold">
                      REWARD: {battle.reward}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
