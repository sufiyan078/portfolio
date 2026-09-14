import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, type Project } from '../data/projects';
import { Target, CheckCircle2, ChevronRight, ChevronLeft, Layers, FileCode2, ExternalLink, X, Send, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import { getUniversalAudioProps, playCyberSound } from '../utils/soundEffects';
import { ArchitectureDiagram } from './ui/ArchitectureDiagram';
import { HoverMarqueeText } from './ui/HoverMarqueeText';
import { DimensionalWarpCanvas } from './DimensionalWarpCanvas';
import { animate } from 'animejs';

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

const woodCardStyle: React.CSSProperties = {
  backgroundImage: `linear-gradient(180deg, rgba(30,18,8,0.78) 0%, rgba(30,18,8,0.6) 50%, rgba(30,18,8,0.85) 100%), url('/wood-texture.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: '2px solid rgba(139,90,43,0.7)',
  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5), 0 8px 25px rgba(0,0,0,0.6)',
};

const VinesOverlay: React.FC = () => (
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
);

type ModalTab = 'overview' | 'architecture' | 'features' | 'results';

export type TransitionState =
  | 'PORTFOLIO'
  | 'ENTER_PORTAL'
  | 'ENTER_WARP'
  | 'DARK_DIMENSION'
  | 'EXIT_PORTAL'
  | 'EXIT_WARP';

export const MissionControlSection: React.FC = () => {
  const [transitionState, setTransitionState] = useState<TransitionState>('PORTFOLIO');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<ModalTab>('overview');
  const [activeMissionIndex, setActiveMissionIndex] = useState(0);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const warpTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const entrancePortalRef = useRef<HTMLDivElement>(null);
  const exitPortalRef = useRef<HTMLButtonElement>(null);
  const previousScrollYRef = useRef(0);
  const [warpOrigin, setWarpOrigin] = useState<{ x: number; y: number; size: number }>({
    x: 0,
    y: 0,
    size: 360,
  });

  useEffect(() => {
    return () => {
      if (warpTimeoutRef.current) clearTimeout(warpTimeoutRef.current);
    };
  }, []);

  // Lock body & html scroll whenever dimensional transition or Dark Dimension is active
  useEffect(() => {
    if (transitionState !== 'PORTFOLIO') {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.classList.add('dark-dimension-active');
      document.documentElement.classList.add('dark-dimension-active');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.classList.remove('dark-dimension-active');
        document.documentElement.classList.remove('dark-dimension-active');
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    } else {
      document.body.classList.remove('dark-dimension-active');
      document.documentElement.classList.remove('dark-dimension-active');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [transitionState]);

  const handleEnterVault = () => {
    // Guard against re-entrant clicks
    if (transitionState !== 'PORTFOLIO') return;

    // Respect user's prefers-reduced-motion setting
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setTransitionState('DARK_DIMENSION');
      return;
    }

    // Record previous scroll position for exact restoration on exit
    previousScrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0;

    // Measure exact DOM bounding rectangle of the existing warp gate for true origin breakout
    if (entrancePortalRef.current) {
      const rect = entrancePortalRef.current.getBoundingClientRect();
      setWarpOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        size: Math.max(rect.width, rect.height),
      });
    } else {
      setWarpOrigin({
        x: typeof window !== 'undefined' ? window.innerWidth / 2 : 600,
        y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
        size: 360,
      });
    }

    playCyberSound('openModal');
    // Step 1: Portal activates and expands from origin to swallow camera (~650ms)
    setTransitionState('ENTER_PORTAL');

    if (warpTimeoutRef.current) clearTimeout(warpTimeoutRef.current);
    warpTimeoutRef.current = setTimeout(() => {
      // Step 2: Handoff into Three.js WebGL fullscreen warp traversal
      setTransitionState('ENTER_WARP');
    }, 650);
  };

  const handleEnterWarpComplete = useCallback(() => {
    // Step 3: Arrive cleanly in the Dark Dimension
    setTransitionState('DARK_DIMENSION');
  }, []);

  const handleExitDimension = useCallback(() => {
    // Guard against re-entrant clicks
    if (transitionState !== 'DARK_DIMENSION') return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setTransitionState('PORTFOLIO');
      if (typeof window !== 'undefined') {
        window.scrollTo(0, previousScrollYRef.current);
      }
      return;
    }

    playCyberSound('closeModal');
    // Step 1: Dark Dimension collapses into the exit warp gate (~350ms)
    setTransitionState('EXIT_PORTAL');

    if (warpTimeoutRef.current) clearTimeout(warpTimeoutRef.current);
    warpTimeoutRef.current = setTimeout(() => {
      // Step 2: Reverse dimensional traversal and explosive ejection burst
      setTransitionState('EXIT_WARP');
    }, 350);
  }, [transitionState]);

  const handleExitWarpComplete = useCallback(() => {
    // Step 3: Return cleanly to the portfolio world and restore previous scroll
    setTransitionState('PORTFOLIO');
    if (typeof window !== 'undefined') {
      window.scrollTo(0, previousScrollYRef.current);
    }
  }, []);

  // Anime.js Function-Based Tween Animation
  // Matches https://animejs.com/documentation/animation/tween-value-types/function-based
  const runFunctionBasedTween = (targetIdx: number) => {
    setActiveMissionIndex(targetIdx);
    const elements = cardElementsRef.current.filter(Boolean) as HTMLDivElement[];
    if (elements.length === 0) return;

    const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const isMobile = screenW < 640;
    const isTablet = screenW < 1024;

    animate(elements, {
      x: (_target, rawIndex) => {
        const index = rawIndex ?? 0;
        const diff = index - targetIdx;
        if (diff === 0) return 0;
        if (isMobile) {
          return diff < 0 ? (diff === -1 ? -26 : -48) : (diff === 1 ? 26 : 48);
        }
        if (isTablet) {
          return diff < 0 ? (diff === -1 ? -190 : -340) : (diff === 1 ? 190 : 340);
        }
        return diff < 0 ? (diff === -1 ? -420 : -780) : (diff === 1 ? 420 : 780);
      },
      y: (_target, rawIndex) => {
        const index = rawIndex ?? 0;
        const diff = Math.abs(index - targetIdx);
        if (diff === 0) return 0;
        return isMobile ? (diff === 1 ? 12 : 20) : (diff === 1 ? 20 : 32);
      },
      scale: (_target, rawIndex) => {
        const index = rawIndex ?? 0;
        const diff = Math.abs(index - targetIdx);
        if (diff === 0) return 1;
        if (isMobile) return diff === 1 ? 0.92 : 0.85;
        return diff === 1 ? 0.88 : 0.78;
      },
      rotate: (_target, rawIndex) => {
        const index = rawIndex ?? 0;
        const diff = index - targetIdx;
        if (diff === 0) return 0;
        return diff < 0 ? (diff === -1 ? -3.5 : -5) : (diff === 1 ? 3.5 : 5);
      },
      opacity: (_target, rawIndex) => {
        const index = rawIndex ?? 0;
        const diff = Math.abs(index - targetIdx);
        if (diff === 0) return 1;
        if (isMobile) return diff === 1 ? 0.45 : 0.25;
        return diff === 1 ? 0.75 : 0.55;
      },
      duration: (_target, rawIndex) => {
        const index = rawIndex ?? 0;
        return 950 + Math.abs(index - targetIdx) * 160;
      },
      delay: (_target, rawIndex) => {
        const index = rawIndex ?? 0;
        return Math.abs(index - targetIdx) * 75;
      },
      ease: 'outElastic(1, .6)',
    });
  };


  // Trigger initial function-based tween upon entering the Dark Dimension
  useEffect(() => {
    if (transitionState === 'DARK_DIMENSION') {
      const timer = setTimeout(() => {
        runFunctionBasedTween(activeMissionIndex);
      }, 70);
      return () => clearTimeout(timer);
    }
  }, [transitionState]);

  // Recalculate function-based tween transforms on window resize
  useEffect(() => {
    if (transitionState !== 'DARK_DIMENSION') return;
    const handleResize = () => {
      runFunctionBasedTween(activeMissionIndex);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [transitionState, activeMissionIndex]);

  // Keyboard navigation for Missions Archive: Left / Right arrows + ESC to exit/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProject) {
          setSelectedProject(null);
        } else if (transitionState === 'DARK_DIMENSION') {
          handleExitDimension();
        }
      } else if (transitionState === 'DARK_DIMENSION' && !selectedProject) {
        if (e.key === 'ArrowLeft') {
          const prevIdx = (activeMissionIndex - 1 + PROJECTS.length) % PROJECTS.length;
          playCyberSound('hover');
          runFunctionBasedTween(prevIdx);
        } else if (e.key === 'ArrowRight') {
          const nextIdx = (activeMissionIndex + 1) % PROJECTS.length;
          playCyberSound('hover');
          runFunctionBasedTween(nextIdx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, transitionState, activeMissionIndex, handleExitDimension]);

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
      {/* ── 1. PORTFOLIO WORLD — WOODEN MISSION VAULT ENTRANCE ── */}
      <div className="w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <div className="badge-tag border border-[#FF8F00]/40 bg-[#FF8F00]/10 text-[#FF8F00] mb-3 group">
            <Target className="w-3.5 h-3.5 text-[#FF8F00] transition-transform duration-300 group-hover:scale-110" />
            <span className="text-[#FF8F00] font-bold">MISSIONS</span>
          </div>
          <h2 className="font-heading font-extrabold text-[32px] sm:text-[38px] text-white tracking-tight">
            FEATURED <span className="text-[#FF8F00]">ENGINEERING MISSIONS</span>
          </h2>
          <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
            &gt; Production software applications delivering verifiable business ROI, data integrity, and scalable architecture.
          </p>
        </div>

        {/* Wooden Mission Vault Entrance Card */}
        <div
          className="w-full min-h-[580px] sm:min-h-[640px] p-6 sm:p-8 flex flex-col justify-between group rounded-2xl relative overflow-hidden text-center transition-all duration-300"
          style={{
            ...woodCardStyle,
            width: '100%',
            maxWidth: '840px',
          }}
        >
          <VinesOverlay />

          <div className="relative z-20 flex-1 flex flex-col justify-between">
            {/* Top Badges */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#FF8F00] tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8F00] animate-pulse" />
                DIRECTIVE 00
              </span>
              <span className="badge-tag text-[10px] font-mono font-bold border-[#FF8F00]/50 bg-[#FF8F00]/15 text-[#FF8F00]">
                PORTAL ACTIVE
              </span>
            </div>

            {/* Center Area: Portal & Narrative Hierarchy */}
            <div className="flex-1 flex flex-col items-center justify-center my-auto py-1">
              {/* Interactive Warp Gate Gateway with Scoped Hover & Click */}
              <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnterVault();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    handleEnterVault();
                  }
                }}
                aria-label="Enter the Mission Vault"
                className="group/portal relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#FF8F00] rounded-2xl p-1 transition-all duration-300 mb-2 flex flex-col items-center select-none"
              >
                {/* Portal Artwork Container with Scoped Hover - Prominent Hero Size */}
                <div
                  ref={entrancePortalRef}
                  className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[360px] lg:h-[360px] flex items-center justify-center transition-all duration-300 group-hover/portal:scale-[1.04] group-hover/portal:brightness-110"
                >
                  {/* Ambient Outer Aura Glow */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#38BDF8]/40 via-[#9333EA]/30 to-[#FF8F00]/25 blur-3xl pointer-events-none transition-all duration-500 opacity-75 group-hover/portal:opacity-100 group-hover/portal:blur-[40px] animate-pulse" />

                  {/* Rotating Celestial Electric Blue Spiral Vortex */}
                  <div
                    className="absolute pointer-events-none z-10"
                    style={{
                      top: '37.6%',
                      left: '50.0%',
                      width: '51%',
                      height: '51%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <img
                      src="/warp-vortex-celestial.png"
                      alt=""
                      className="w-full h-full object-contain pointer-events-none select-none animate-warp-gate-spiral group-hover/portal:animate-warp-spiral-fast mix-blend-screen opacity-95 group-hover/portal:opacity-100 drop-shadow-[0_0_20px_rgba(56,189,248,0.9)]"
                    />
                  </div>

                  {/* Pulsing Central Energy Core Sparkle */}
                  <div
                    className="absolute pointer-events-none z-10 rounded-full bg-cyan-300/40 blur-lg animate-pulse"
                    style={{
                      top: '37.6%',
                      left: '50.0%',
                      width: '32%',
                      height: '32%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />

                  {/* Isolated Celestial Warp Gate (Front View, Transparent Background) */}
                  <img
                    src="/warp-gate-celestial-frame.png"
                    alt="Celestial Mission Vault Warp Gate"
                    className="w-full h-full object-contain relative z-20 pointer-events-none select-none filter drop-shadow-[0_0_30px_rgba(56,189,248,0.5)] group-hover/portal:drop-shadow-[0_0_45px_rgba(56,189,248,0.8)] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Main Title */}
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-snug mt-2 mb-3">
                THE MISSION VAULT
              </h3>
            </div>

            {/* Bottom Action Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleEnterVault();
              }}
              className="relative z-20 w-full mt-2 py-3.5 rounded-xl bg-[#FF8F00]/20 border border-[#FF8F00]/60 hover:bg-[#FF8F00]/35 hover:border-[#FF8F00] text-white font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,143,0,0.2)] hover:shadow-[0_0_25px_rgba(255,143,0,0.45)] group/btn"
            >
              <span>ENTER THE MISSION VAULT</span>
              <ArrowRight className="w-4 h-4 text-[#FF8F00] group-hover/btn:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. IMMERSIVE FULL-VIEWPORT CINEMATIC DIMENSIONAL WARP LAYER ── */}
      {transitionState !== 'PORTFOLIO' && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 w-screen h-screen select-none overflow-hidden"
          style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 999999, overflow: 'hidden' }}
        >
          {/* STAGE 1: PORTAL ACTIVATION & REAL-ORIGIN EXPANSION BREAKOUT */}
          {transitionState === 'ENTER_PORTAL' && (
            <div
              className="relative w-full h-full overflow-hidden"
              role="status"
              aria-live="polite"
              aria-label="Dimensional portal activating and expanding"
            >
              {/* Swallowing backdrop */}
              <div className="absolute inset-0 animate-warp-backdrop-fast-swallow pointer-events-none" />

              {/* Expanding Portal Surge originating exactly from real gate DOM location */}
              <div
                className="absolute pointer-events-none animate-warp-portal-fast-burst"
                style={{
                  left: `${warpOrigin.x}px`,
                  top: `${warpOrigin.y}px`,
                  width: `${warpOrigin.size}px`,
                  height: `${warpOrigin.size}px`,
                }}
              >
                {/* Hyper-energized Aura */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF8F00] via-[#FBBF24] to-[#38BDF8] blur-2xl opacity-90 animate-ping" />

                {/* Rotating celestial vortex */}
                <div
                  className="absolute pointer-events-none z-10"
                  style={{
                    top: '37.6%',
                    left: '50.0%',
                    width: '51%',
                    height: '51%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <img
                    src="/warp-vortex-celestial.png"
                    alt=""
                    className="w-full h-full object-contain animate-warp-spiral-fast mix-blend-screen drop-shadow-[0_0_40px_rgba(255,143,0,1)]"
                  />
                </div>

                {/* Central Sparkling Energy Core */}
                <div
                  className="absolute pointer-events-none z-10 rounded-full bg-amber-200/80 blur-md animate-pulse"
                  style={{
                    top: '37.6%',
                    left: '50.0%',
                    width: '36%',
                    height: '36%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />

                {/* Celestial Warp Gate Frame */}
                <img
                  src="/warp-gate-celestial-frame.png"
                  alt=""
                  className="w-full h-full object-contain relative z-20 filter drop-shadow-[0_0_55px_rgba(255,143,0,0.9)]"
                />
              </div>
            </div>
          )}

          {/* STAGE 2: THREE.JS FULLSCREEN DIMENSIONAL WARP TRAVERSAL */}
          {transitionState === 'ENTER_WARP' && (
            <DimensionalWarpCanvas mode="enter" onComplete={handleEnterWarpComplete} />
          )}

          {/* STAGE 3: FULLSCREEN DARK DIMENSION (Active in DARK_DIMENSION or collapsing in EXIT_PORTAL) */}
          {(transitionState === 'DARK_DIMENSION' || transitionState === 'EXIT_PORTAL') && (
            <div
              className={`w-full h-full overflow-hidden flex flex-col justify-between bg-[#030712] text-white select-none p-3 sm:p-4 lg:p-6 relative ${
                transitionState === 'EXIT_PORTAL' ? 'animate-dimension-collapse-to-exit' : 'animate-dimension-enter'
              }`}
              style={{ overflow: 'hidden' }}
            >
              {/* Ancient Sanctuary / Dungeon Ruin Atmospheric Background */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 scale-100 transition-transform duration-1000"
                style={{
                  backgroundImage: "url('/dimension-dungeon-bg.png')",
                }}
              />

              {/* Atmospheric Depth Vignette & Moonlit Contrast Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/85 pointer-events-none z-0" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.65)_100%)] pointer-events-none z-0" />

              {/* Ambient Floating Fireflies / Embers matching the sanctuary cavern */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <span className="absolute top-[48%] left-[49%] w-1.5 h-1.5 rounded-full bg-rose-400/85 blur-[0.5px] animate-pulse" />
                <span className="absolute top-[56%] left-[53%] w-1 h-1 rounded-full bg-amber-400/85 blur-[0.5px] animate-pulse [animation-delay:700ms]" />
                <span className="absolute top-[44%] left-[51%] w-1.5 h-1.5 rounded-full bg-orange-400/75 blur-[0.5px] animate-pulse [animation-delay:1200ms]" />
                <span className="absolute top-[61%] left-[47%] w-1 h-1 rounded-full bg-cyan-300/75 blur-[0.5px] animate-pulse [animation-delay:1800ms]" />
                <span className="absolute top-[52%] left-[44%] w-1 h-1 rounded-full bg-emerald-300/70 blur-[0.5px] animate-pulse [animation-delay:2200ms]" />
              </div>

              {/* Viewport Cybernetic Corner Brackets */}
              <div className="fixed top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#FF8F00]/60 pointer-events-none z-30" />
              <div className="fixed top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#FF8F00]/60 pointer-events-none z-30" />
              <div className="fixed bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#FF8F00]/60 pointer-events-none z-30" />
              <div className="fixed bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#FF8F00]/60 pointer-events-none z-30" />

              {/* Dimension Top Bar: Interactive Exit Warp Portal */}
              <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-end pb-3 border-b border-white/10 shrink-0">
                {/* THE EXIT WARP GATE (Thematic Interactive Gateway Back to Portfolio) */}
                <button
                  ref={exitPortalRef}
                  type="button"
                  onClick={handleExitDimension}
                  className="group/exit-portal flex items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2 pr-3.5 sm:pr-4.5 rounded-2xl bg-black/85 border border-[#FF8F00]/50 hover:border-[#FF8F00] hover:bg-[#FF8F00]/20 transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(255,143,0,0.3)] hover:shadow-[0_0_40px_rgba(255,143,0,0.65)] focus:outline-none backdrop-blur-md"
                  aria-label="Exit the Dark Dimension through warp gate"
                  title="Exit the Dark Dimension through warp gate"
                >
                  {/* Interactive Ancient Portal Graphic */}
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF8F00]/60 to-[#FBBF24]/50 blur-md group-hover/exit-portal:blur-lg group-hover/exit-portal:opacity-100 transition-all opacity-75 animate-pulse" />
                    <div
                      className="absolute pointer-events-none z-10"
                      style={{
                        top: '37.6%',
                        left: '50.0%',
                        width: '46%',
                        height: '46%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <img
                        src="/warp-vortex-celestial.png"
                        alt=""
                        className="w-full h-full object-contain animate-warp-gate-spiral group-hover/exit-portal:animate-warp-spiral-fast mix-blend-screen"
                      />
                    </div>
                    <img
                      src="/warp-gate-celestial-frame.png"
                      alt=""
                      className="w-full h-full object-contain relative z-20 filter drop-shadow-[0_0_15px_rgba(255,143,0,0.8)] group-hover/exit-portal:scale-105 transition-transform"
                    />
                  </div>
                  {/* Label */}
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[9px] text-[#FF8F00] uppercase tracking-widest leading-none font-bold">
                      EXIT WARP GATE
                    </span>
                    <span className="font-mono text-xs font-bold text-white group-hover/exit-portal:text-amber-200 transition-colors tracking-wide flex items-center gap-1.5 mt-0.5">
                      <span>DEPART TO PORTFOLIO</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/exit-portal:translate-x-1 transition-transform text-[#FF8F00]" />
                    </span>
                  </div>
                </button>
              </div>

              {/* Active Selected Mission Indicator */}
              <div className="relative z-20 flex flex-col items-center text-center my-2 sm:my-3 shrink-0">
                <div className="flex items-center justify-center">
                  {(() => {
                    const currentProj = PROJECTS[activeMissionIndex];
                    if (!currentProj) return null;
                    return (
                      <button
                        key={currentProj.id}
                        type="button"
                        onClick={() => {
                          playCyberSound('hover');
                          runFunctionBasedTween((activeMissionIndex + 1) % PROJECTS.length);
                        }}
                        className="px-4 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border bg-[#FF8F00]/25 border-[#FF8F00] text-white shadow-[0_0_20px_rgba(255,143,0,0.45)] hover:bg-[#FF8F00]/35 hover:shadow-[0_0_30px_rgba(255,143,0,0.65)] cursor-pointer backdrop-blur-md"
                        title="Click to cycle to next mission"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#FF8F00] animate-pulse" />
                        <span>{currentProj.missionNumber}</span>
                        <span className="font-normal text-gray-300">
                          // {activeMissionIndex === 0 ? 'MONTHLY AUDIT' : activeMissionIndex === 1 ? 'CAREERAI' : 'QUARTERLY REPORT'}
                        </span>
                      </button>
                    );
                  })()}
                </div>
              </div>

              {/* Central Anime.js Function-Based Tween Stage */}
              <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-center my-auto min-h-0">
                <div className="relative w-full max-w-6xl h-[510px] sm:h-[530px] md:h-[550px] max-h-[72vh] flex items-center justify-center [perspective:1200px]">
                  {PROJECTS.map((project, index) => {
                    const isCurrent = index === activeMissionIndex;
                    return (
                      <div
                        key={project.id}
                        ref={(el) => {
                          cardElementsRef.current[index] = el;
                        }}
                        onClick={() => {
                          if (!isCurrent) {
                            playCyberSound('hover');
                            runFunctionBasedTween(index);
                          }
                        }}
                        className={`absolute w-[90vw] max-w-[340px] sm:max-w-[365px] md:max-w-[375px] h-full transition-shadow duration-300 ${
                          isCurrent
                            ? 'cursor-default shadow-[0_0_40px_rgba(255,143,0,0.35),0_20px_50px_rgba(0,0,0,0.85)]'
                            : 'cursor-pointer hover:brightness-110 shadow-[0_15px_35px_rgba(0,0,0,0.8)]'
                        }`}
                        style={{
                          transformOrigin: 'center center',
                          willChange: 'transform, opacity',
                          zIndex: isCurrent ? 30 : Math.abs(index - activeMissionIndex) === 1 ? 20 : 10,
                        }}
                      >
                        {/* Wooden Card Body matching Screenshot 2 aesthetic */}
                        <div
                          className="w-full h-full min-h-0 p-4 sm:p-5 flex flex-col justify-between group rounded-2xl relative overflow-hidden text-left"
                          style={woodCardStyle}
                        >
                          <VinesOverlay />

                          {/* Subtle Wing Hint Label for non-active cards */}
                          {!isCurrent && (
                            <div className="absolute top-3.5 right-3.5 z-30 pointer-events-none">
                              <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/80 border border-[#FF8F00]/50 text-[#FF8F00]">
                                CLICK TO FOCUS
                              </span>
                            </div>
                          )}

                          <div className="relative z-20 flex-1 flex flex-col justify-between">
                            <div>
                              {/* Mission Header Badges */}
                              <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
                                <span className="font-mono text-xs font-bold text-[#FF8F00] tracking-widest flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8F00] animate-pulse" />
                                  {project.missionNumber}
                                </span>
                                <span
                                  className={`badge-tag text-[10px] font-mono font-bold ${
                                    project.status === 'IN PROGRESS' ? 'badge-warning' : 'badge-success'
                                  }`}
                                >
                                  {project.status}
                                </span>
                              </div>

                              {/* Mission Title */}
                              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white group-hover:text-[#FF8F00] transition-colors mb-1.5 tracking-tight leading-snug">
                                {project.title}
                              </h3>

                              {/* Tagline */}
                              <p className="text-[11px] sm:text-xs text-gray-200 mb-2.5 sm:mb-3 font-sans leading-relaxed">
                                {project.tagline}
                              </p>

                              {/* Key Impact Stats Bar */}
                              {project.metrics && project.metrics.length > 0 && (
                                <div className="grid grid-cols-2 gap-2 mb-2.5 sm:mb-3 p-2 sm:p-2.5 rounded-xl bg-[#000000]/80 border border-[#FF8F00]/40 shadow-inner">
                                  {project.metrics.slice(0, 2).map((m, idx) => (
                                    <MissionMetricBox key={idx} number={m.number} caption={m.caption} />
                                  ))}
                                </div>
                              )}

                              {/* Technology Loadout Tags */}
                              <div className="mb-2 sm:mb-2.5">
                                <span className="font-mono text-[9px] sm:text-[10px] text-gray-300 block mb-1 uppercase tracking-wider font-bold">
                                  TECH ARSENAL
                                </span>
                                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                                  {project.technologyLoadout.slice(0, 5).map((tech, i) => (
                                    <span
                                      key={i}
                                      className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md bg-[#000000]/85 border border-white/15 text-gray-200 font-medium"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* View Mission Details Action Button */}
                            <button
                              type="button"
                              {...getUniversalAudioProps('openModal', 'hover', (e) => {
                                e.stopPropagation();
                                setSelectedProject(project);
                              })}
                              className="relative z-20 w-full mt-1.5 py-2.5 rounded-xl bg-[#FF8F00]/20 border border-[#FF8F00]/60 hover:bg-[#FF8F00]/35 hover:border-[#FF8F00] text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,143,0,0.2)]"
                            >
                              <span>INSPECT MISSION SPECIFICATION</span>
                              <ChevronRight className="w-4 h-4 text-[#FF8F00] group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Navigation Controls */}
                <div className="flex items-center justify-between w-full max-w-md mx-auto mt-2.5 sm:mt-3 px-4 z-20 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const prevIdx = (activeMissionIndex - 1 + PROJECTS.length) % PROJECTS.length;
                      playCyberSound('hover');
                      runFunctionBasedTween(prevIdx);
                    }}
                    className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-black/70 border border-[#FF8F00]/40 hover:border-[#FF8F00] hover:bg-[#FF8F00]/20 text-[#FF8F00] hover:text-white transition-all cursor-pointer flex items-center gap-1 font-mono text-xs shadow-[0_0_12px_rgba(255,143,0,0.2)]"
                    aria-label="Previous Mission"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">PREV</span>
                  </button>

                  {/* Dot Indicators */}
                  <div className="flex items-center gap-2">
                    {PROJECTS.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          playCyberSound('hover');
                          runFunctionBasedTween(idx);
                        }}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === activeMissionIndex
                            ? 'w-6 bg-[#FF8F00] shadow-[0_0_12px_#FF8F00]'
                            : 'w-2 bg-white/20 hover:bg-white/50'
                        }`}
                        aria-label={`Go to mission ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const nextIdx = (activeMissionIndex + 1) % PROJECTS.length;
                      playCyberSound('hover');
                      runFunctionBasedTween(nextIdx);
                    }}
                    className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-black/70 border border-[#FF8F00]/40 hover:border-[#FF8F00] hover:bg-[#FF8F00]/20 text-[#FF8F00] hover:text-white transition-all cursor-pointer flex items-center gap-1 font-mono text-xs shadow-[0_0_12px_rgba(255,143,0,0.2)]"
                    aria-label="Next Mission"
                  >
                    <span className="hidden sm:inline">NEXT</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Minimal Bottom Session Telemetry Footer */}
              <div className="relative z-20 w-full max-w-7xl mx-auto pt-3 border-t border-white/10 flex items-center justify-between text-gray-500 font-mono text-[10px] uppercase tracking-wider shrink-0">
                <span>DIMENSIONAL ARCHIVE // LEVEL 01</span>
                <span className="hidden sm:inline">USE EXIT WARP PORTAL OR [ESC] TO RETURN</span>
                <span>SYSTEMS SECURED</span>
              </div>
            </div>
          )}

          {/* STAGE 4: THREE.JS FULLSCREEN REVERSE WARP EJECTION */}
          {transitionState === 'EXIT_WARP' && (
            <DimensionalWarpCanvas mode="exit" onComplete={handleExitWarpComplete} />
          )}
        </div>,
        document.body
      )}

      {/* Mission Inspection Modal */}
      {selectedProject && createPortal(
        <div className="fixed inset-0 z-[10001] bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 font-sans animate-fadeIn" role="dialog" aria-modal="true" aria-labelledby="mission-modal-title">
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
