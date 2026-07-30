import React, { useState } from 'react';
import { Link, Check } from 'lucide-react';
import { playCyberSound } from '../../utils/soundEffects';

export interface SocialChannelItem {
  icon: React.FC<{ className?: string }>;
  label: string;
  url?: string;
  action?: () => void;
  color?: string;
}

interface SocialButtonProps {
  label?: string;
  items?: SocialChannelItem[];
  className?: string;
}

// Custom crisp vector icons for social platforms
const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const GitHubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export const DEFAULT_NETWORK_ITEMS: SocialChannelItem[] = [
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    url: "https://linkedin.com/in/sufiyan-ahmed-66baa91b3",
    color: "text-[#0A66C2] hover:bg-[#0A66C2]/20"
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    url: "https://github.com/sufiyan078",
    color: "text-[#10B981] hover:bg-[#10B981]/20"
  }
];

export const SocialButton: React.FC<SocialButtonProps> = ({
  label = "CONNECTS",
  items = DEFAULT_NETWORK_ITEMS,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleChannelClick = (index: number, item: SocialChannelItem) => {
    playCyberSound('click');
    if (item.action) {
      item.action();
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => {
        playCyberSound('hover');
        setIsVisible(true);
      }}
      onMouseLeave={() => setIsVisible(false)}
    >
      {/* Main Trigger Button State */}
      <div className={`w-full transition-opacity duration-200 ${isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button
          type="button"
          className="w-full h-11 px-4 rounded-xl bg-[#070B14] border border-[#FF8F00]/40 hover:border-[#FF8F00] text-[#FF8F00] font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_15px_rgba(255,143,0,0.15)] transition-all cursor-pointer group"
        >
          <Link className="h-4 w-4 text-[#FF8F00] group-hover:rotate-45 transition-transform" />
          <span>{label}</span>
        </button>
      </div>

      {/* Expanded Animated Social Channel Bar */}
      <div
        className={`absolute top-0 left-0 flex h-11 overflow-hidden rounded-xl bg-[#070B14] border border-[#FF8F00] shadow-[0_0_25px_rgba(255,143,0,0.3)] z-20 transition-all duration-300 ease-out ${
          isVisible ? 'w-full opacity-100 pointer-events-auto' : 'w-0 opacity-0 pointer-events-none'
        }`}
      >
        {items.map((item, i) => {
          const IconComp = copiedIndex === i ? Check : item.icon;
          return (
            <button
              key={`social-${item.label}`}
              type="button"
              aria-label={item.label}
              onClick={() => handleChannelClick(i, item)}
              style={{
                transitionDelay: isVisible ? `${i * 40}ms` : '0ms'
              }}
              className={`flex-1 h-full flex items-center justify-center border-r border-white/10 last:border-r-0 transition-all duration-300 cursor-pointer relative group ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              } ${item.color || 'text-white'}`}
              title={item.label}
            >
              <div className="flex items-center gap-2 font-mono text-xs font-bold px-3">
                <IconComp className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                <span className="text-xs font-bold font-mono tracking-wide">{copiedIndex === i ? 'COPIED' : item.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
