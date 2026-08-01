import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import { playCyberSound } from '../utils/soundEffects';
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
    <section className="relative min-h-[calc(100vh-80px)] pt-24 sm:pt-28 pb-16 flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF8F00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto z-10 flex flex-col items-center">
        
        {/* Main Hero Headline Section */}
        <div className="mb-4 flex flex-col items-center">
          <div className="mb-4">
            <span className="font-bungee text-2xl sm:text-4xl md:text-[38px] text-[#FF8F00] tracking-wider uppercase drop-shadow-[0_0_20px_rgba(255,143,0,0.5)] leading-tight block">
              <TypingAnimation>WELCOME TO THE CODE REALM</TypingAnimation>
            </span>
          </div>
          <h1 className="font-black-ops text-[31px] sm:text-[55px] md:text-[67px] font-extrabold tracking-tight leading-tight max-w-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#7F2020] via-[#C3110C] to-[#8E1616]">
            YOU'VE ENTERED SUFIYAN'S WORLD.
          </h1>
        </div>

        {/* Sub-headline / Vision */}
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-gray-200 mb-8 max-w-3xl">
          Building Business <span className="text-[#FF8F00]">Software</span> That Saves Time & Makes Money.
        </h2>



        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-14">
          <button
            onClick={() => {
              playCyberSound('click');
              onPressStart();
            }}
            onMouseEnter={() => playCyberSound('hover')}
            className="btn-primary font-black-ops tracking-wider"
          >
            <span>Start Mission</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              playCyberSound('openModal');
              onOpenTerminal();
            }}
            onMouseEnter={() => playCyberSound('hover')}
            className="btn-secondary font-black-ops tracking-wider"
          >
            <Terminal className="w-4 h-4 text-[#D90000]" />
            <span>LAUNCH CLI TERMINAL</span>
          </button>
        </div>

        {/* Core Tech Stack Badges Grid */}
        <div className="w-full max-w-4xl glass-panel p-6 relative">
          <span className="absolute top-2 left-2 text-[#FF8F00]/30 font-mono text-[10px] select-none">+</span>
          <span className="absolute top-2 right-2 text-[#FF8F00]/30 font-mono text-[10px] select-none">+</span>

          <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-center gap-3">
            <BlacksmithForgeIcon className="w-7 h-7" />
            <span>Services I Build</span>
            <BlacksmithForgeIcon className="w-7 h-7" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {serviceBadges.map((b, i) => (
              <div
                key={i}
                onMouseEnter={() => playCyberSound('hover')}
                onClick={() => playCyberSound('click')}
                className="p-4 rounded-xl bg-[#000000]/80 border border-white/10 hover:border-[#FF8F00]/60 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_10px_25px_rgba(255,143,0,0.18)] hover:bg-[#FF8F00]/10 transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center gap-2"
              >
                <b.icon className={`w-6 h-6 ${b.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className="font-mono text-xs text-gray-200 group-hover:text-white font-semibold leading-snug">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
