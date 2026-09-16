import type { SVGProps } from 'react';
export { ArrowUp, ArrowRight, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, X, CornerDownLeft,
  Volume2, VolumeX, Menu, Heart, ExternalLink, Check, CheckCircle2, Copy, AlertCircle, AlertTriangle } from 'lucide-react';

type Kind = 'data' | 'network' | 'database' | 'automation' | 'ai' | 'architecture' | 'web' | 'security' | 'cloud' | 'search' | 'message' | 'award' | 'time' | 'inventory' | 'combat';
const drawings: Record<Kind, { body: string; signal: string }> = {
  data: { body: 'M3 3v18h19M7 17v-5h3v5m3 0V8h3v9m3 0V5h3v12', signal: 'M4 9l5-3 5 1 7-5' },
  network: { body: 'M9 3h6v5H9zM2 16h6v5H2zm14 0h6v5h-6zM12 8v5M5 16v-3h14v3', signal: 'M5 13h14M12 8v5' },
  database: { body: 'M4 6C4 2 20 2 20 6v12c0 4-16 4-16 0ZM4 6c0 4 16 4 16 0M4 12c0 4 16 4 16 0', signal: 'M7 17h3m4 0h3M7 11h3m4 0h3' },
  automation: { body: 'M3 18h18v3H3zM6 18v-7l5-5 3 3-5 5v4M10 5l3-3 6 6-3 3M18 8l3 3-2 3M4 11h5', signal: 'M4 19h3m3 0h3m3 0h3M13 5l3 3' },
  ai: { body: 'M8 4h8l4 5v7l-4 4H8l-4-4V9ZM8 4v6l4 3 4-3V4M4 15l8-2 8 2M8 20l4-7 4 7', signal: 'M8 10h.1M16 10h.1M12 13h.1M4 15h.1M20 15h.1' },
  architecture: { body: 'M12 2L2 7l10 5 10-5ZM2 12l10 5 10-5M2 17l10 5 10-5M12 12v10', signal: 'M2 7l10 5 10-5M12 2v5' },
  web: { body: 'M2 4h20v16H2ZM2 8h20M5 6h.1M8 6h.1M11 6h.1M8 11l-3 3 3 3m8-6 3 3-3 3', signal: 'M13 11l-2 6M4 22h16' },
  security: { body: 'M12 2l9 4v6c0 6-9 10-9 10S3 18 3 12V6ZM8 11V9a4 4 0 018 0v2M7 11h10v6H7Z', signal: 'M12 13v2M6 6l6-2 6 2' },
  cloud: { body: 'M5 16a5 5 0 010-10 7 7 0 0113-1 5.5 5.5 0 013 11M7 19h10v3H7Z', signal: 'M12 18V8m-4 4 4-4 4 4M10 20h4' },
  search: { body: 'M16 16l6 6M18 10a8 8 0 11-16 0 8 8 0 0116 0ZM6 10h8M10 6v8', signal: 'M4 7a7 7 0 016-4' },
  message: { body: 'M2 5h20v14H2ZM2 5l10 8L22 5M3 18l5-5m13 5-5-5', signal: 'M8 2h8M8 22h8' },
  award: { body: 'M7 3h10v7a5 5 0 01-10 0ZM7 5H3v4l4 3m10-7h4v4l-4 3M12 15v5M7 22h10', signal: 'M12 5l1 2 2 1-2 1-1 2-1-2-2-1 2-1Z' },
  time: { body: 'M7 2h10M12 2v3M20 6l2-2M21 13a9 9 0 11-18 0 9 9 0 0118 0Z', signal: 'M12 7v6l4 2M5 13h1m12 0h1' },
  inventory: { body: 'M3 7l9-5 9 5v13H3ZM3 7h18M7 7V5m10 2V5M8 12h8v5H8Z', signal: 'M10 14h4M6 20v2m12-2v2' },
  combat: { body: 'M3 2l5 2 12 15-2 2L4 7ZM21 2l-5 2-5 6m-2 4-5 5 2 2 5-6M2 16l6 6m8-6 6 6', signal: 'M5 4l4 4m10-4-4 4' },
};
const variants = {
  target: { body: 'M20 12a8 8 0 11-8-8M16 12a4 4 0 11-4-4M12 12l9-9m-5 0h5v5', signal: 'M12 10v4m-2-2h4' },
  compass: { body: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0ZM16 8l-3 5-5 3 3-5ZM12 1v3m0 16v3M1 12h3m16 0h3', signal: 'M11 11l2 2M12 5h.1' },
  eye: { body: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12ZM16 12a4 4 0 11-8 0 4 4 0 018 0Z', signal: 'M12 10v4m-2-2h4' },
  coins: { body: 'M15 8a6 6 0 11-12 0 6 6 0 0112 0ZM14 8a6 6 0 117 7M9 14v3c0 4 12 4 12 0v-5M9 17v3c0 4 12 4 12 0v-3', signal: 'M7 6h3M7 8h3M8 5v6' },
  support: { body: 'M2 8l4-3 4 2 4-2 8 4-4 10-5 3-7-5ZM6 5l3 8 4-3 4 2M18 19l-5-5', signal: 'M12 3l-1-1m4 1 1-1M5 18l2-1' },
  bug: { body: 'M8 8V6a4 4 0 018 0v2M6 8h12v7a6 6 0 01-12 0ZM3 6l3 4m12 0 3-4M2 14h4m12 0h4M3 22l4-4m10 0 4 4', signal: 'M12 9v10M9 5h6' },
  gift: { body: 'M3 9h18v4H3ZM5 13v9h14v-9M12 9v13M12 9C1 9 4 1 8 3l4 6Zm0 0c11 0 8-8 4-6l-4 6Z', signal: 'M12 13v9M4 11h16' },
  flag: { body: 'M4 22V2l8 2 8-2v11l-8 2-8-2', signal: 'M7 6l5 1 5-1M7 10l5 1 5-1' },
  crown: { body: 'M3 6l5 4 4-7 4 7 5-4-2 14H5ZM5 17h14', signal: 'M8 13h.1m4-3h.1m4 3h.1' },
};
function SemanticIcon({ kind, variant, className = '', ...props }: SVGProps<SVGSVGElement> & { kind: Kind; variant?: keyof typeof variants }) {
    const drawing = variant ? variants[variant] : drawings[kind];
    return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}
      className={`realm-semantic-icon ${className}`} data-icon-kind={kind}>
      <path d={drawing.body} opacity=".85" />
      <path className="realm-icon-signal" d={drawing.signal} strokeWidth={kind === 'ai' ? 3 : 1.7} />
    </svg>;
}
export function BarChart3(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="data" {...props} />; }
export function TrendingUp(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="data" {...props} />; }
export function Activity(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="data" {...props} />; }
export function Gauge(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="data" {...props} />; }
export function Link(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="network" {...props} />; }
export function GitBranch(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="network" {...props} />; }
export function Workflow(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="automation" {...props} />; }
export function Database(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="database" {...props} />; }
export function Server(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="database" {...props} />; }
export function Cpu(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="ai" {...props} />; }
export function Bot(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="ai" {...props} />; }
export function Wrench(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="automation" {...props} />; }
export function Cog(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="automation" {...props} />; }
export function Zap(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="automation" {...props} />; }
export function Layers(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="architecture" {...props} />; }
export function Layout(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="web" {...props} />; }
export function FileCode2(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="web" {...props} />; }
export function Terminal(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="web" {...props} />; }
export function Globe(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="web" {...props} />; }
export function ShieldCheck(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="security" {...props} />; }
export function Rocket(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="cloud" {...props} />; }
export function Search(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="search" {...props} />; }
export function Target(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="search" variant="target" {...props} />; }
export function Crosshair(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="search" variant="target" {...props} />; }
export function Eye(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="search" variant="eye" {...props} />; }
export function Compass(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="search" variant="compass" {...props} />; }
export function Mail(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="message" {...props} />; }
export function MessageSquare(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="message" {...props} />; }
export function Send(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="message" {...props} />; }
export function HeartHandshake(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="message" variant="support" {...props} />; }
export function Trophy(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="award" {...props} />; }
export function Award(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="award" {...props} />; }
export function Crown(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="award" variant="crown" {...props} />; }
export function Gift(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="award" variant="gift" {...props} />; }
export function Coins(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="award" variant="coins" {...props} />; }
export function Sparkles(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="award" {...props} />; }
export function Flag(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="award" variant="flag" {...props} />; }
export function Timer(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="time" {...props} />; }
export function Clock(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="time" {...props} />; }
export function Package(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="inventory" {...props} />; }
export function PackageOpen(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="inventory" {...props} />; }
export function Box(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="inventory" {...props} />; }
export function Bug(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="automation" variant="bug" {...props} />; }
export function Swords(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="combat" {...props} />; }
export function Lightbulb(props: SVGProps<SVGSVGElement>) { return <SemanticIcon kind="ai" {...props} />; }
