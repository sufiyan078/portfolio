# UI/UX Design System Specification

**Project Name:** Developer Portfolio — The Code Realm  
**Design Paradigm:** Premium Game HUD / Cyberpunk Glassmorphic Operating System  
**Core Objective:** Deliver a high-tech visual impression while maintaining exceptional usability and readability.  

---

## 1. Color Palette Tokens

The color design system uses curated HSL neon accents set against a deep-space dark background:

```
┌────────────────────────────────────────────────────────────────────────┐
│ PRIMARY COLOR PALETTE TOKENS                                           │
├────────────────────────────────────────────────────────────────────────┤
│ --bg-dark          │ #080b14  │ Deep Space Void Background             │
│ --bg-card          │ #0d1322  │ Glassmorphic Card Surface (0.75 alpha)  │
│ --color-cyan       │ #00f3ff  │ Cyber Cyan Accent & Rare Badge Tag     │
│ --color-[#00ff9d]  │ #00ff9d  │ Matrix Emerald & Success Indicator     │
│ --color-purple     │ #b026ff  │ Synth Purple Accent & Epic Badge Tag   │
│ --color-gold       │ #ffd700  │ Legendary Gold & Level Badge Tag       │
│ --color-crimson    │ #ff2a6d  │ Threat Level & Crisis Alert Border     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Typography System

- **Primary Headings (`font-orbitron`)**: `'Orbitron', sans-serif`  
  Used for section headers, level badges, mission codes, and button labels. Expresses high-tech precision.
- **Code & Metadata (`font-mono`)**: `'JetBrains Mono', monospace`  
  Used for stats, terminal outputs, tech stack pills, and debug logs. Expresses developer authenticity.
- **Body & Prose (`font-sans`)**: `'Inter', sans-serif`  
  Used for summaries, philosophy text, project descriptions, and challenge details. Guarantees maximum legibility.

---

## 3. Custom Glassmorphism & Cyber Elements

### 3.1 Cyber Glass Cards (`.cyber-card`)
- `background: rgba(13, 19, 34, 0.75)`
- `backdrop-filter: blur(12px)`
- `border: 1px solid rgba(0, 243, 255, 0.18)`
- `hover: border-color: rgba(0, 243, 255, 0.4)`
- `hover: box-shadow: 0 8px 32px rgba(0, 243, 255, 0.12)`

### 3.2 HUD Corner Brackets (`.hud-corner`)
Each cyber card is decorated with 10px corner brackets that illuminate upon hover:
- Top-Left: `border-top`, `border-left`
- Top-Right: `border-top`, `border-right`
- Bottom-Left: `border-bottom`, `border-left`
- Bottom-Right: `border-bottom`, `border-right`

### 3.3 CRT Scanline Overlay (`.scanlines`)
Fixed full-viewport overlay rendering subtle 4px CRT scanline lines (`opacity: 0.3`) for retro-futuristic depth without obscuring text.

---

## 4. Equipment Rarity System

Skills and Achievements are visually classified using RPG-style color codes:

- **Legendary**: `#ffd700` Gold (`bg-[#ffd700]/10 border-[#ffd700]/40`)
- **Epic**: `#b026ff` Purple (`bg-[#b026ff]/10 border-[#b026ff]/40`)
- **Rare**: `#00f3ff` Cyan (`bg-[#00f3ff]/10 border-[#00f3ff]/40`)

---

## 5. Micro-Interactions & Motion Principles

1. **Non-Distractive Motion**: Animations enhance visual hierarchy without delaying navigation.
2. **Glow Pulse Effects**: Active status badges pulse using keyframe glow animations.
3. **Hover Feedback**: Cards elevate subtly (`transform: translateY(-2px)`) with glowing border transitions.
4. **Audio Feedback**: Interactive clicks, tab switches, and modal toggles produce subtle synthesized audio chimes.
