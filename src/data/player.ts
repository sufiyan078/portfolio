export interface PlayerProfile {
  name: string;
  role: string;
  classTitle: string;
  level: number;
  xpCurrent: number;
  xpMax: number;
  status: string;
  location: string;
  bio: string;
  missionStatement: string;
  stats: { label: string; score: number; max: number }[];
  specializations: string[];
  philosophy: { number: string; title: string; text: string }[];
}

export const PLAYER_PROFILE: PlayerProfile = {
  name: "Sufiyan Ahmed",
  role: "Full Stack Software Engineer & System Architect",
  classTitle: "Level 99 Code Realm Architect",
  level: 99,
  xpCurrent: 98500,
  xpMax: 100000,
  status: "AVAILABLE FOR HIGH-IMPACT MISSIONS",
  location: "EARTH",
  bio: "Architecting resilient full-stack web applications, AI-driven workflows, and high-performance data systems. Driven by engineering clarity, rigorous problem-solving, and state-of-the-art visual experiences.",
  missionStatement: "Transforming complex business challenges into scalable, deterministic software systems through disciplined engineering and thoughtful UX.",
  stats: [
    { label: "System Design", score: 97, max: 100 },
    { label: "Problem Solving", score: 98, max: 100 },
    { label: "Full Stack Dev", score: 96, max: 100 },
    { label: "Code Quality", score: 95, max: 100 },
    { label: "Performance Ops", score: 99, max: 100 }
  ],
  specializations: [
    "Full-Stack Web Engineering",
    "Distributed System Design",
    "AI Agent & Workflow Integration",
    "High-Volume Data Analytics & Reporting",
    "Micro-Frontend & Glassmorphic UI Engineering"
  ],
  philosophy: [
    { number: "01", title: "Show Engineering", text: "Code speaks louder than assertions. Prove technical maturity through clear architecture and measurable outcomes." },
    { number: "02", title: "Show Problem Solving", text: "Don't just post final screenshots. Explain the root causes, constraints, trade-offs, and debug trajectories." },
    { number: "03", title: "Tell Technical Stories", text: "Every project follows a narrative: Problem → Constraints → Investigation → Solution → Result." },
    { number: "04", title: "Intentional Interactions", text: "UI motion should clarify hierarchy and status, never distract or delay user actions." },
    { number: "05", title: "Uncompromising Quality", text: "Production stability, type safety, performance, and accessibility come before aesthetic fluff." }
  ]
};
