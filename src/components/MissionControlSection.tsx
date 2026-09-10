import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, type Project } from '../data/projects';
import { Target, CheckCircle2, ChevronRight, Layers, FileCode2, ExternalLink, X, Send, Cpu, ShieldCheck } from 'lucide-react';
import { getUniversalAudioProps } from '../utils/soundEffects';
import { ArchitectureDiagram } from './ui/ArchitectureDiagram';
import { HoverMarqueeText } from './ui/HoverMarqueeText';

const getMissionMetaCards = (project: Project) => {
  const cards: { label: string; value: string }[] = [];

  // Client
  if (project.tagline.includes("GAS (GAS Arabian Services)") || project.description.includes("GAS")) {
    cards.push({ label: 'CLIENT', value: 'GAS (GAS Arabian Services)' });
  } else {
    cards.push({ label: 'PLATFORM', value: 'Production SaaS' });
  }

  // Role
  cards.push({ label: 'ROLE', value: 'Lead Full Stack Architect' });

  // Type
  let typeVal = project.category as string;
  if (project.id === 'mission-01') typeVal = 'Monthly Audit Platform';
  else if (project.id === 'mission-02') typeVal = 'AI Career Platform';
  else if (project.id === 'mission-03') typeVal = 'Analytics Portal';
  cards.push({ label: 'TYPE', value: typeVal });

  // Category
  cards.push({ label: 'CATEGORY', value: project.category });

  // Status
  cards.push({ label: 'STATUS', value: project.status });

  return cards;
};

const MetaChipCard: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <div className="p-3 rounded-xl bg-[#000000] border border-[#FF8F00]/40 flex flex-col gap-1 text-left min-w-0 transition-colors hover:border-[#FF8F00]">
      <HoverMarqueeText
        text={label}
        className="font-mono text-[10px] text-gray-400 uppercase tracking-wider"
      />
      <HoverMarqueeText
        text={value}
        className="font-mono text-xs font-bold text-[#FF8F00] hover:text-amber-300 transition-colors"
      />
    </div>
  );
};

const MissionMetricBox: React.FC<{ number: string; caption: string }> = ({ number, caption }) => {
  return (
    <div className="flex flex-col min-w-0">
      <span className="font-mono text-base font-extrabold text-[#FF8F00]">{number}</span>
      <HoverMarqueeText
        text={caption}
        className="font-mono text-[9px] text-gray-300 uppercase tracking-tight hover:text-white transition-colors"
      />
    </div>
  );
};

type ModalTab = 'overview' | 'architecture' | 'features' | 'results';

