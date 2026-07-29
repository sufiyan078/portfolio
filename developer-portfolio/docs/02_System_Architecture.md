# System Architecture Document

**Project Name:** Developer Portfolio — The Code Realm  
**Version:** 1.0  
**Stack:** React 18, TypeScript, Vite, Tailwind CSS, HTML5 Canvas, Web Audio API  

---

## 1. High-Level Architecture Overview

The Code Realm is architected as a lightweight, high-performance Single Page Application (SPA) designed to deliver instant page loads, smooth 60 FPS visual rendering, and zero server round-trip latency for content navigation.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BROWSER VIEWPORT LAYER                          │
├────────────────────────────────────────────────────────────────────────┤
│  BackgroundCanvas   │    HUDHeader    │ Scanlines Overlay (CRT FX)     │
├────────────────────────────────────────────────────────────────────────┤
│                          CORE SECTION COMPONENTS                       │
│  LandingHero → PlayerProfile → MissionControl → BossBattles            │
│  → InventorySkills → Achievements → QuestLog → ContactSection          │
├────────────────────────────────────────────────────────────────────────┤
│                       INTERACTIVE OVERLAY MODALS                       │
│  ArchitecturalBlueprintModal (Missions) │ InteractiveCLIModal (Terminal) │
├────────────────────────────────────────────────────────────────────────┤
│                        DATA & UTILITY ENGINE                           │
│  portfolioData.ts (Typed Models) │ soundEffects.ts (Web Audio API Synth)│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Technology Stack

- **Build Engine & Bundler**: `Vite` (Lightning-fast HMR, ESBuild compilation, optimized production bundling).
- **UI Engine**: `React 18` (Component-driven UI, functional hooks, strict state immutability).
- **Type Safety**: `TypeScript 5+` (Strict type definitions for projects, boss battles, inventory skills, achievements, and quest timelines).
- **Styling & Cyber Design System**: Custom Glassmorphic CSS + Tailwind tokens (Neon HSL variables, scanline keyframes, HUD bracket utilities).
- **Iconography**: `lucide-react` + SVG vector icons.
- **Audio Engine**: Custom `soundEffects.ts` leveraging native browser `Web Audio API` (Zero external audio asset dependency).
- **Graphics Engine**: HTML5 Canvas 2D Context particle nexus animation loop (`requestAnimationFrame`).

---

## 3. Directory & File Structure

```
portfolio/
├── developer-portfolio/
│   ├── docs/
│   │   ├── 01_Product_Requirements_Document.md
│   │   ├── 02_System_Architecture.md
│   │   ├── 03_UI_UX_Design_System.md
│   │   └── 04_Content_Engine.md
│   └── portfolio-context.md
├── src/
│   ├── components/
│   │   ├── AchievementsSection.tsx
│   │   ├── BackgroundCanvas.tsx
│   │   ├── BossBattlesSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── HUDHeader.tsx
│   │   ├── InteractiveTerminalModal.tsx
│   │   ├── InventorySkillsSection.tsx
│   │   ├── LandingHero.tsx
│   │   ├── MissionControlSection.tsx
│   │   ├── PlayerProfileSection.tsx
│   │   └── QuestLogSection.tsx
│   ├── data/
│   │   └── portfolioData.ts
│   ├── utils/
│   │   └── soundEffects.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.ts
```

---

## 4. Component Tree & Responsibility Matrix

| Component | Layer / Scope | Primary Responsibility |
|---|---|---|
| `App.tsx` | Root Shell | Coordinates section visibility, active scroll tracking, and modal states. |
| `BackgroundCanvas.tsx` | Canvas Engine | Renders 60 FPS cyber particle grid & mouse nexus interaction loops. |
| `HUDHeader.tsx` | Top Navigation | Level 99 badge, sound FX toggle, CLI launcher button, status indicator, mobile drawer. |
| `LandingHero.tsx` | Hero View | XP progress bar, player title, status HUD, and "Press Start" CTA trigger. |
| `PlayerProfileSection.tsx` | Character Sheet | Attribute stat bars, specializations checklist, and 5 engineering philosophy cards. |
| `MissionControlSection.tsx` | Project Showcase | Mission cards with architectural blueprint modal, challenges, tech stack, and live URLs. |
| `BossBattlesSection.tsx` | Post-Mortems | Collapsible engineering crisis breakdowns, threat levels, root causes, and stat deltas. |
| `InventorySkillsSection.tsx` | Equipment Grid | Skill items grouped by category with color-coded rarities (*Legendary*, *Epic*, *Rare*). |
| `AchievementsSection.tsx` | Gamified Badges | Recognized performance and speed benchmark awards. |
| `QuestLogSection.tsx` | Growth Roadmap | Interactive timeline mapping evolution path and unlocked abilities. |
| `ContactSection.tsx` | Transmission Terminal | Contact dispatch form, one-click email copy, downloadable resume, social handles. |
| `InteractiveTerminalModal.tsx` | Cyber CLI | Command line interface processing interactive commands (`help`, `whoami`, `projects`, `skills`, `boss`, `contact`, `sudo hire`, `clear`). |

---

## 5. Web Audio API Sound Generation

To guarantee 100% audio loading reliability with zero external MP3/WAV network dependencies, audio feedback is generated synthetically via `AudioContext`:

- `click`: Exponential sine wave frequency drop (800Hz → 400Hz over 50ms).
- `hover`: Short triangle wave chime (520Hz over 30ms).
- `openModal`: Ascending sawtooth sweep (300Hz → 900Hz over 120ms).
- `closeModal`: Descending sine sweep (700Hz → 250Hz over 80ms).
- `levelUp`: Quad-tone synth chord cascade (523Hz, 659Hz, 783Hz, 1046Hz).
- `terminal`: Random square wave click generator (900-1100Hz over 20ms).
- `bossBattle`: Low-frequency sawtooth threat rumble (150Hz → 450Hz over 250ms).

---

## 6. Performance & Optimizations

1. **Canvas Frame Management**: Canvas render loop automatically adjusts particle count based on screen width (`Math.min(width / 18, 70)`) and cancels `requestAnimationFrame` on unmount.
2. **CSS Hardware Acceleration**: Animations utilize `transform: translate3d()` and `opacity` to run exclusively on the GPU compositor thread.
3. **DOM Virtualization Readiness**: Data models prepared for virtualized rendering on large data grids.
4. **Zero Layout Shifts (CLS)**: Pre-defined container dimensions prevent structural reflow during dynamic modal openings.
