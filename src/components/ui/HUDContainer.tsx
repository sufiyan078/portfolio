import React from 'react';

interface HUDContainerProps {
  children: React.ReactNode;
  statusText?: string;
  title?: string;
  className?: string;
}

export const HUDContainer: React.FC<HUDContainerProps> = ({
  children,
  statusText = 'OPERATIONAL // SYSTEM ARCHITECT',
  title = 'CODE.REALM',
  className = ''
}) => {
  return (
    <div className={`relative bg-[#0d1322]/80 border border-[#00f3ff]/20 rounded-2xl p-6 sm:p-8 backdrop-blur-md ${className}`}>
      {/* Top HUD Status Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 font-mono text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ff9d] animate-ping" />
          <span className="text-[#00ff9d] font-bold">{statusText}</span>
          <span className="text-gray-500">|</span>
          <span className="text-white font-orbitron font-bold">{title}</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080b14] border border-[#00f3ff]/40 text-[#00f3ff] text-xs font-mono">
          <span>FULL STACK ENGINEERING MATURITY</span>
        </div>
      </div>

      {children}
    </div>
  );
};
