import React from 'react';
import { QUEST_LOG } from '../data/timeline';
import { Flag, Award, Sparkles } from 'lucide-react';
import { playCyberSound } from '../utils/soundEffects';

export const QuestLogSection: React.FC = () => {
  return (
    <section id="quest-log" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Section Header per Section 15 */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag badge-rare mb-3">
          <Flag className="w-3.5 h-3.5 text-[#443199]" />
          <span>QUEST LOG</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          CAREER <span className="text-[#443199]">QUEST LOG TIMELINE</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          &gt; Quest Log tracking major software engineering milestones and career progression.
        </p>
      </div>

      <div className="relative border-l-2 border-[#443199]/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
        {QUEST_LOG.map((quest) => (
          <div
            key={quest.id}
            onMouseEnter={() => playCyberSound('hover')}
            className="relative glass-panel p-6 sm:p-8 group hover:border-[#443199]/50 transition-all duration-300"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-5 h-5 rounded-full bg-[#070B14] border-2 border-[#443199] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#443199]" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#443199] px-2.5 py-1 rounded-md bg-[#443199]/15 border border-[#443199]/40">
                  {quest.period}
                </span>
                <span className="badge-tag badge-success text-[10px]">
                  {quest.status}
                </span>
              </div>
              <span className="font-mono text-xs text-gray-400">{quest.role}</span>
            </div>

            <h3 className="font-heading font-bold text-xl text-white group-hover:text-[#443199] transition-colors mb-3">
              {quest.title}
            </h3>

            <p className="text-sm text-gray-300 font-sans leading-relaxed mb-4">
              {quest.description}
            </p>

            <div className="pt-4 border-t border-white/10 flex items-center gap-2 font-mono text-xs text-[#10B981]">
              <Award className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-gray-300 font-bold">REWARD:</span>
              <span className="text-white">{quest.reward}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
