import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { PLAYER_PROFILE, MISSIONS, INVENTORY_SKILLS, BOSS_BATTLES } from '../data/portfolioData';
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
          <p className="text-[#00f3ff]">SYSTEM OS v3.8.0 [CODE REALM ARCHITECT TERMINAL]</p>
          <p>Welcome, Operator. Type <span className="text-[#00ff9d] font-bold">help</span> to list available commands.</p>
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
          <div className="space-y-1 text-xs font-mono text-gray-300">
            <p className="text-[#00f3ff] font-bold">AVAILABLE COMMANDS:</p>
            <p><span className="text-[#00ff9d] w-28 inline-block">whoami</span> - Print developer bio & stats</p>
            <p><span className="text-[#00ff9d] w-28 inline-block">projects</span> - List active engineering missions</p>
            <p><span className="text-[#00ff9d] w-28 inline-block">skills</span> - List primary technology inventory</p>
            <p><span className="text-[#00ff9d] w-28 inline-block">boss</span> - Show defeated production bugs</p>
            <p><span className="text-[#00ff9d] w-28 inline-block">contact</span> - Show direct contact transmission channels</p>
            <p><span className="text-[#00ff9d] w-28 inline-block">clear</span> - Clear terminal history</p>
            <p><span className="text-[#00ff9d] w-28 inline-block">sudo hire</span> - Initiate priority recruitment transmission</p>
            <p><span className="text-[#00ff9d] w-28 inline-block">exit</span> - Close CLI window</p>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-gray-300">
            <p className="text-[#38BDF8] font-bold">{PLAYER_PROFILE.name} // {PLAYER_PROFILE.role}</p>
            <p>Title: <span className="text-[#F59E0B]">{PLAYER_PROFILE.role}</span></p>
            <p>Status: <span className="text-[#10B981]">{PLAYER_PROFILE.status}</span></p>
            <p className="text-gray-400 mt-2">{PLAYER_PROFILE.bio}</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-[#00f3ff] font-bold">DEPLOYED ENGINEERING MISSIONS:</p>
            {MISSIONS.map(m => (
              <div key={m.id} className="text-gray-300 border-l-2 border-l-[#00f3ff] pl-2">
                <span className="text-[#00ff9d] font-bold">[{m.missionNumber}] {m.title}</span> - {m.tagline}
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-gray-300">
            <p className="text-[#00f3ff] font-bold">TOP EQUIPMENT INVENTORY:</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {INVENTORY_SKILLS.slice(0, 10).map(s => (
                <span key={s.id} className="px-2 py-0.5 rounded bg-[#080b14] border border-white/10 text-gray-200">
                  {s.name} ({s.mastery}%)
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case 'boss':
        outputNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-[#ff2a6d] font-bold">DEFEATED PRODUCTION CRISES:</p>
            {BOSS_BATTLES.map(b => (
              <div key={b.id} className="text-gray-300">
                &gt; <span className="text-[#ffd700]">{b.bossName}</span>: {b.title} (<span className="text-[#00ff9d]">{b.outcome}</span>)
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-gray-300">
            <p className="text-[#00f3ff] font-bold">TRANSMISSION CONTACT MATRIX:</p>
            <p>Email: <span className="text-[#00ff9d]">work.sufiyan.ahmed078@gmail.com</span></p>
            <p>LinkedIn: <span className="text-[#00f3ff]">linkedin.com/in/sufiyan-ahmed-66baa91b3</span></p>
            <p>GitHub: <span className="text-[#00f3ff]">github.com/sufiyan078</span></p>
          </div>
        );
        break;

      case 'sudo hire':
        outputNode = (
          <div className="p-3 rounded bg-[#00ff9d]/10 border border-[#00ff9d] text-xs font-mono text-[#00ff9d]">
            [PRIORITY GRANT ACCEPTED] Target Sufiyan Ahmed flagged for high-impact mission allocation. Scroll down to Transmission Terminal!
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
          <div className="text-xs font-mono text-[#ff2a6d]">
            Command not recognized: &quot;{cmd}&quot;. Type <span className="text-[#00ff9d]">help</span> for valid commands.
          </div>
        );
        break;
    }

    setHistory(prev => [...prev, { command: cmd, output: outputNode }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="cyber-card w-full max-w-3xl h-[550px] flex flex-col border-2 border-[#b026ff]/60 bg-[#080b14]/95 shadow-[0_0_50px_rgba(176,38,255,0.3)]">
        {/* Terminal Window Top Bar */}
        <div className="px-4 py-3 bg-[#0d1322] border-b border-[#b026ff]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff2a6d]" />
            <div className="w-3 h-3 rounded-full bg-[#ffd700]" />
            <div className="w-3 h-3 rounded-full bg-[#00ff9d]" />
            <span className="ml-2 font-mono text-xs text-[#b026ff] font-bold flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              cli@code-realm:~$
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-white/5 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command Log Body */}
        <div className="flex-1 p-4 overflow-y-auto font-mono space-y-4">
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#00f3ff]">
                <Sparkles className="w-3 h-3" />
                <span>user@realm:~$ {item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Prompt Footer */}
        <form onSubmit={handleCommand} className="p-3 bg-[#0d1322] border-t border-[#b026ff]/30 flex items-center gap-2">
          <span className="font-mono text-xs text-[#00ff9d]">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' for command list..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-gray-500"
          />
          <button type="submit" className="text-gray-400 hover:text-[#00ff9d]">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
