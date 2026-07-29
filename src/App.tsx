import { useState, useEffect } from 'react';
import { HUDHeader } from './components/HUDHeader';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { LandingHero } from './components/LandingHero';
import { PlayerProfileSection } from './components/PlayerProfileSection';
import { MissionControlSection } from './components/MissionControlSection';
import { BossBattlesSection } from './components/BossBattlesSection';
import { InventorySkillsSection } from './components/InventorySkillsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { QuestLogSection } from './components/QuestLogSection';
import { ContactSection } from './components/ContactSection';
import { InteractiveTerminalModal } from './components/InteractiveTerminalModal';
import { PROFILE } from './data/profile';
import { Sparkles, Terminal, ArrowUp } from 'lucide-react';
import { playCyberSound } from './utils/soundEffects';

export function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [inventoryTab, setInventoryTab] = useState<'abilities' | 'inventory'>('abilities');

  // CLI ~ key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        playCyberSound('openModal');
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['profile', 'missions', 'inventory', 'boss-battles', 'achievements', 'quest-log', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070B14] text-white selection:bg-[#443199] selection:text-white font-sans">
      {/* Subtle CRT scanline overlay effect */}
      <div className="scanlines" />

      {/* Interactive Background Canvas */}
      <BackgroundCanvas />

      {/* Main HUD Header Bar */}
      <HUDHeader
        onOpenTerminal={() => setIsTerminalOpen(true)}
        activeSection={activeSection}
        activeSubTab={inventoryTab}
        onSelectNavTab={(tab) => setInventoryTab(tab)}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* Landing Hero HUD Screen */}
        <LandingHero
          onPressStart={() => scrollToSection('profile')}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* 01 Player Profile */}
        <PlayerProfileSection />

        {/* 02 Missions */}
        <MissionControlSection />

        {/* 03 Abilities & 04 Collectible Inventory */}
        <InventorySkillsSection
          activeTab={inventoryTab}
          onTabChange={setInventoryTab}
        />

        {/* 05 Engineering Boss Battles */}
        <BossBattlesSection />

        {/* 06 Achievements */}
        <AchievementsSection />

        {/* 07 Quest Log Timeline */}
        <QuestLogSection />

        {/* 08 Contact */}
        <ContactSection />
      </main>

      {/* Interactive CLI Terminal Modal */}
      <InteractiveTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#070B14]/90 backdrop-blur-md py-8 px-4 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#443199]" />
            <span>THE CODE REALM | {PROFILE.name} &copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#10B981] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              STATUS: ONLINE
            </span>
            <span>|</span>
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="text-[#10375C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>LAUNCH CLI (~)</span>
            </button>
            <span>|</span>
            <button
              onClick={() => {
                playCyberSound('click');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#38BDF8] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
