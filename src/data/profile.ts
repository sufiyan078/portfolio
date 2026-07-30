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
  role: "Data Analyst",
  playerClass: "DATA",
  level: "LEVEL 99",
  status: "ONLINE",
  location: "EARTH",
  bio: "Building business software products that save time and automate workflows.",
  missionStatement: "Creating software products that transform manual processes into reliable, validated digital systems.",
  xpPercentage: 82,
  stats: [
    { label: "Analytical Tools (Excel, SQL, Python)", score: 96 },
    { label: "Data Visualization (Tableau, Power BI)", score: 95 },
    { label: "Data Libraries (Pandas, NumPy, Seaborn)", score: 94 },
    { label: "Machine Learning & Scikit-Learn", score: 90 },
    { label: "Problem Solving & Data Validation", score: 96 }
  ],
  specializations: [
    "Analytical Tools (Microsoft Excel, Python, PostgreSQL)",
    "Data Science Libraries (NumPy, Pandas, Matplotlib, Seaborn, Web Scraping, Scikit-Learn)",
    "Data Visualization Tools (Tableau, Power BI)",
    "Machine Learning & Predictive Modeling"
  ],
  philosophy: [
    { number: "01", title: "AI-Augmented Engineering", text: "Leverage AI copilots, LLMs, and intelligent automation as force multipliers — not replacements. The best engineers in 2026 don't just write code; they orchestrate AI to ship 10x faster." },
    { number: "02", title: "Systems Over Scripts", text: "Think in architectures, not files. Design modular, event-driven systems with clear contracts and boundaries that scale gracefully — because the next feature is always around the corner." },
    { number: "03", title: "Data is the Product", text: "In the age of AI, data pipelines are the backbone of every decision. Build deterministic, observable systems where every metric, report, and prediction can be trusted and traced." },
    { number: "04", title: "Ship Fast, Stay Sharp", text: "Velocity without quality is chaos. Deliver rapid iterations with CI/CD, type safety, and automated testing — because in 2026, the market doesn't wait and neither should your deploys." },
    { number: "05", title: "Human-Centered Impact", text: "Technology is only valuable when it transforms real workflows. Focus on building tools that empower users, eliminate friction, and create measurable business outcomes — not just cool demos." }
  ]
};

export const PLAYER_PROFILE = PROFILE;
