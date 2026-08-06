import React, { useState } from 'react';
import { BOSS_BATTLES, type BossBattle } from '../data/bossBattles';
import { AlertTriangle, ShieldCheck, ChevronDown, ChevronUp, Bug, Activity, Award } from 'lucide-react';
import { getUniversalAudioProps } from '../utils/soundEffects';
import { ClashingSwordsIcon } from './ui/ClashingSwordsIcon';

type BattleTab = 'overview' | 'investigation' | 'solution' | 'results';

const getBossMetaCards = (battle: BossBattle) => [
  { label: 'THREAT LEVEL', value: battle.threatLevel },
  { label: 'CATEGORY', value: battle.category },
  { label: 'IMPACT SCOPE', value: battle.bossName },
  { label: 'STATUS', value: 'DEFEATED' },
];

const getQuantifiableStats = (text: string) => {
  const stats: { number: string; caption: string }[] = [];
  const match = text.match(/\b(\d+(?:\.\d+)?%|\d+\+|\d+x)\b/i);
  if (match) {
    const number = match[1];
    let caption = text.replace(match[0], '').replace(/^[^a-zA-Z0-9]+/, '').trim();
    if (caption.length > 35) caption = caption.substring(0, 35) + '...';
    stats.push({ number, caption });
  }
  return stats;
};

export const BossBattlesSection: React.FC = () => {
  const [expandedBattleId, setExpandedBattleId] = useState<string>('');
  const [activeTabs, setActiveTabs] = useState<Record<string, BattleTab>>({});

  const toggleBattle = (id: string) => {
    setExpandedBattleId(prev => (prev === id ? '' : id));
  };

  const setTab = (id: string, tab: BattleTab) => {
    setActiveTabs(prev => ({ ...prev, [id]: tab }));
  };

  return (
    <section id="boss-battles" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag border border-[#FF8F00]/40 bg-[#FF8F00]/10 text-[#FF8F00] mb-3">
          <ClashingSwordsIcon className="w-4 h-4" />
          <span className="text-[#FF8F00] font-bold">BOSS BATTLES</span>
        </div>
        <h2 className="font-heading font-extrabold text-[32px] sm:text-[38px] text-white tracking-tight">
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
          const currentTab = activeTabs[battle.id] || 'overview';
          const metaCards = getBossMetaCards(battle);
          const statCards = getQuantifiableStats(battle.outcome);

          return (
            <div
              key={battle.id}
              className={`cyber-card p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-[#FF4500]/70 hover:shadow-[0_12px_25px_rgba(255,69,0,0.2)] ${
                isExpanded ? 'border-2 border-[#D90000]/60 bg-[#280905]/90 shadow-[0_0_35px_rgba(217,0,0,0.25)]' : ''
              }`}
            >
              {/* Header Banner */}
              <div
                {...getUniversalAudioProps('click', 'hover', () => toggleBattle(battle.id))}
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
                  {/* Tab Bar */}
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto custom-scrollbar">
                    {[
                      { id: 'overview', label: 'OVERVIEW' },
                      { id: 'investigation', label: 'INVESTIGATION' },
                      { id: 'solution', label: 'SOLUTION' },
                      { id: 'results', label: 'RESULTS' },
                    ].map((t) => {
                      const isActive = currentTab === t.id;
                      return (
                        <button
                          key={t.id}
                          {...getUniversalAudioProps('click', 'hover', () => setTab(battle.id, t.id as BattleTab))}
                          className={`px-4 py-2 rounded-xl font-pixel text-[10px] sm:text-[11px] font-bold tracking-wider transition-all duration-300 focus:outline-none cursor-pointer whitespace-nowrap ${
                            isActive
                              ? 'bg-[#FF8F00]/20 text-[#FF8F00] border border-[#FF8F00]/80 shadow-[0_0_15px_rgba(255,143,0,0.4)]'
                              : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Tab Content Panels */}
                  {currentTab === 'overview' && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* Meta-Info Card Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {metaCards.map((card, i) => (
                          <div key={i} className="p-3 rounded-xl bg-[#000000] border border-[#FF8F00]/40 flex flex-col gap-1 text-left">
                            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">{card.label}</span>
                            <span className="font-mono text-xs font-bold text-[#FF8F00] truncate">{card.value}</span>
                          </div>
                        ))}
                      </div>

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
                    </div>
                  )}

                  {currentTab === 'investigation' && (
                    <div className="p-5 rounded-2xl bg-[#000000] border border-[#FF8F00]/30 animate-fadeIn">
                      <h4 className="font-mono text-xs text-[#FF8F00] font-bold uppercase mb-3 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> INVESTIGATION TRAJECTORY
                      </h4>
                      <p className="text-xs text-gray-300 font-mono leading-relaxed mb-3">{battle.investigation}</p>
                      <div className="text-xs font-mono text-gray-300 pt-2 border-t border-white/10">
                        <strong className="text-[#FF8F00]">ROOT CAUSE:</strong> {battle.rootCause}
                      </div>
                    </div>
                  )}

                  {currentTab === 'solution' && (
                    <div className="p-5 rounded-2xl bg-[#FF8F00]/10 border border-[#FF8F00]/30 animate-fadeIn">
                      <h4 className="font-mono text-xs text-[#FF8F00] font-bold uppercase mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> TECHNICAL SOLUTION
                      </h4>
                      <p className="text-xs text-white font-mono leading-relaxed mb-3">{battle.solution}</p>
                    </div>
                  )}

                  {currentTab === 'results' && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* Stat Callouts */}
                      {statCards.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {statCards.map((stat, i) => (
                            <div key={i} className="p-3 rounded-xl bg-[#000000] border border-[#FF8F00]/40 flex flex-col items-center justify-center text-center">
                              <span className="font-mono text-xl sm:text-2xl font-bold text-[#FF8F00]">{stat.number}</span>
                              <span className="font-mono text-[10px] text-gray-300 uppercase tracking-wider mt-1">{stat.caption}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Outcome & Takeaway */}
                      <div className="p-5 rounded-2xl bg-[#FF8F00]/10 border border-[#FF8F00]/30">
                        <h4 className="font-mono text-xs text-[#FF8F00] font-bold uppercase mb-2">BATTLE OUTCOME</h4>
                        <div className="text-xs font-mono text-white mb-4">&gt; {battle.outcome}</div>

                        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-[#FF8F00] shrink-0" />
                            <div className="text-xs font-mono text-gray-200">
                              <strong className="text-[#FF8F00]">KEY TAKEAWAY:</strong> {battle.takeaway}
                            </div>
                          </div>
                          <span className="badge-tag badge-legendary text-xs shrink-0 font-bold">
                            REWARD: {battle.reward}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
