import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Terminal, X, CornerDownLeft } from 'lucide-react';
import { BUILDER_PROFILE, MISSIONS, BOSS_BATTLES, SKILLS } from '../data/portfolioData';
import { getUniversalAudioProps, playCyberSound } from '../utils/soundEffects';

interface InteractiveTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminalModal: React.FC<InteractiveTerminalModalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'system.init',
      output: (
        <div className="text-gray-300 font-mono text-xs sm:text-sm space-y-1">
          <p className="text-[#FF8F00] font-bold tracking-wider">SYSTEM OS v3.8.0 [CODE REALM ARCHITECT TERMINAL]</p>
          <p className="text-gray-200">Welcome, Operator. Type <span className="text-[#FFD700] font-bold underline">help</span> to list available commands.</p>
        </div>
      )
    }
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    playCyberSound('terminal');

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs sm:text-sm font-mono text-gray-300">
            <p className="text-[#FF8F00] font-bold tracking-wider">AVAILABLE COMMANDS:</p>
            <p><span className="text-[#FFD700] font-bold w-32 inline-block">whoami</span> <span className="text-gray-500 font-bold mr-2">-</span> <span className="text-gray-200">Print developer bio & stats</span></p>
            <p><span className="text-[#FFD700] font-bold w-32 inline-block">projects</span> <span className="text-gray-500 font-bold mr-2">-</span> <span className="text-gray-200">List active engineering missions</span></p>
            <p><span className="text-[#FFD700] font-bold w-32 inline-block">skills</span> <span className="text-gray-500 font-bold mr-2">-</span> <span className="text-gray-200">List primary technology inventory</span></p>
            <p><span className="text-[#FFD700] font-bold w-32 inline-block">boss</span> <span className="text-gray-500 font-bold mr-2">-</span> <span className="text-gray-200">Show defeated production bugs</span></p>
            <p><span className="text-[#FFD700] font-bold w-32 inline-block">contact</span> <span className="text-gray-500 font-bold mr-2">-</span> <span className="text-gray-200">Show direct contact transmission channels</span></p>
            <p><span className="text-[#FFD700] font-bold w-32 inline-block">clear</span> <span className="text-gray-500 font-bold mr-2">-</span> <span className="text-gray-200">Clear terminal history</span></p>
            <p><span className="text-[#FFD700] font-bold w-32 inline-block">sudo hire</span> <span className="text-gray-500 font-bold mr-2">-</span> <span className="text-gray-200">Initiate priority recruitment transmission</span></p>
            <p><span className="text-[#FFD700] font-bold w-32 inline-block">exit</span> <span className="text-gray-500 font-bold mr-2">-</span> <span className="text-gray-200">Close CLI window</span></p>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="space-y-1 text-xs sm:text-sm font-mono text-gray-300">
            <p className="text-[#FFD700] font-bold">{BUILDER_PROFILE.name} // {BUILDER_PROFILE.playerClass}</p>
            <p>Roles: <span className="text-[#FF8F00] font-semibold">{BUILDER_PROFILE.roles.join(', ')}</span></p>
            <p>Status: <span className="text-[#22C55E] font-semibold">{BUILDER_PROFILE.status} ({BUILDER_PROFILE.level})</span></p>
            <p>Location: <span className="text-gray-400">{BUILDER_PROFILE.location}</span></p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2.5 text-xs sm:text-sm font-mono">
            <p className="text-[#FF8F00] font-bold tracking-wider">DEPLOYED ENGINEERING MISSIONS:</p>
            {MISSIONS.map(m => (
              <div key={m.id} className="text-gray-200 border-l-2 border-[#FF8F00] pl-3 py-1.5 bg-[#FF8F00]/10 rounded-r-lg">
                <span className="text-[#FFD700] font-bold">[{m.missionNumber}] {m.title}</span> <span className="text-gray-400">—</span> <span className="text-gray-300">{m.tagline}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-gray-300">
            <p className="text-[#FF8F00] font-bold tracking-wider">TOP EQUIPMENT INVENTORY:</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {SKILLS.slice(0, 10).map(s => (
                <span key={s.id} className="px-2.5 py-1 rounded bg-[#1A1009] border border-[#FF8F00]/40 text-gray-200">
                  {s.name} <span className="text-[#FF8F00] font-semibold">({s.percentage}%)</span>
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case 'boss':
        outputNode = (
          <div className="space-y-2 text-xs sm:text-sm font-mono">
            <p className="text-[#D90000] font-bold tracking-wider">DEFEATED PRODUCTION CRISES:</p>
            {BOSS_BATTLES.map(b => (
              <div key={b.id} className="text-gray-300">
                <span className="text-gray-500 mr-1.5">&gt;</span><span className="text-[#FFD700] font-bold">{b.bossName}</span>: <span className="text-gray-200">{b.title}</span> (<span className="text-[#22C55E] font-semibold">{b.outcome}</span>)
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1.5 text-xs sm:text-sm font-mono text-gray-300">
            <p className="text-[#FF8F00] font-bold tracking-wider">TRANSMISSION CONTACT CHANNELS:</p>
            <p>Email: <span className="text-[#38BDF8] font-bold">work.sufiyan.ahmed078@gmail.com</span></p>
            <p>LinkedIn: <span className="text-[#38BDF8]">linkedin.com/in/sufiyan-ahmed-66baa91b3</span></p>
            <p>GitHub: <span className="text-[#38BDF8]">github.com/sufiyan078</span></p>
          </div>
        );
        break;

      case 'sudo hire':
        outputNode = (
          <div className="p-3 rounded-lg bg-[#FF8F00]/15 border border-[#FF8F00] text-xs sm:text-sm font-mono text-[#FF8F00] font-bold">
            [PRIORITY TRANSMISSION ACCEPTED] Target Sufiyan Ahmed flagged for high-impact mission allocation!
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        setInputVal('');
        return;

      default:
        outputNode = (
          <div className="text-xs sm:text-sm font-mono text-[#D90000]">
            Command not recognized: &quot;{cmd}&quot;. Type <span className="text-[#FFD700] font-bold underline">help</span> for valid commands.
          </div>
        );
        break;
    }

    setHistory(prev => [...prev, { command: cmd, output: outputNode }]);
    setInputVal('');
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-7xl h-[88vh] max-h-[88vh] flex flex-col rounded-2xl border border-[#FF8F00]/50 bg-[#090503] shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_30px_rgba(255,143,0,0.25)] overflow-hidden relative">
        
        {/* Header Controls */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0D0A08] border-b border-[#FF8F00]/30 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            <span className="ml-2 font-mono text-xs font-bold text-[#FF8F00] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#FF8F00]" />
              cli@code-realm:~$
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[9px] font-mono bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] font-bold">
              ONLINE
            </span>
            <button
              {...getUniversalAudioProps('closeModal', 'hover', onClose)}
              aria-label="Close terminal window"
              className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Console Output Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 font-mono text-xs sm:text-sm custom-scrollbar">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-[#22C55E] font-bold">&gt; user@realm:~$</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Prompt Footer */}
        <form onSubmit={handleCommand} className="p-3 bg-[#0D0A08] border-t border-[#FF8F00]/30 flex items-center gap-2">
          <span className="text-[#FF8F00] font-bold pl-2 select-none">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' for command list..."
            className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm outline-none placeholder:text-gray-600"
          />
          <button
            type="submit"
            {...getUniversalAudioProps('terminal', 'hover')}
            className="p-1.5 rounded-lg bg-[#FF8F00]/20 border border-[#FF8F00]/40 text-[#FF8F00] hover:bg-[#FF8F00]/30 transition-colors cursor-pointer shrink-0"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};
