import React, { useState } from 'react';
import { QUEST_LOG, type Quest } from '../data/timeline';
import { Flag, Award, ChevronDown, ChevronUp, Layers, CheckCircle2, Target } from 'lucide-react';
import { getUniversalAudioProps } from '../utils/soundEffects';

type QuestTab = 'overview' | 'deliverables' | 'tech' | 'reward';

const getQuestMetaCards = (quest: Quest) => [
  { label: 'ROLE', value: quest.role },
  { label: 'PERIOD', value: quest.period },
  { label: 'QUEST TYPE', value: quest.questType },
  { label: 'STATUS', value: quest.status },
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

export const QuestLogSection: React.FC = () => {
  const [expandedQuestId, setExpandedQuestId] = useState<string>('');
  const [activeTabs, setActiveTabs] = useState<Record<string, QuestTab>>({});

  const toggleQuest = (id: string) => {
    setExpandedQuestId(prev => (prev === id ? '' : id));
  };

  const setTab = (id: string, tab: QuestTab) => {
    setActiveTabs(prev => ({ ...prev, [id]: tab }));
  };

  return (
    <section id="quest-log" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag border border-[#FF8F00]/40 bg-[#FF8F00]/10 text-[#FF8F00] mb-3">
          <div className="relative inline-flex items-center justify-center">
            <style>{`
              @keyframes flag-banner-flutter {
                0%, 100% {
                  transform: rotate(0deg) skewY(0deg) scale(1);
                  filter: drop-shadow(0 0 2px rgba(255, 143, 0, 0.4));
                }
                25% {
                  transform: rotate(-8deg) skewY(-4deg) scale(1.12);
                  filter: drop-shadow(0 0 9px rgba(255, 143, 0, 0.95)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.8));
                }
                50% {
                  transform: rotate(6deg) skewY(3deg) scale(1.15);
                  filter: drop-shadow(0 0 10px rgba(255, 143, 0, 0.95));
                }
                75% {
                  transform: rotate(-3deg) skewY(-2deg) scale(1.05);
                }
              }
              .anim-flag-flutter {
                animation: flag-banner-flutter 2s ease-in-out infinite;
                transform-origin: left bottom;
              }
            `}</style>
            <Flag className="w-3.5 h-3.5 text-[#FF8F00] anim-flag-flutter" />
          </div>
          <span className="text-[#FF8F00] font-bold">QUEST LOG</span>
        </div>
        <h2 className="font-heading font-extrabold text-[32px] sm:text-[38px] text-white tracking-tight">
          CAREER <span className="text-[#FF8F00]">QUEST LOG TIMELINE</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          &gt; Quest Log tracking major software engineering milestones and career progression.
        </p>
      </div>

      <div className="relative border-l-2 border-[#FF8F00]/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
        {QUEST_LOG.map((quest) => {
          const isExpanded = expandedQuestId === quest.id;
          const currentTab = activeTabs[quest.id] || 'overview';
          const metaCards = getQuestMetaCards(quest);
          const statCards = getQuantifiableStats(quest.description);

          return (
            <div
              key={quest.id}
              className="relative glass-panel p-6 sm:p-8 group hover:border-[#FF8F00]/70 hover:-translate-y-2 hover:scale-[1.015] hover:shadow-[0_12px_25px_rgba(255,143,0,0.18)] transition-all duration-300"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-5 h-5 rounded-full bg-[#070B14] border-2 border-[#FF8F00] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#FF8F00]" />
              </div>

              {/* Card Banner Header */}
              <div
                {...getUniversalAudioProps('click', 'hover', () => toggleQuest(quest.id))}
                className="cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 select-none"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs font-bold text-[#FF8F00] px-2.5 py-1 rounded-md bg-[#FF8F00]/15 border border-[#FF8F00]/40">
                      {quest.period}
                    </span>
                    <span className="badge-tag badge-success text-[10px]">
                      {quest.status}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white group-hover:text-[#FF8F00] transition-colors">
                    {quest.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-gray-400">{quest.role}</span>
                  <button
                    aria-label={isExpanded ? 'Collapse quest details' : 'Expand quest details'}
                    className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white shrink-0 focus:outline-none cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Collapsed Brief View */}
              {!isExpanded && (
                <p className="text-sm text-gray-300 font-sans leading-relaxed mb-4">
                  {quest.description}
                </p>
              )}

              {/* Expanded Quest Detail View with 4 Tabs */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-white/10 space-y-6">
                  {/* Tab Bar */}
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto custom-scrollbar">
                    {[
                      { id: 'overview', label: 'OVERVIEW' },
                      { id: 'deliverables', label: 'DELIVERABLES' },
                      { id: 'tech', label: 'TECH LOADOUT' },
                      { id: 'reward', label: 'REWARD & IMPACT' },
                    ].map((t) => {
                      const isActive = currentTab === t.id;
                      return (
                        <button
                          key={t.id}
                          {...getUniversalAudioProps('click', 'hover', () => setTab(quest.id, t.id as QuestTab))}
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

                      {/* Description */}
                      <div className="p-5 rounded-2xl bg-[#000000] border border-[#FF8F00]/30">
                        <h4 className="font-mono text-xs text-[#FF8F00] font-bold uppercase mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4 text-[#FF8F00]" /> QUEST OBJECTIVE & OVERVIEW
                        </h4>
                        <p className="text-sm text-gray-300 font-sans leading-relaxed">{quest.description}</p>
                      </div>
                    </div>
                  )}

                  {currentTab === 'deliverables' && (
                    <div className="p-5 rounded-2xl bg-[#000000] border border-white/10 animate-fadeIn">
                      <h4 className="font-mono text-xs text-[#FF8F00] font-bold uppercase mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#FF8F00]" /> KEY ENGINEERING DELIVERABLES
                      </h4>
                      <p className="text-xs text-gray-300 font-mono leading-relaxed">&gt; {quest.description}</p>
                    </div>
                  )}

                  {currentTab === 'tech' && (
                    <div className="p-5 rounded-2xl bg-[#000000] border border-[#FF8F00]/30 animate-fadeIn">
                      <h4 className="font-mono text-xs text-gray-300 font-bold uppercase mb-3 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#FF8F00]" /> CORE TECH LOADOUT & PLATFORMS
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#000000] border border-[#FF8F00]/40 text-[#FF8F00] font-semibold">React</span>
                        <span className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#000000] border border-[#FF8F00]/40 text-[#FF8F00] font-semibold">TypeScript</span>
                        <span className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#000000] border border-[#FF8F00]/40 text-[#FF8F00] font-semibold">Firebase</span>
                        <span className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#000000] border border-[#FF8F00]/40 text-[#FF8F00] font-semibold">Tailwind CSS</span>
                      </div>
                    </div>
                  )}

                  {currentTab === 'reward' && (
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

                      {/* Reward Footer */}
                      <div className="p-5 rounded-2xl bg-[#FF8F00]/10 border border-[#FF8F00]/30 flex items-center gap-3">
                        <Award className="w-5 h-5 text-[#F59E0B] shrink-0" />
                        <div>
                          <span className="text-xs font-mono text-gray-300 font-bold block">QUEST REWARD:</span>
                          <span className="text-xs font-mono text-white font-semibold">{quest.reward}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Reward Footer when collapsed */}
              {!isExpanded && (
                <div className="pt-4 border-t border-white/10 flex items-center gap-2 font-mono text-xs text-[#10B981]">
                  <Award className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-gray-300 font-bold">REWARD:</span>
                  <span className="text-white">{quest.reward}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
