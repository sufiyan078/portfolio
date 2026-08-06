import React from 'react';

export interface ArchitectureStage {
  stage: string;
  role: string;
}

interface ArchitectureDiagramProps {
  stages: ArchitectureStage[];
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ stages }) => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-start gap-2.5 sm:gap-3 my-4">
      {stages.map((item, i) => (
        <React.Fragment key={i}>
          <div className="p-3 rounded-xl bg-[#000000] border border-[#FF8F00]/40 flex flex-col gap-1 text-left min-w-[130px] max-w-full">
            <span className="font-mono text-xs text-[#FF8F00] font-bold">{item.stage}</span>
            <span className="font-mono text-[10px] text-gray-300 leading-tight">{item.role}</span>
          </div>
          {i < stages.length - 1 && (
            <div className="text-[#FF8F00] font-mono font-bold text-sm shrink-0 flex items-center justify-center">
              <span className="hidden md:inline">→</span>
              <span className="inline md:hidden">↓</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
