import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Menu, X, Heart } from './ui/RealmIcons';
import { toggleSound, isSoundEnabled, getUniversalAudioProps } from '../utils/soundEffects';
import { ShieldKnightEmblem } from './ui/ShieldKnightEmblem';

interface HUDHeaderProps {
  onOpenTerminal: () => void;
  activeSection: string;
  activeSubTab?: 'abilities' | 'inventory';
  onSelectNavTab?: (tab: 'abilities' | 'inventory') => void;
}

export const HUDHeader: React.FC<HUDHeaderProps> = ({ onOpenTerminal, activeSection, activeSubTab = 'abilities', onSelectNavTab }) => {
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const navItems = [
    { id: 'profile', label: 'PROFILE' },
    { id: 'missions', label: 'MISSIONS' },
    { id: 'abilities', label: 'ABILITIES' },
    { id: 'inventory', label: 'INVENTORY' },
    { id: 'boss-battles', label: 'BOSS BATTLES' },
    { id: 'achievements', label: 'ACHIEVEMENTS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);

    if (id === 'abilities') {
      if (onSelectNavTab) onSelectNavTab('abilities');
      const element = document.getElementById('inventory');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (id === 'inventory') {
      if (onSelectNavTab) onSelectNavTab('inventory');
      const element = document.getElementById('inventory');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hud-bar ${
        scrolled ? 'py-1.5 shadow-2xl bg-[#000000]/95 backdrop-blur-2xl' : 'py-2 sm:py-2.5'
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Side: Gamer Avatar & Level Status Telemetry */}
        <a
          href="#profile"
          {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER', (e) => {
            e.preventDefault();
            scrollToSection('profile');
          })}
          className="flex items-center gap-2 sm:gap-2.5 group text-left cursor-pointer focus:outline-none min-w-0"
        >
          {/* Shield Knight Icon Emblem */}
          <ShieldKnightEmblem className="w-8 h-8 sm:w-9 sm:h-9 transition-transform group-hover:scale-105 shrink-0" />

          {/* Player Level & Class Stats Telemetry */}
          <div className="flex flex-col min-w-0">
            <span className="font-heading text-[10px] sm:text-sm truncate font-bold text-white tracking-wide group-hover:text-[#FF8F00] transition-colors">
              SUFIYAN AHMED
            </span>

            <div className="flex items-center gap-1.5 font-mono text-[8.5px] sm:text-[9.5px] text-gray-300 mt-0.5 flex-wrap">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8.5px] sm:text-[9.5px] bg-[#CD1818]/20 border border-[#CD1818]/50 text-[#FF8F00] font-bold whitespace-nowrap">
                CLASS: <span className="text-[#FF4500]">BUILDER</span>
              </span>
              <div className="hidden sm:inline-flex items-center gap-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#08CB00] animate-pulse" />
                <span className="text-[#FF8F00] font-bold">ONLINE</span>
              </div>
              <span className="text-gray-500 hidden xl:inline">|</span>
              <span className="text-gray-300 font-bold hidden xl:inline whitespace-nowrap">LVL 99</span>
            </div>

            {/* Health Bar / System Health */}
            <div className="hidden 2xl:flex items-center gap-1.5 mt-0.5 font-mono text-[8.5px] text-gray-400">
              <span className="tracking-tight">SYS HEALTH</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="w-2.5 h-2.5 fill-[#D90000] text-[#D90000]" />
                ))}
              </div>
            </div>
          </div>
        </a>

        {/* Desktop HUD Navigation Menu */}
        <nav className="hidden 2xl:flex items-center gap-0.5 bg-[#1F150C]/70 backdrop-blur-xl px-1.5 py-1 rounded-full border border-white/15 shrink-0" aria-label="Main Navigation">
          {navItems.map((item) => {
            let isActive = activeSection === item.id;
            if (activeSection === 'inventory') {
              const currentTab = activeSubTab || 'abilities';
              isActive = item.id === currentTab;
            }
            return (
              <button
                key={item.id}
                {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER', () => scrollToSection(item.id))}
                aria-label={`Navigate to ${item.label}`}
                className={`px-2 xl:px-2.5 py-1 rounded-full font-mono text-[8.5px] xl:text-[9.5px] font-semibold tracking-wider transition-all duration-200 focus:outline-none cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FF8F00]/20 text-[#FF8F00] border border-[#FF8F00]/60 shadow-[0_0_12px_rgba(255,143,0,0.25)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Audio FX Toggle */}
          <button
            {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER', handleSoundToggle)}
            aria-label={soundOn ? 'Mute audio effects' : 'Enable audio effects'}
            title={soundOn ? 'Mute Audio FX' : 'Enable Audio FX'}
            className={`px-2.5 py-1.5 rounded-lg border transition-all focus:outline-none cursor-pointer flex items-center gap-1.5 ${
              soundOn
                ? 'bg-[#FF8F00]/15 border-[#FF8F00]/50 text-[#FF8F00] shadow-[0_0_10px_rgba(255,143,0,0.25)]'
                : 'bg-white/5 border-white/15 text-gray-400 hover:text-white hover:border-white/30'
            }`}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="font-mono text-[9px] font-bold hidden sm:inline whitespace-nowrap">
              {soundOn ? 'AUDIO ON' : 'AUDIO OFF'}
            </span>
          </button>

          {/* CLI Terminal Toggle */}
          <button
            {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER', onOpenTerminal)}
            aria-label="Open CLI Terminal"
            title="Open CLI Terminal (Shortcut: ~)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D90000]/20 border border-[#D90000]/50 text-white hover:bg-[#D90000]/35 text-xs font-mono font-bold transition-all focus:outline-none cursor-pointer shadow-[0_0_12px_rgba(217,0,0,0.25)] whitespace-nowrap"
          >
            <Terminal className="w-3.5 h-3.5 text-[#D90000]" />
            <span className="hidden sm:inline">CLI</span>
          </button>

          {/* Mobile Drawer Button */}
          <button
            {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER', () => setMobileMenuOpen(!mobileMenuOpen))}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="2xl:hidden p-2 rounded-xl border border-white/10 text-white hover:bg-white/5 focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="2xl:hidden max-h-[75dvh] overflow-y-auto bg-[#0D0704]/98 border-b border-[#FF8F00]/30 backdrop-blur-2xl px-4 py-5 mt-2 shadow-2xl animate-fadeIn" onKeyDown={e => { if (e.key === 'Escape') { setMobileMenuOpen(false); document.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]')?.focus(); } }}>
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              let isActive = activeSection === item.id;
              if (activeSection === 'inventory') {
                const currentTab = activeSubTab || 'abilities';
                isActive = item.id === currentTab;
              }
              return (
                <button
                  key={item.id}
                  {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER', () => scrollToSection(item.id))}
                  className={`text-left px-4 py-3 rounded-xl font-mono text-xs font-bold tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#FF8F00]/20 text-[#FF8F00] border border-[#FF8F00]/50'
                      : 'text-gray-300 hover:text-[#FF8F00] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
