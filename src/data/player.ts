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
  status: "AVAILABLE FOR NEW PROJECTS",
  location: "EARTH",
  bio: "I build full-stack web apps, AI tools, and data systems that help businesses run smoother. I focus on clean code, practical solutions, and intuitive user experiences.",
  missionStatement: "Turning complex business problems into reliable, easy-to-use software that saves time and scales naturally.",
  stats: [
    { label: "System Design", score: 97, max: 100 },
    { label: "Problem Solving", score: 98, max: 100 },
    { label: "Full Stack Dev", score: 96, max: 100 },
    { label: "Code Quality", score: 95, max: 100 },
    { label: "Performance", score: 99, max: 100 }
  ],
  specializations: [
    "Full-Stack Web Development",
    "System Architecture & Design",
    "AI & Workflow Automation",
    "Data Analytics & Reporting",
    "Responsive UI/UX Development"
  ],
  philosophy: [
    { number: "01", title: "Clear Code First", text: "Focus on readable code and solid architecture rather than over-engineering." },
    { number: "02", title: "Solve Root Causes", text: "Look deeper than surface symptoms to fix underlying problems permanently." },
    { number: "03", title: "Clear Technical Context", text: "Explain technical choices through real project requirements, constraints, and results." },
    { number: "04", title: "Purposeful UI Design", text: "Keep interfaces clean and responsive so users can get work done without friction." },
    { number: "05", title: "Production Quality", text: "Prioritize stability, speed, accessibility, and type safety in every release." }
  ]
};
