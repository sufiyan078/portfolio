// ─── Builder Profile ────────────────────────────────────────
export interface BuilderProfile {
  name: string;
  playerClass: string;
  roles: string[];
  level: string;
  status: string;
  location: string;
}

export const BUILDER_PROFILE: BuilderProfile = {
  name: "Sufiyan Ahmed",
  playerClass: "BUILDER",
  roles: [
    "Full Stack Software Engineer",
    "AI Product Builder",
    "Automation Engineer"
  ],
  level: "LEVEL 99",
  status: "ONLINE",
  location: "EARTH"
};

// ─── Development Process (RPG Skill Tree) ───────────────────
export interface ProcessStage {
  id: string;
  label: string;
  icon: string;       // Lucide icon name
  description: string;
}

export const DEV_PROCESS: ProcessStage[] = [
  {
    id: "discovery",
    label: "DISCOVERY",
    icon: "Search",
    description: "Understand the business problem, user needs, and success criteria before writing a single line of code."
  },
  {
    id: "architecture",
    label: "ARCHITECTURE",
    icon: "Layers",
    description: "Design the system structure, data models, and technical stack for reliability and scalability."
  },
  {
    id: "rapid-dev",
    label: "RAPID DEVELOPMENT",
    icon: "Zap",
    description: "Build features iteratively using AI-accelerated workflows to deliver working software fast."
  },
  {
    id: "testing",
    label: "TESTING & VALIDATION",
    icon: "ShieldCheck",
    description: "Validate every feature against requirements with automated tests and manual review."
  },
  {
    id: "deployment",
    label: "DEPLOYMENT",
    icon: "Rocket",
    description: "Ship to production with CI/CD pipelines, monitoring, and zero-downtime releases."
  },
  {
    id: "support",
    label: "ONGOING SUPPORT",
    icon: "HeartHandshake",
    description: "Provide maintenance, feature iterations, and technical support after launch."
  }
];

// ─── How I Can Help Your Business ───────────────────────────
export interface HelpBusinessItem {
  id: string;
  question: string;
  answer: string;
}

export const BUSINESS_HELP_ITEMS: HelpBusinessItem[] = [
  {
    id: 'dashboard',
    question: "Need a business dashboard?",
    answer: "I'll build one."
  },
  {
    id: 'automate',
    question: "Need to automate repetitive work?",
    answer: "I'll automate it."
  },
  {
    id: 'ai-workflow',
    question: "Need AI integrated into your workflow?",
    answer: "I'll build it."
  },
  {
    id: 'internal-app',
    question: "Need an internal web application?",
    answer: "I'll develop it."
  },
  {
    id: 'reports',
    question: "Need reports generated automatically?",
    answer: "I'll handle it."
  },
  {
    id: 'saas-mvp',
    question: "Need a complete SaaS MVP?",
    answer: "Let's build it."
  }
];

// ─── Why Clients Choose Me ──────────────────────────────────
export interface ClientCard {
  id: string;
  title: string;
  description: string;
  icon: string;       // Lucide icon name
}

export const CLIENT_REASONS: ClientCard[] = [
  {
    id: "business-first",
    title: "Business-First Approach",
    icon: "Target",
    description: "I focus on solving business problems rather than writing unnecessary code. Every feature serves a purpose."
  },
  {
    id: "ai-accelerated",
    title: "AI-Accelerated Development",
    icon: "Bot",
    description: "I leverage Google Antigravity and modern AI tooling to deliver faster without sacrificing quality."
  },
  {
    id: "production-ready",
    title: "Production Ready",
    icon: "ShieldCheck",
    description: "Projects include authentication, validation, scalability, and maintainable architecture from day one."
  },
  {
    id: "transparent-comms",
    title: "Transparent Communication",
    icon: "MessageSquare",
    description: "Clients always know project status, milestones, and next steps. No surprises, no black boxes."
  },
  {
    id: "clean-ux",
    title: "Clean User Experience",
    icon: "Sparkles",
    description: "Every interface is designed for usability, clarity, and performance. Software people actually want to use."
  },
  {
    id: "long-term",
    title: "Long-Term Thinking",
    icon: "TrendingUp",
    description: "Software should be easy to maintain and evolve. I build systems you won't need to throw away in six months."
  },
  {
    id: "structured-process",
    title: "Structured Process",
    icon: "GitBranch",
    description: "Discovery, architecture, development, testing, deployment, support — every project follows a proven workflow."
  },
  {
    id: "full-ownership",
    title: "Full Ownership",
    icon: "Crown",
    description: "From database design to frontend polish, I handle the entire stack. One point of contact, full accountability."
  }
];

// ─── Legacy exports for backward compat ─────────────────────
// (Some other components may still import PROFILE)
export interface Profile {
  name: string;
  role: string;
  playerClass: string;
  level: string;
  status: string;
  location: string;
  bio: string;
  missionStatement: string;
  xpPercentage: number;
  stats: { label: string; score: number }[];
  specializations: string[];
  philosophy: { number: string; title: string; text: string }[];
}

export const PROFILE: Profile = {
  name: "Sufiyan Ahmed",
  role: "Software Engineer",
  playerClass: "BUILDER",
  level: "LEVEL 99",
  status: "ONLINE",
  location: "EARTH",
  bio: "Building business software products that save time and automate workflows.",
  missionStatement: "Creating software products that transform manual processes into reliable, validated digital systems.",
  xpPercentage: 82,
  stats: [],
  specializations: [],
  philosophy: []
};

export const PLAYER_PROFILE = PROFILE;