export const MissionControlSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<ModalTab>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      setActiveModalTab('overview');
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const handleInquireClick = () => {
    setSelectedProject(null);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      setTimeout(() => {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

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
          FEATURED <span className="text-[#FF8F00]">ENGINEERING MISSIONS</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          &gt; Production software applications delivering verifiable business ROI, data integrity, and scalable architecture.
        </p>
      </div>

      {/* Projects Grid — Distinctive RPG Wood Texture & Hanging Vines Theme */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            {...getUniversalAudioProps('openModal', 'hover', () => setSelectedProject(project))}
            className="h-full p-6 sm:p-8 flex flex-col justify-between group rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-[#FF8F00] hover:shadow-[0_15px_35px_rgba(255,143,0,0.25)] relative overflow-hidden cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(30,18,8,0.78) 0%, rgba(30,18,8,0.6) 50%, rgba(30,18,8,0.85) 100%), url('/wood-texture.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '2px solid rgba(139,90,43,0.7)',
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5), 0 8px 25px rgba(0,0,0,0.6)',
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

            <div className="relative z-20 flex-1 flex flex-col">
              {/* Mission Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="font-mono text-xs font-bold text-[#FF8F00] tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8F00] animate-pulse" />
                  {project.missionNumber}
                </span>
                <span className="badge-tag badge-success text-[10px] font-mono font-bold">
                  {project.status}
                </span>
              </div>

              {/* Mission Title */}
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white group-hover:text-[#FF8F00] transition-colors mb-3 tracking-tight leading-snug">
                {project.title}
              </h3>

              {/* Tagline */}
              <p className="text-xs sm:text-sm text-gray-200 mb-5 font-sans leading-relaxed">
                {project.tagline}
              </p>

              {/* Key Impact Stats Bar */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-5 p-3 rounded-xl bg-[#000000]/80 border border-[#FF8F00]/40 shadow-inner">
                  {project.metrics.slice(0, 2).map((m, idx) => (
                    <MissionMetricBox key={idx} number={m.number} caption={m.caption} />
                  ))}
                </div>
              )}

              {/* Technology Loadout Tags */}
              <div className="mb-6">
                <span className="font-mono text-[10px] text-gray-300 block mb-2 uppercase tracking-wider font-bold">TECH ARSENAL</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologyLoadout.slice(0, 5).map((tech, i) => (
                    <span key={i} className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-[#000000]/85 border border-white/15 text-gray-200 font-medium">
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
              className="relative z-20 w-full mt-2 py-3 rounded-xl bg-[#FF8F00]/20 border border-[#FF8F00]/60 hover:bg-[#FF8F00]/35 hover:border-[#FF8F00] text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,143,0,0.2)]"
            >
              <span>INSPECT MISSION SPECIFICATION</span>
              <ChevronRight className="w-4 h-4 text-[#FF8F00] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Mission Inspection Modal */}
      {selectedProject && createPortal(
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 font-sans animate-fadeIn" role="dialog" aria-modal="true" aria-labelledby="mission-modal-title">
          <div className="glass-panel w-full max-w-7xl h-[88vh] max-h-[88vh] overflow-y-auto p-5 sm:p-8 md:p-10 border-2 border-[#FF8F00]/60 shadow-[0_0_70px_rgba(0,0,0,0.95),0_0_40px_rgba(255,143,0,0.3)] relative rounded-2xl custom-scrollbar">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2 font-mono text-xs">
                  <span className="text-[#FF8F00] font-bold">{selectedProject.missionNumber}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-[#10B981] font-semibold">{selectedProject.status}</span>
                </div>
                <h2 id="mission-modal-title" className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{selectedProject.title}</h2>
              </div>
              <button
                {...getUniversalAudioProps('closeModal', 'hover', () => setSelectedProject(null))}
                aria-label="Close modal"
                title="Close (ESC)"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-[#FF8F00]/20 border border-white/15 hover:border-[#FF8F00]/50 text-gray-300 hover:text-[#FF8F00] transition-all cursor-pointer flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tab Bar */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6 overflow-x-auto custom-scrollbar">
              {[
                { id: 'overview', label: '01 OVERVIEW & BLUEPRINT' },
                { id: 'results', label: '02 MEASURED BUSINESS ROI' },
                { id: 'features', label: '03 KEY CAPABILITIES' },
                { id: 'architecture', label: '04 TECHNICAL ARCHITECTURE' },
              ].map((tab) => {
                const isActive = activeModalTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    {...getUniversalAudioProps('click', 'hover', () => setActiveModalTab(tab.id as ModalTab))}
                    className={`px-4 py-2 rounded-xl font-pixel text-[10px] sm:text-[11px] font-bold tracking-wider transition-all duration-300 focus:outline-none cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#FF8F00]/20 text-[#FF8F00] border border-[#FF8F00]/80 shadow-[0_0_15px_rgba(255,143,0,0.4)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="space-y-8 text-sm">
              {/* Tab 1: Overview */}
              {activeModalTab === 'overview' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Meta-Info Card Row */}
                  {(() => {
                    const metaCards = getMissionMetaCards(selectedProject);
                    if (metaCards.length === 0) return null;

                    return (
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                        {metaCards.map((card, i) => (
                          <MetaChipCard key={i} label={card.label} value={card.value} />
                        ))}
                      </div>
                    );
                  })()}

                  {/* UI Blueprint / System Mockup Card */}
                  {selectedProject.preview && (
                    <div className="p-5 rounded-2xl bg-[#070B14] border border-[#FF8F00]/40 shadow-inner">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-[#FF8F00]" />
                          <span className="font-mono text-xs font-bold text-white uppercase">{selectedProject.preview.headline}</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#10B981] font-bold px-2 py-0.5 rounded bg-[#10B981]/15 border border-[#10B981]/30">
                          {selectedProject.preview.type}
                        </span>
                      </div>

                      {/* Simulated KPI Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        {selectedProject.preview.kpis.map((kpi, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-[#000000] border border-white/10 text-center min-w-0">
                            <HoverMarqueeText text={kpi.label} className="font-mono text-[9px] text-gray-400 block" />
                            <HoverMarqueeText text={kpi.value} className="font-mono text-xs font-bold text-[#FF8F00]" />
                          </div>
                        ))}
                      </div>

                      {/* Blueprint Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.preview.metrics.map((badge, idx) => (
                          <span key={idx} className="font-mono text-[11px] px-3 py-1 rounded-md bg-[#FF8F00]/15 border border-[#FF8F00]/30 text-white font-semibold flex items-center gap-1.5">
                            <ShieldCheck className="w-3 h-3 text-[#FF8F00]" />
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Business Challenge & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-[#000000] border border-[#FF8F00]/30">
                      <h4 className="font-mono text-xs text-[#FF8F00] font-bold uppercase mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-[#D90000]" /> BUSINESS CHALLENGE
                      </h4>
                      <p className="text-gray-300 leading-relaxed font-sans text-xs sm:text-sm">{selectedProject.businessProblem}</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#000000] border border-white/10">
                      <h4 className="font-mono text-xs text-gray-300 font-bold uppercase mb-2 flex items-center gap-2">
                        SOLUTION &amp; ARCHITECTURE
                      </h4>
                      <p className="text-gray-300 leading-relaxed font-sans text-xs sm:text-sm">{selectedProject.description}</p>
                    </div>
                  </div>

                  {/* Why It Mattered Section */}
                  {selectedProject.whyItMattered && (
                    <div className="p-4 rounded-xl bg-[#000000] border border-[#FF8F00]/40 font-mono text-xs text-[#FF8F00] leading-relaxed">
                      <span className="font-bold">{selectedProject.whyItMattered}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Business Impact */}
              {activeModalTab === 'results' && (
                <div className="p-5 rounded-2xl bg-[#FF8F00]/10 border border-[#FF8F00]/30 animate-fadeIn">
                  <h4 className="font-mono text-xs text-[#FF8F00] font-bold uppercase mb-4">VERIFIED BUSINESS ROI &amp; MEASURABLE RESULTS</h4>
                  
                  {/* High Impact 3-Column Metric Cards */}
                  {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      {selectedProject.metrics.map((stat, i) => (
                        <div key={i} className="p-4 rounded-xl bg-[#000000] border border-[#FF8F00]/50 flex flex-col items-center justify-center text-center shadow-[0_0_15px_rgba(255,143,0,0.15)]">
                          <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#FF8F00]">{stat.number}</span>
                          <span className="font-mono text-[10px] sm:text-[11px] text-gray-200 uppercase tracking-wider mt-1.5 font-bold">{stat.caption}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2 text-xs font-mono text-white">
                    {selectedProject.outcome.map((res, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[#FF8F00] font-bold">&gt;</span>
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Features */}
              {activeModalTab === 'features' && (
                <div className="animate-fadeIn">
                  <h4 className="font-mono text-xs text-[#FF8F00] font-bold uppercase mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> COMPREHENSIVE PLATFORM CAPABILITIES
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((feat, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#000000] border border-white/10 flex items-start gap-2.5 text-xs font-mono text-gray-300">
                        <span className="text-[#FF8F00] font-bold mt-0.5">✔</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Technical Highlights */}
              {activeModalTab === 'architecture' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* System Architecture Flow */}
                  <div className="p-5 rounded-2xl bg-[#000000] border border-white/10">
                    <h4 className="font-mono text-xs text-gray-300 font-bold uppercase mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#FF8F00]" /> DATA &amp; APPLICATION FLOW PIPELINE
                    </h4>
                    <ArchitectureDiagram
                      stages={selectedProject.architecture.nodes.map((node) => ({
                        stage: node.name,
                        role: node.type,
                      }))}
                    />
                  </div>

                  {/* Technical Loadout Tags */}
                  <div>
                    <h4 className="font-mono text-xs text-gray-300 font-bold uppercase mb-3 flex items-center gap-2">
                      <FileCode2 className="w-4 h-4 text-[#FF8F00]" /> COMPLETE ENGINEERING LOADOUT
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologyLoadout.map((tech, i) => (
                        <span key={i} className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#000000] border border-[#FF8F00]/40 text-[#FF8F00] font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Project Action Links & Inquire Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-white/10">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleInquireClick}
                    className="btn-primary text-xs py-2.5 w-full sm:w-auto justify-center flex items-center gap-2 font-mono font-bold cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>INQUIRE ABOUT SIMILAR PROJECT</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
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
                      <span>CODE REPOSITORY</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
