import React from 'react';
import { ENGINEERING_PRINCIPLES } from '../data/principles';
import { Wrench, Layers, Target, Compass, CheckCircle2 } from 'lucide-react';
import { AnimatedCogIcon } from './ui/AnimatedCogIcon';
import { getUniversalAudioProps } from '../utils/soundEffects';

export const EngineeringPrinciplesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench': return Wrench;
      case 'Cog': return AnimatedCogIcon;
      case 'CheckCircle2': return CheckCircle2;
      case 'Layers': return Layers;
      case 'Target': return Target;
      default: return Compass;
    }
  };

  return (
    <section id="principles" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag border border-[#FF8F00]/40 bg-[#FF8F00]/10 text-[#FF8F00] mb-3">
          <Compass className="w-3.5 h-3.5 text-[#FF8F00]" />
          <span className="text-[#FF8F00] font-bold">ENGINEERING PHILOSOPHY</span>
        </div>
        <h2 className="font-heading font-extrabold text-[32px] sm:text-[38px] text-white tracking-tight">
          ENGINEERING <span className="text-[#FF8F00]">APPROACH</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          &gt; Core principles guiding software architecture, data integrity, and business value delivery.
        </p>
      </div>

      {/* 5 Approach Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ENGINEERING_PRINCIPLES.map((principle, index) => {
          const IconComp = getIcon(principle.icon);
          const isFullWidthRow = index === 3 || index === 4;

          return (
            <div
              key={principle.id}
              {...getUniversalAudioProps('click', 'hover')}
              className={`h-full glass-panel p-6 sm:p-7 flex flex-col justify-between group hover:border-[#FF8F00]/60 hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(255,143,0,0.15)] transition-all duration-200 cursor-pointer ${
                isFullWidthRow && index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Principle Number & Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] text-[#FF8F00] font-bold tracking-wider">
                    {principle.number}
                  </span>
                  <span className="badge-tag bg-[#FF8F00]/10 border border-[#FF8F00]/30 text-[#FF8F00] text-[10px] uppercase font-bold px-2 py-0.5">
                    {principle.category}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF8F00]/15 border border-[#FF8F00]/40 flex items-center justify-center text-[#FF8F00] shrink-0 group-hover:scale-110 group-hover:border-[#FF8F00] transition-all">
                    <IconComp className="w-5 h-5 shrink-0" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#FF8F00] transition-colors leading-tight">
                    {principle.title}
                  </h3>
                </div>

                {/* 2-3 Sentence Engineering Approach Statement */}
                <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                  {principle.statement}
                </p>
              </div>

              {/* Bottom Decorative Footer Line */}
              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-gray-400">
                <span className="text-[#FF8F00]">CORE RULE #{index + 1}</span>
                <span className="text-gray-400 font-bold">VERIFIED</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
