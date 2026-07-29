export interface Quest {
  id: string;
  period: string;
  title: string;
  role: string;
  questType: 'Main Quest' | 'Milestone';
  description: string;
  reward: string;
  status: 'COMPLETED' | 'IN PROGRESS';
}

export const QUEST_LOG: Quest[] = [
  {
    id: "quest-03",
    period: "2026",
    title: "Built Quarterly Inventory Analytics & Reporting Portal",
    role: "Full Stack Engineer & System Architect",
    questType: "Main Quest",
    description: "Engineered an Excel-driven inventory analytics platform with SheetJS parsing, business rule validation, KPI calculation, and a shared report model powering consistent dashboards, PDF, and PowerPoint exports.",
    reward: "Enterprise Reporting Engine & Multi-Format Export Architecture",
    status: "COMPLETED"
  },
  {
    id: "quest-02",
    period: "2026",
    title: "Created CareerAI — AI Career Assistant",
    role: "Full Stack Developer",
    questType: "Main Quest",
    description: "Built an AI-powered career platform with Gemini Flash API integration for resume generation, ATS optimization, cover letter creation, and job discovery through JSearch API — backed by Firebase Authentication, Database, and Billing.",
    reward: "AI Product Engineering & LLM Integration Experience",
    status: "COMPLETED"
  },
  {
    id: "quest-01",
    period: "2026",
    title: "Built Monthly Inventory Audit Dashboard",
    role: "Full Stack Developer",
    questType: "Main Quest",
    description: "Developed a browser-based audit visualization tool for GAS that converts uploaded monthly Excel inventory workbooks into interactive dashboards with Firebase Authentication, SheetJS parsing, data normalization, and KPI analytics.",
    reward: "Excel Processing & Audit Dashboard Engineering",
    status: "COMPLETED"
  }
];
