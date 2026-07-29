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
  bio: "A data analyst who builds practical software products that solve real-world problems through thoughtful engineering and clean architecture.",
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
    { number: "01", title: "Problem Solving First", text: "Understand the actual business problem thoroughly before designing a technical solution." },
    { number: "02", title: "System Thinking", text: "Design applications with modular architecture, clear boundaries, maintainability, and scalability." },
    { number: "03", title: "Data Accuracy", text: "Build deterministic systems where output metrics and reports can be verifiably trusted." },
    { number: "04", title: "Product Mindset", text: "Focus on user workflow improvements, operational clarity, and tangible real-world impact." },
    { number: "05", title: "Engineering Quality", text: "Prioritize clean code, single sources of truth, type safety, and responsive user experience." }
  ]
};

export const PLAYER_PROFILE = PROFILE;
