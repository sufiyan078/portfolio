# Portfolio Context & Documentation Map

**Project Name:** Developer Portfolio — The Code Realm  
**Developer:** Sufiyan Ahmed — Full Stack Software Engineer & System Architect  
**Repository Location:** `c:\Users\Sufiyan Ahmed\OneDrive\Desktop\portfolio`  

---

## 📌 Executive Summary

**The Code Realm** is a game-inspired, high-performance developer portfolio platform designed to present technical maturity, problem-solving discipline, architectural decision-making, and production reliability.

Instead of presenting a traditional static resume, the application immerses visitors in a modern game-HUD operating system featuring interactive project missions, deep-dive boss battle post-mortems, categorized skill inventories, gamified achievements, a career roadmap quest log, an interactive command-line interface (CLI), and Web Audio API synthesized sound feedback.

---

## 📁 Documentation Suite Map

All project documentation is organized within `developer-portfolio/docs/`:

1. [01_Product_Requirements_Document.md](file:///c:/Users/Sufiyan%20Ahmed/OneDrive/Desktop/portfolio/developer-portfolio/docs/01_Product_Requirements_Document.md)  
   Comprehensive Product Requirements Document detailing vision, target audience, user journey, product philosophy, functional/non-functional requirements, and success metrics.

2. [02_System_Architecture.md](file:///c:/Users/Sufiyan%20Ahmed/OneDrive/Desktop/portfolio/developer-portfolio/docs/02_System_Architecture.md)  
   Technical system architecture document detailing technology choices (Vite, React 18, TypeScript, Tailwind/CSS, HTML5 Canvas, Web Audio API), directory layouts, component trees, and performance tuning strategies.

3. [03_UI_UX_Design_System.md](file:///c:/Users/Sufiyan%20Ahmed/OneDrive/Desktop/portfolio/developer-portfolio/docs/03_UI_UX_Design_System.md)  
   Visual design system specifying HSL neon color palettes, typography tokens (Orbitron, JetBrains Mono, Inter), glassmorphic container utilities, HUD brackets, CRT scanline overlays, and micro-animations.

4. [04_Content_Engine.md](file:///c:/Users/Sufiyan%20Ahmed/OneDrive/Desktop/portfolio/developer-portfolio/docs/04_Content_Engine.md)  
   Content strategy mapping project missions, architectural blueprint schemas, boss battle crisis breakdowns, skill inventory equipment, unlockable badges, and CLI command registries.

---

## 🛠️ Project Execution & Build Workflow

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Quick Commands

- **Install Dependencies**:
  ```bash
  npm install
  ```

- **Run Local Development Server**:
  ```bash
  npm run dev
  ```
  *(Dev server active at `http://localhost:5173/`)*

- **Run Production Build & TypeScript Check**:
  ```bash
  npm run build
  ```

- **Preview Production Bundle**:
  ```bash
  npm run preview
  ```

---

## 🎮 Core Interactive Features Summary

- ⚡ **Level 99 HUD & XP Bar**: Real-time XP tracking (`98,500 / 100,000 XP`) with status indicator.
- 🎨 **HTML5 Canvas Particle Matrix**: Mouse-nexus interactive particle grid running at 60 FPS.
- 🚀 **Mission Control & Architecture Modal**: Interactive project showcases with decoupled architectural node topology diagrams.
- ⚔️ **Boss Battles (Post-Mortems)**: Debugging breakdowns detailing symptoms, profiling, root causes, and performance stats deltas (*12.4s → 85ms*).
- 🛡️ **Developer Inventory Grid**: Skill equipment items sorted by category and RPG rarity (*Legendary*, *Epic*, *Rare*).
- 🏆 **Achievements & Quest Log Roadmap**: Gamified badges and chronological evolution timeline.
- 💻 **Interactive CLI Command Terminal**: Cyber command line modal with typewriter responses and synth audio feedback.
- ✉️ **Transmission Terminal**: Direct message form, one-click email copy, downloadable resume CTA, and social matrix links.
