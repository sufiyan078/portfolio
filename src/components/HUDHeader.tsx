import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Menu, X, Heart } from 'lucide-react';
import { toggleSound, isSoundEnabled, playCyberSound } from '../utils/soundEffects';
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
    playCyberSound('click');
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
        scrolled ? 'py-2 shadow-2xl bg-[#000000]/95 backdrop-blur-2xl' : 'py-3.5'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left Side: Gamer Avatar & Level Status Telemetry */}
        <a
          href="#profile"
          onClick={() => playCyberSound('click')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          {/* Shield Knight Icon Emblem */}
          <ShieldKnightEmblem className="w-10 h-10 transition-transform group-hover:scale-105" />

          {/* Player Level & Class Stats Telemetry */}
          <div className="flex flex-col">
            <span className="font-pixel text-[11px] font-extrabold text-[#FF8F00] tracking-wide group-hover:text-white transition-colors">
              SUFIYAN AHMED
            </span>

            <div className="flex flex-wrap items-center gap-2 font-pixel text-[8px] text-gray-400 mt-1">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-pixel bg-[#CD1818]/15 border border-[#CD1818]/40 text-[#FF8F00]">
                CLASS: <span className="text-[#CD1818] font-black ml-1">BUILDER</span>
              </span>
              <div className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#08CB00] animate-pulse" />
                <span className="text-[#FF8F00] font-bold">ONLINE</span>
              </div>
              <span className="text-gray-500">|</span>
              <div className="inline-flex items-center gap-1">
                <span className="font-pixel text-[8px] text-gray-400">LEVEL 99</span>
                <span className="inline-flex items-center text-[#FF8F00] text-[7px] font-pixel bg-[#FF8F00]/10 border border-[#FF8F00]/30 px-1 py-0.2 rounded font-bold tracking-wider">
                  MAX
                </span>
              </div>
            </div>

            {/* Health Bar / System Health */}
            <div className="flex items-center gap-1.5 mt-1 font-pixel text-[7px] text-gray-400">
              <span>SYSTEM HEALTH</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="w-2.5 h-2.5 fill-[#D90000] text-[#D90000]" />
                ))}
              </div>
            </div>
          </div>
        </a>

        {/* Desktop HUD Navigation Menu (Crystal Liquid Glass Effect) */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#1F150C]/60 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]" aria-label="Main Navigation">
          {navItems.map((item) => {
            let isActive = activeSection === item.id;
            if (activeSection === 'inventory') {
              const currentTab = activeSubTab || 'abilities';
              isActive = item.id === currentTab;
            }
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => playCyberSound('hover')}
                aria-label={`Navigate to ${item.label}`}
                className={`px-3.5 py-1.5 rounded-full font-pixel text-[9px] font-bold tracking-wider transition-all duration-300 focus:outline-none cursor-pointer ${
                  isActive
                    ? 'bg-[#FF8F00]/20 text-[#FF8F00] border border-[#FF8F00]/80 shadow-[0_0_15px_rgba(255,143,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Audio FX Toggle */}
          <button
            onClick={handleSoundToggle}
            aria-label={soundOn ? 'Mute audio effects' : 'Enable audio effects'}
            title={soundOn ? 'Mute Audio FX' : 'Enable Audio FX'}
            className={`p-1.5 rounded-lg border transition-all focus:outline-none cursor-pointer ${
              soundOn
                ? 'bg-[#FF8F00]/10 border-[#FF8F00]/40 text-[#FF8F00]'
                : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'
            }`}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* CLI Terminal Toggle */}
          <button
            onClick={() => {
              playCyberSound('openModal');
              onOpenTerminal();
            }}
            aria-label="Open CLI Terminal"
            title="Open CLI Terminal (Shortcut: ~)"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#D90000]/20 border border-[#D90000]/50 text-white hover:bg-[#D90000]/35 text-[11px] font-mono font-bold transition-all focus:outline-none cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-[#D90000]" />
            <span className="hidden sm:inline">CLI</span>
          </button>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden p-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5 focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1F150C]/95 border-b border-white/10 backdrop-blur-xl px-4 py-4 mt-2 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left px-4 py-3 rounded-xl font-mono text-xs font-bold tracking-wider text-gray-300 hover:text-[#FF8F00] hover:bg-[#FF8F00]/10 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
