import React from 'react';
import { User, Target, Cpu, CheckCircle2, Award, Layers } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { playCyberSound } from '../utils/soundEffects';

export const PlayerProfileSection: React.FC = () => {
  return (
    <section id="profile" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag badge-rare mb-3">
          <User className="w-3.5 h-3.5 text-[#FF8F00]" />
          <span>PLAYER PROFILE</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          DEVELOPER <span className="text-[#FF8F00]">PROFILE & PHILOSOPHY</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          &gt; Core attributes, engineering specializations, and guiding principles of technical quality.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Player Attributes & Specializations */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-5">
              <div className="w-12 h-12 rounded-xl bg-[#FF8F00]/15 border border-[#FF8F00]/40 flex items-center justify-center text-[#FF8F00]">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-white">{PROFILE.name}</h3>
                <div className="flex items-center gap-2 font-mono text-xs mt-0.5">
                  <span className="px-1.5 py-0.5 rounded bg-[#FF8F00]/20 border border-[#FF8F00]/40 text-[#FF8F00] font-bold">CLASS: <span className="text-[#CD1818]">{PROFILE.playerClass}</span></span>
                  <span className="text-gray-300 font-semibold">{PROFILE.role}</span>
                </div>
                <span className="font-mono text-xs text-gray-400 block mt-1">{PROFILE.level} | {PROFILE.location}</span>
              </div>
            </div>

            {/* Core Competency Attribute Bars */}
            <h4 className="font-pixel text-[9px] sm:text-[10px] text-gray-300 uppercase tracking-wider mb-4 font-bold flex items-center gap-2">
              <Target className="w-4 h-4 text-[#FF8F00]" />
              CORE COMPETENCY ATTRIBUTES
            </h4>

            <div className="space-y-4 mb-6">
              {PROFILE.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-black-ops tracking-wide">
                    <span className="text-gray-300">{stat.label}</span>
                    <span className="text-[#FF8F00] font-bold">{stat.score}%</span>
                  </div>
                  <div className="w-full bg-[#000000] h-2.5 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF8F00] to-[#D90000] rounded-full transition-all duration-1000"
                      style={{ width: `${stat.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Specializations List */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="font-pixel text-[9px] sm:text-[10px] text-gray-300 uppercase tracking-wider mb-4 font-bold flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#D90000]" />
                PRIMARY SPECIALIZATIONS
              </h4>
              <div className="space-y-2.5">
                {PROFILE.specializations.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-black-ops tracking-wide text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#FF8F00] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission Objective Callout */}
          <div className="glass-panel p-6 border-l-4 border-l-[#FF8F00]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF8F00] mb-2 font-bold uppercase">
              <Award className="w-4 h-4" />
              <span>PRIMARY MISSION STATEMENT</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              {PROFILE.missionStatement}
            </p>
          </div>
        </div>

        {/* Right Column: Engineering Philosophy Principles */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="glass-panel p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#D90000]/15 border border-[#D90000]/40 flex items-center justify-center text-[#D90000]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-pixel font-bold text-base sm:text-lg text-white">ENGINEERING PHILOSOPHY</h3>
                <span className="font-mono text-xs text-gray-400">5 Guiding Principles of Technical Excellence</span>
              </div>
            </div>

            <div className="space-y-4">
              {PROFILE.philosophy.map((item) => (
                <div
                  key={item.number}
                  onMouseEnter={() => playCyberSound('hover')}
                  className="p-5 rounded-2xl bg-[#000000]/80 border border-white/5 hover:border-[#FF8F00]/50 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono font-bold text-lg text-[#FF8F00]/60 group-hover:text-[#FF8F00] transition-colors">
                      {item.number}
                    </span>
                    <div>
                      <h4 className="font-heading text-base font-bold text-white group-hover:text-[#FF8F00] transition-colors">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-sm text-gray-300 font-sans leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
