import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { BUILDER_PROFILE, MISSIONS, BOSS_BATTLES, SKILLS } from '../data/portfolioData';
import { playCyberSound } from '../utils/soundEffects';

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
        <div className="text-gray-300 font-mono text-xs space-y-1">
          <p className="text-[#FF8F00] font-bold">SYSTEM OS v3.8.0 [CODE REALM ARCHITECT TERMINAL]</p>
          <p>Welcome, Operator. Type <span className="text-[#FF8F00] font-bold underline">help</span> to list available commands.</p>
        </div>
      )
    }
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
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
          <div className="space-y-1.5 text-xs font-mono text-gray-300">
            <p className="text-[#FF8F00] font-bold">AVAILABLE COMMANDS:</p>
            <p><span className="text-[#FFA726] font-bold w-28 inline-block">whoami</span> - Print developer bio & stats</p>
            <p><span className="text-[#FFA726] font-bold w-28 inline-block">projects</span> - List active engineering missions</p>
            <p><span className="text-[#FFA726] font-bold w-28 inline-block">skills</span> - List primary technology inventory</p>
            <p><span className="text-[#FFA726] font-bold w-28 inline-block">boss</span> - Show defeated production bugs</p>
            <p><span className="text-[#FFA726] font-bold w-28 inline-block">contact</span> - Show direct contact transmission channels</p>
            <p><span className="text-[#FFA726] font-bold w-28 inline-block">clear</span> - Clear terminal history</p>
            <p><span className="text-[#FFA726] font-bold w-28 inline-block">sudo hire</span> - Initiate priority recruitment transmission</p>
            <p><span className="text-[#FFA726] font-bold w-28 inline-block">exit</span> - Close CLI window</p>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-gray-300">
            <p className="text-[#FF8F00] font-bold">{BUILDER_PROFILE.name} // {BUILDER_PROFILE.playerClass}</p>
            <p>Roles: <span className="text-[#FFA726]">{BUILDER_PROFILE.roles.join(', ')}</span></p>
            <p>Status: <span className="text-[#FF8F00]">{BUILDER_PROFILE.status} ({BUILDER_PROFILE.level})</span></p>
            <p>Location: <span className="text-gray-400">{BUILDER_PROFILE.location}</span></p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-[#FF8F00] font-bold">DEPLOYED ENGINEERING MISSIONS:</p>
            {MISSIONS.map(m => (
              <div key={m.id} className="text-gray-300 border-l-2 border-l-[#FF8F00] pl-2">
                <span className="text-[#FFA726] font-bold">[{m.missionNumber}] {m.title}</span> - {m.tagline}
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono text-gray-300">
            <p className="text-[#FF8F00] font-bold">TOP EQUIPMENT INVENTORY:</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {SKILLS.slice(0, 10).map(s => (
                <span key={s.id} className="px-2 py-0.5 rounded bg-[#1A1009] border border-[#FF8F00]/30 text-gray-200">
                  {s.name} ({s.percentage}%)
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case 'boss':
        outputNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-[#D90000] font-bold">DEFEATED PRODUCTION CRISES:</p>
            {BOSS_BATTLES.map(b => (
              <div key={b.id} className="text-gray-300">
                &gt; <span className="text-[#FF8F00] font-bold">{b.bossName}</span>: {b.title} (<span className="text-emerald-400">{b.outcome}</span>)
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-gray-300">
            <p className="text-[#FF8F00] font-bold">TRANSMISSION CONTACT CHANNELS:</p>
            <p>Email: <span className="text-[#FFA726] font-bold">work.sufiyan.ahmed078@gmail.com</span></p>
            <p>LinkedIn: <span className="text-[#FFA726]">linkedin.com/in/sufiyan-ahmed-66baa91b3</span></p>
            <p>GitHub: <span className="text-[#FFA726]">github.com/sufiyan078</span></p>
          </div>
        );
        break;

      case 'sudo hire':
        outputNode = (
          <div className="p-3 rounded bg-[#FF8F00]/15 border border-[#FF8F00] text-xs font-mono text-[#FF8F00] font-bold">
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
          <div className="text-xs font-mono text-[#D90000]">
            Command not recognized: &quot;{cmd}&quot;. Type <span className="text-[#FF8F00] font-bold underline">help</span> for valid commands.
          </div>
        );
        break;
    }

    setHistory(prev => [...prev, { command: cmd, output: outputNode }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-3xl h-[550px] flex flex-col border-2 border-[#FF8F00]/50 bg-[#080503]/95 shadow-[0_0_50px_rgba(255,143,0,0.3)]">
        {/* Terminal Window Top Bar */}
        <div className="px-4 py-3 bg-[#140D07] border-b border-[#FF8F00]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF4500]" />
            <div className="w-3 h-3 rounded-full bg-[#FF8F00]" />
            <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
            <span className="ml-2 font-mono text-xs text-[#FF8F00] font-bold flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-[#FF8F00]" />
              cli@code-realm:~$
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command Log Body */}
        <div className="flex-1 p-4 overflow-y-auto font-mono space-y-4">
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#FF8F00]">
                <Sparkles className="w-3.5 h-3.5 text-[#FF8F00]" />
                <span className="font-bold">user@realm:~$ {item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Prompt Footer */}
        <form onSubmit={handleCommand} className="p-3 bg-[#140D07] border-t border-[#FF8F00]/30 flex items-center gap-2">
          <span className="font-mono text-xs text-[#FF8F00] font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' for command list..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-gray-500"
          />
          <button type="submit" className="text-gray-400 hover:text-[#FF8F00] transition-colors cursor-pointer">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
