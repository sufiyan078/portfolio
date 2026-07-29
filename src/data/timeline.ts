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
    title: "Built Monthly Inventory Audit Dashboard",
    role: "Full Stack Engineer & System Architect",
    questType: "Main Quest",
    description: "Architected a rule-driven analytics platform that transforms quarterly Excel inventory datasets into validated dashboards and multi-format reports.",
    reward: "Enterprise Reporting Engine Experience",
    status: "COMPLETED"
  },
  {
    id: "quest-02",
    period: "2025",
    title: "Created CareerAI Platform",
    role: "Full Stack Developer",
    questType: "Main Quest",
    description: "Engineered an AI-powered career assistant with Gemini LLM integration, resume optimization, and cover letter generation workflows.",
    reward: "AI Product Builder Experience",
    status: "COMPLETED"
  },
  {
    id: "quest-01",
    period: "2024",
    title: "Built Quarterly Analysis with report generation",
    role: "Full Stack Developer",
    questType: "Milestone",
    description: "Transformed raw operational inventory metrics into clear interactive dashboards and business analytics visualizations.",
    reward: "Data Visualization & Dashboard Analytics Experience",
    status: "COMPLETED"
  }
];
