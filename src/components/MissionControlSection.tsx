import React, { useState } from 'react';
import { PROJECTS, type Project } from '../data/projects';
import { Target, CheckCircle2, ChevronRight, Layers, FileCode2, ExternalLink, X } from 'lucide-react';
import { getUniversalAudioProps } from '../utils/soundEffects';

export const MissionControlSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="missions" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag border border-[#FF8F00]/40 bg-[#FF8F00]/10 text-[#FF8F00] mb-3">
          <div className="relative inline-flex items-center justify-center">
            <style>{`
              @keyframes target-lock-pulse {
                0%, 100% {
                  transform: scale(1);
                  filter: drop-shadow(0 0 2px rgba(255, 143, 0, 0.4));
                }
                50% {
                  transform: scale(1.22);
                  filter: drop-shadow(0 0 10px rgba(255, 143, 0, 0.95)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.9));
                }
              }
              .anim-target-lock {
                animation: target-lock-pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                transform-origin: center center;
              }
            `}</style>
            <Target className="w-3.5 h-3.5 text-[#FF8F00] anim-target-lock" />
          </div>
          <span className="text-[#FF8F00] font-bold">MISSIONS</span>
        </div>
        <h2 className="font-heading font-extrabold text-[32px] sm:text-[38px] text-white tracking-tight">
          FEATURED <span className="text-[#FF8F00]">PROJECT MISSIONS</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          &gt; In-depth software engineering missions detailing business briefs, architecture, and outcomes.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            {...getUniversalAudioProps('openModal', 'hover', () => setSelectedProject(project))}
            className="p-6 sm:p-8 flex flex-col justify-between group rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-[#FF8F00]/70 hover:shadow-[0_12px_28px_rgba(255,143,0,0.2)] relative overflow-hidden cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(30,18,8,0.7) 0%, rgba(30,18,8,0.5) 50%, rgba(30,18,8,0.7) 100%), url('/wood-texture.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '2px solid rgba(139,90,43,0.6)',
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            {/* Pure SVG Grass & Hanging Vines Overlay */}
            <svg className="absolute top-0 left-0 w-full h-14 z-10 pointer-events-none" viewBox="0 0 400 50" preserveAspectRatio="none" fill="none">
              {/* Grass blades base row across top */}
              <path d="M0 0 L15 12 L22 0 L35 15 L45 0 L60 10 L70 0 L85 14 L95 0 L110 12 L120 0 L135 15 L150 0 L165 10 L178 0 L190 14 L205 0 L220 12 L232 0 L248 15 L260 0 L275 11 L288 0 L302 14 L315 0 L330 12 L342 0 L358 15 L370 0 L385 11 L400 0 Z" fill="#2d6a1e" opacity="0.85" />
              <path d="M0 0 L10 8 L18 0 L28 10 L38 0 L50 7 L62 0 L75 10 L88 0 L100 8 L112 0 L125 10 L138 0 L152 7 L168 0 L180 10 L195 0 L210 8 L225 0 L238 10 L252 0 L268 7 L280 0 L295 10 L310 0 L322 8 L335 0 L350 10 L365 0 L378 7 L390 0 L400 6 Z" fill="#4a8a35" opacity="0.9" />

              {/* Hanging Vine 1 (Left) */}
              <path d="M45 0 C45 10, 40 15, 43 25 C46 35, 38 38, 41 46" stroke="#2a5518" strokeWidth="2" fill="none" opacity="0.9" />
              <path d="M43 15 C35 15 32 10 38 8 Z" fill="#3a7a28" opacity="0.95" />
              <path d="M44 26 C52 26 55 21 49 19 Z" fill="#4a8a35" opacity="0.95" />
              <path d="M41 38 C33 38 30 33 36 31 Z" fill="#2d6a1e" opacity="0.9" />

              {/* Hanging Vine 2 (Center-Left) */}
              <path d="M150 0 C150 12, 155 18, 152 30" stroke="#2a5518" strokeWidth="1.8" fill="none" opacity="0.85" />
              <path d="M151 16 C158 16 161 11 155 9 Z" fill="#4a8a35" opacity="0.9" />
              <path d="M152 28 C144 28 141 23 147 21 Z" fill="#3a7a28" opacity="0.9" />

              {/* Hanging Vine 3 (Center-Right) */}
              <path d="M260 0 C260 10, 255 16, 258 28 C261 38, 254 42, 257 48" stroke="#2a5518" strokeWidth="2" fill="none" opacity="0.9" />
              <path d="M259 14 C251 14 248 9 254 7 Z" fill="#2d6a1e" opacity="0.95" />
              <path d="M259 26 C267 26 270 21 264 19 Z" fill="#4a8a35" opacity="0.95" />
              <path d="M257 40 C249 40 246 35 252 33 Z" fill="#3a7a28" opacity="0.9" />

              {/* Hanging Vine 4 (Right) */}
              <path d="M350 0 C350 12, 355 16, 352 28" stroke="#2a5518" strokeWidth="1.8" fill="none" opacity="0.85" />
              <path d="M351 16 C343 16 340 11 346 9 Z" fill="#3a7a28" opacity="0.9" />
              <path d="M352 26 C360 26 363 21 357 19 Z" fill="#4a8a35" opacity="0.9" />
            </svg>
            <div className="relative z-20">
              {/* Mission Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="font-pixel text-[11px] font-bold text-[#FF8F00] tracking-widest">
                  {project.missionNumber}
                </span>
                <span className="badge-tag badge-success text-[11px]">
                  {project.status}
                </span>
              </div>

              {/* Mission Title */}
              <h3 className="font-black-ops font-bold text-xl sm:text-2xl text-white group-hover:text-[#FF8F00] transition-colors mb-3 tracking-wide leading-snug">
                {project.title}
              </h3>

              {/* Tagline */}
              <p className="text-sm text-gray-300 mb-6 font-sans leading-relaxed">
                {project.tagline}
              </p>

              {/* Technology Loadout Tags */}
              <div className="mb-6">
                <span className="font-mono text-[11px] text-gray-400 block mb-2 uppercase tracking-wider">TECHNOLOGY LOADOUT</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologyLoadout.map((tech, i) => (
                    <span key={i} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-[#000000] border border-white/10 text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* View Mission Details Action Button */}
            <button
              {...getUniversalAudioProps('openModal', 'hover', (e) => {
                e.stopPropagation();
                setSelectedProject(project);
              })}
              className="relative z-20 w-full mt-4 py-3 rounded-xl bg-[#000000] border border-white/10 hover:border-[#FF8F00]/50 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 group-hover:bg-[#FF8F00]/15 transition-all cursor-pointer"
            >
              <span>INSPECT MISSION DETAILS</span>
              <ChevronRight className="w-4 h-4 text-[#FF8F00] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Mission Inspection Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-start justify-center p-4 sm:p-6 pt-36 sm:pt-40 pb-10 overflow-y-auto font-sans">
          <div className="glass-panel w-full max-w-4xl max-h-[calc(100vh-180px)] overflow-y-auto p-6 sm:p-10 border-2 border-[#FF8F00]/50 shadow-[0_0_50px_rgba(255,143,0,0.35)] relative">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2 font-pixel text-[11px]">
                  <span className="text-[#FF8F00] font-bold">{selectedProject.missionNumber}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-[#FF8F00] font-semibold">{selectedProject.status}</span>
                </div>
                <h2 className="font-black-ops text-2xl sm:text-3xl font-extrabold text-white tracking-wide">{selectedProject.title}</h2>
              </div>
              <button
                {...getUniversalAudioProps('closeModal', 'hover', () => setSelectedProject(null))}
                aria-label="Close modal"
                title="Close"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-[#FF8F00]/20 border border-white/15 hover:border-[#FF8F00]/50 text-gray-300 hover:text-[#FF8F00] transition-all cursor-pointer flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-8 text-sm">
              {/* Mission Brief & Business Problem */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#000000] border border-[#FF8F00]/30">
                  <h4 className="font-mono text-xs text-[#FF8F00] font-bold uppercase mb-2 flex items-center gap-2">
                    MISSION BRIEF
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#000000] border border-white/10">
                  <h4 className="font-mono text-xs text-gray-300 font-bold uppercase mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#D90000]" /> OBJECTIVE & PROBLEM
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{selectedProject.businessProblem}</p>
                </div>
              </div>

              {/* Full Technology Loadout */}
              <div>
                <h4 className="font-mono text-xs text-gray-300 font-bold uppercase mb-3 flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-[#FF8F00]" /> FULL TECHNOLOGY LOADOUT
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologyLoadout.map((tech, i) => (
                    <span key={i} className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#000000] border border-[#FF8F00]/40 text-[#FF8F00] font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* System Architecture */}
              <div className="p-5 rounded-2xl bg-[#000000] border border-white/10">
                <h4 className="font-mono text-xs text-gray-300 font-bold uppercase mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#FF8F00]" /> SYSTEM ARCHITECTURE
                </h4>
                <p className="text-gray-300 font-mono text-xs leading-relaxed mb-4">{selectedProject.architecture.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.architecture.nodes.map((node, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#1F150C] border border-white/5 flex items-center justify-between">
                      <span className="font-mono text-xs text-white font-semibold">{node.name}</span>
                      <span className="font-mono text-[10px] text-gray-400">{node.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Mission Features */}
              <div>
                <h4 className="font-mono text-xs text-[#FF8F00] font-bold uppercase mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> KEY FEATURES & CAPABILITIES
                </h4>
                <div className="space-y-2">
                  {selectedProject.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs font-mono text-gray-300">
                      <span className="text-[#FF8F00] font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission Outcome */}
              <div className="p-5 rounded-2xl bg-[#FF8F00]/10 border border-[#FF8F00]/30">
                <h4 className="font-mono text-xs text-[#FF8F00] font-bold uppercase mb-2">MISSION OUTCOME & RESULTS</h4>
                <div className="space-y-1.5 text-xs font-mono text-white">
                  {selectedProject.outcome.map((res, i) => (
                    <div key={i}>&gt; {res}</div>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="flex gap-4 pt-4 border-t border-white/10">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    {...getUniversalAudioProps('click', 'hover')}
                    className="btn-primary text-xs py-2.5"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    {...getUniversalAudioProps('click', 'hover')}
                    className="btn-secondary text-xs py-2.5"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    <span>SOURCE REPOSITORY</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
