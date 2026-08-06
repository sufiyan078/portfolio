import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import { getUniversalAudioProps } from '../utils/soundEffects';
import { TypingAnimation } from './ui/TypingAnimation';
import { AnimatedBotIcon } from './ui/AnimatedBotIcon';
import { AnimatedChartIcon } from './ui/AnimatedChartIcon';
import { AnimatedGlobeIcon } from './ui/AnimatedGlobeIcon';
import { AnimatedCogIcon } from './ui/AnimatedCogIcon';
import { AnimatedTrendingUpIcon } from './ui/AnimatedTrendingUpIcon';
import { AnimatedSmartphoneIcon } from './ui/AnimatedSmartphoneIcon';
import { BlacksmithForgeIcon } from './ui/BlacksmithForgeIcon';

interface LandingHeroProps {
  onPressStart: () => void;
  onOpenTerminal: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onPressStart, onOpenTerminal }) => {
  const serviceBadges = [
    { name: "Websites & Landing Pages", icon: AnimatedGlobeIcon, color: "text-[#FF8F00]" },
    { name: "Custom Web Applications", icon: AnimatedSmartphoneIcon, color: "text-[#FF8F00]" },
    { name: "Dashboards & Data Visualization", icon: AnimatedChartIcon, color: "text-[#FF8F00]" },
    { name: "AI Agents & AI Automation", icon: AnimatedBotIcon, color: "text-[#FF8F00]" },
    { name: "Business Process Automation", icon: AnimatedCogIcon, color: "text-[#FF8F00]" },
    { name: "Reporting & Analytics Systems", icon: AnimatedTrendingUpIcon, color: "text-[#FF8F00]" }
  ];

  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] pt-28 sm:pt-32 md:pt-36 pb-16 flex flex-col justify-start items-center text-center px-4 sm:px-6">
      {/* Background Radial Glow — cool blue to match the sky canvas */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1A2A4A]/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto z-10 flex flex-col items-center w-full">
        
        {/* Main Hero Headline Section */}
        <div className="mb-4 flex flex-col items-center w-full">
          <div className="mb-3">
            <span className="font-bungee text-xl sm:text-3xl md:text-[42px] lg:text-[46px] text-[#FF8F00] tracking-wider uppercase drop-shadow-[0_0_25px_rgba(255,143,0,0.6)] leading-relaxed block py-1">
              <TypingAnimation>WELCOME TO THE CODE REALM</TypingAnimation>
            </span>
          </div>
          <h1 className="font-black-ops text-[26px] sm:text-[46px] md:text-[58px] font-extrabold tracking-tight leading-tight max-w-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#7F2020] via-[#C3110C] to-[#8E1616] px-2">
            YOU'VE ENTERED SUFIYAN'S WORLD.
          </h1>
        </div>

        {/* Sub-headline / Vision */}
        <h2 className="font-heading text-base sm:text-xl md:text-2xl font-semibold text-gray-200 mb-8 max-w-3xl px-2">
          Building Business <span className="text-[#FF8F00]">Software</span> That Saves Time & Makes Money.
        </h2>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-10 sm:mb-12 w-full max-w-md sm:max-w-none px-4">
          <button
            {...getUniversalAudioProps('click', 'hover', onPressStart)}
            className="btn-primary font-black-ops tracking-wider w-full sm:w-auto justify-center"
          >
            <span>Start Mission</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            {...getUniversalAudioProps('openModal', 'hover', onOpenTerminal)}
            className="btn-secondary font-black-ops tracking-wider w-full sm:w-auto justify-center"
          >
            <Terminal className="w-4 h-4 text-[#D90000]" />
            <span>LAUNCH CLI TERMINAL</span>
          </button>
        </div>

        {/* Core Tech Stack Badges Grid */}
        <div className="w-full max-w-4xl glass-panel p-5 sm:p-6 relative">
          <span className="absolute top-2 left-2 text-[#FF8F00]/30 font-mono text-[10px] select-none">+</span>
          <span className="absolute top-2 right-2 text-[#FF8F00]/30 font-mono text-[10px] select-none">+</span>

          <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3 flex items-center justify-center gap-3">
            <BlacksmithForgeIcon className="w-6 h-6" />
            <span>Services I Build</span>
            <BlacksmithForgeIcon className="w-6 h-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {serviceBadges.map((b, i) => (
              <div
                key={i}
                {...getUniversalAudioProps('click', 'hover')}
                className="p-3.5 rounded-xl bg-[#000000]/80 border border-white/10 hover:border-[#FF8F00]/60 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(255,143,0,0.18)] hover:bg-[#FF8F00]/10 transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center gap-2"
              >
                <b.icon className={`w-5 h-5 ${b.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className="font-mono text-[11px] text-gray-200 group-hover:text-white font-semibold leading-snug">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
