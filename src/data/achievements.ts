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
    title: "Reporting Engine Creator",
    description: "Architected a multi-format PDF and PowerPoint reporting engine with 100% data parity.",
    category: "Analytics",
    date: "2026",
    rarity: "Legendary"
  },
  {
    id: "ach-02",
    title: "AI Product Builder",
    description: "Created CareerAI platform with real-time streaming LLM resume optimization workflows.",
    category: "AI",
    date: "2025",
    rarity: "Epic"
  },
  {
    id: "ach-03",
    title: "Analytics Engineer",
    description: "Built rule-driven inventory analytics platforms transforming manual spreadsheets into dashboards.",
    category: "Analytics",
    date: "2026",
    rarity: "Epic"
  },
  {
    id: "ach-04",
    title: "Problem Solver",
    description: "Resolved complex data calculation bugs and verification accuracy edge cases.",
    category: "Engineering",
    date: "2026",
    rarity: "Rare"
  },
  {
    id: "ach-05",
    title: "First Production Application",
    description: "Built and deployed complete production software applications.",
    category: "Product",
    date: "2024",
    rarity: "Rare"
  }
];
