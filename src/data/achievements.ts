export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'Product' | 'AI' | 'Analytics' | 'Engineering';
  date: string;
  rarity: 'Legendary' | 'Epic' | 'Rare';
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-01",
    title: "Reporting Engine Architect",
    description: "Architected a multi-format PDF and PowerPoint reporting engine with a shared report model for inventory analytics.",
    category: "Analytics",
    date: "2026",
    rarity: "Legendary"
  },
  {
    id: "ach-02",
    title: "AI Product Engineer",
    description: "Created CareerAI platform with Gemini Flash API, resume optimization, ATS scoring, and job matching workflows.",
    category: "AI",
    date: "2026",
    rarity: "Epic"
  },
  {
    id: "ach-03",
    title: "Audit Automation Engineer",
    description: "Built browser-based monthly inventory audit dashboards for GAS, automating Excel parsing and data normalization.",
    category: "Analytics",
    date: "2026",
    rarity: "Epic"
  },
  {
    id: "ach-04",
    title: "Data Validation Specialist",
    description: "Implemented deterministic business rule engines and reconciliation checks for complex Excel workbooks.",
    category: "Engineering",
    date: "2026",
    rarity: "Rare"
  },
  {
    id: "ach-05",
    title: "Production System Builder",
    description: "Engineered and deployed full-stack web applications with authentication, databases, and structured workflows.",
    category: "Product",
    date: "2026",
    rarity: "Rare"
  }
];
