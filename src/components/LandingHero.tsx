import React from 'react';
import { ArrowRight, Terminal, Globe, Layout, BarChart3, Bot, Workflow, TrendingUp, Layers } from './ui/RealmIcons';
import { getUniversalAudioProps } from '../utils/soundEffects';
import { TypingAnimation } from './ui/TypingAnimation';

interface LandingHeroProps {
  onPressStart: () => void;
  onOpenTerminal: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onPressStart, onOpenTerminal }) => {
  const serviceBadges = [
    { name: "Websites & Landing Pages", icon: Globe, color: "text-[#FF8F00]" },
    { name: "Custom Web Applications", icon: Layout, color: "text-[#FF8F00]" },
    { name: "Dashboards & Data Visualization", icon: BarChart3, color: "text-[#FF8F00]" },
    { name: "AI Agents & Automation", icon: Bot, color: "text-[#FF8F00]" },
    { name: "Business Process Automation", icon: Workflow, color: "text-[#FF8F00]" },
    { name: "Reporting & Analytics Systems", icon: TrendingUp, color: "text-[#FF8F00]" }
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] pt-28 sm:pt-32 md:pt-36 pb-16 flex flex-col justify-start items-center text-center px-4 sm:px-6">
      {/* Background Radial Glow — cool blue to match the sky canvas */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1A2A4A]/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto z-10 flex flex-col items-center w-full">
        
        {/* Main Hero Headline Section */}
        <div className="mb-4 flex flex-col items-center w-full">
          <div className="mb-3">
            <span className="font-bungee text-xl sm:text-3xl md:text-[40px] lg:text-[44px] text-[#FF8F00] tracking-wider uppercase drop-shadow-[0_0_25px_rgba(255,143,0,0.6)] leading-relaxed block py-1">
              <TypingAnimation>WELCOME TO THE CODE REALM</TypingAnimation>
            </span>
          </div>
          <h1 className="font-black-ops text-[28px] sm:text-[44px] md:text-[54px] font-extrabold tracking-normal leading-[1.15] max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#D90000] via-[#FF3B30] to-[#FF4500] drop-shadow-[0_2px_18px_rgba(217,0,0,0.4)] px-2">
            YOU'VE ENTERED SUFIYAN'S WORLD.
          </h1>
        </div>

        {/* Sub-headline / Vision */}
        <h2 className="font-heading text-base sm:text-xl md:text-2xl font-semibold text-gray-200 mb-8 max-w-3xl px-2">
          Business <span className="text-[#FF8F00]">Software.</span> Less busywork. More impact.
        </h2>

        {/* Action Buttons: Clean Symmetrical Two-Button Layout */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 sm:mb-14 w-full max-w-md sm:max-w-none px-4">
          {/* Primary CTA: View Missions */}
          <button
            {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER', onPressStart)}
            className="btn-primary font-black-ops tracking-wider w-full sm:w-auto justify-center cursor-pointer shadow-[0_0_25px_rgba(255,143,0,0.35)] hover:shadow-[0_0_35px_rgba(255,143,0,0.6)]"
          >
            <span>Start Mission</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* CLI Terminal Launcher */}
          <button
            {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER', onOpenTerminal)}
            className="btn-secondary font-black-ops tracking-wider w-full sm:w-auto justify-center cursor-pointer"
            title="Open CLI Terminal (Shortcut: ~)"
          >
            <Terminal className="w-4 h-4 text-[#D90000]" />
            <span>LAUNCH CLI TERMINAL</span>
          </button>
        </div>

        {/* Core Tech Stack Badges Grid: Aligned to max-w-5xl, uniform height & Nova Flat typography */}
        <div className="w-full max-w-5xl glass-panel p-5 sm:p-6 relative">
          <span className="absolute top-2 left-2 text-[#FF8F00]/30 font-mono text-[10px] select-none">+</span>
          <span className="absolute top-2 right-2 text-[#FF8F00]/30 font-mono text-[10px] select-none">+</span>

          <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
            <Layers className="w-4 h-4 text-[#FF8F00] shrink-0" />
            <span>Services I Build</span>
            <Layers className="w-4 h-4 text-[#FF8F00] shrink-0" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {serviceBadges.map((b, i) => (
              <button
                key={i}
                type="button"
                {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER', () => scrollToSection('missions'))}
                className="p-3 sm:p-3.5 rounded-xl bg-[#000000]/80 border border-white/10 hover:border-[#FF8F00]/60 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(255,143,0,0.18)] hover:bg-[#FF8F00]/10 transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center gap-2.5 text-center min-h-[105px]"
              >
                <b.icon className={`w-8 h-8 ${b.color} shrink-0`} />
                <span className="font-nova text-[11px] sm:text-xs text-gray-200 group-hover:text-white font-semibold leading-snug tracking-normal">
                  {b.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
