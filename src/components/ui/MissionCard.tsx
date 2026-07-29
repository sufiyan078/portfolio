import React from 'react';
import { GlassPanel } from './GlassPanel';
import { AchievementBadge } from './AchievementBadge';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { Project } from '../../data/projects';

interface MissionCardProps {
  mission: Project;
  onOpenSpec: (mission: Project) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, onOpenSpec }) => {
  return (
    <GlassPanel borderGlowColor="cyan" className="flex flex-col justify-between h-full">
      <div>
        {/* Header Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-[#00f3ff] font-bold tracking-widest">{mission.missionNumber}</span>
          <div className="flex gap-2">
            <AchievementBadge rarity="Expert" label={mission.difficulty} />
            <AchievementBadge rarity="Core" label={mission.status} />
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-orbitron font-extrabold text-xl text-white mb-2">{mission.title}</h3>
        <p className="font-mono text-xs sm:text-sm text-[#00ff9d] mb-4">{mission.tagline}</p>
        
        {/* Description Overview */}
        <p className="text-sm text-gray-300 font-sans mb-6 leading-relaxed line-clamp-3">
          {mission.description}
        </p>

        {/* Tech Stack Loadout */}
        <div className="mb-6">
          <div className="text-[11px] font-mono text-gray-400 uppercase mb-2">Technology Stack:</div>
          <div className="flex flex-wrap gap-1.5">
            {mission.technologyLoadout.slice(0, 5).map((tech: string, i: number) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-[#080b14] border border-white/10 text-xs font-mono text-gray-200">
                {tech}
              </span>
            ))}
            {mission.technologyLoadout.length > 5 && (
              <span className="px-2.5 py-1 rounded-md bg-[#080b14] border border-white/10 text-xs font-mono text-[#00f3ff]">
                +{mission.technologyLoadout.length - 5} MORE
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Progressive Disclosure CTA */}
      <div className="pt-5 border-t border-white/10 flex items-center justify-between">
        <button
          onClick={() => onOpenSpec(mission)}
          className="text-xs sm:text-sm font-orbitron text-[#00f3ff] hover:text-white flex items-center gap-1.5 font-bold group focus:outline-none focus:ring-2 focus:ring-[#00f3ff] rounded-md px-1"
        >
          <span>VIEW TECHNICAL SPEC</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {mission.liveUrl && (
          <a
            href={mission.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-[#00ff9d] hover:text-white transition-colors"
            title="Live Demo"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </GlassPanel>
  );
};
