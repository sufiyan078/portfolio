export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'Product' | 'AI' | 'Analytics' | 'Engineering';
  date: string;
  rarity: 'Legendary' | 'Epic' | 'Rare';
  icon: string;
}

export interface ClientReward {
  id: string;
  label: string;
  icon: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-01",
    title: "Custom Business Applications",
    description: "Building custom full-stack web applications tailored to solve specific business needs and streamline internal workflows.",
    category: "Product",
    date: "2026",
    rarity: "Legendary",
    icon: "Rocket"
  },
  {
    id: "ach-02",
    title: "AI Agents & Automation",
    description: "Integrating AI tools, custom prompt workflows, and automated assistants into business systems.",
    category: "AI",
    date: "2026",
    rarity: "Legendary",
    icon: "Bot"
  },
  {
    id: "ach-03",
    title: "Executive Dashboards",
    description: "Building clear business dashboards and interactive analytics portals to track key performance metrics.",
    category: "Analytics",
    date: "2026",
    rarity: "Epic",
    icon: "BarChart3"
  },
  {
    id: "ach-04",
    title: "Workflow Automation",
    description: "Eliminating manual data entry by automating repetitive tasks, web scraping, and scheduled workflows.",
    category: "Engineering",
    date: "2026",
    rarity: "Epic",
    icon: "Cog"
  },
  {
    id: "ach-05",
    title: "Reporting Systems",
    description: "Building automated PDF and Excel report generation tools for fast data exports and executive reviews.",
    category: "Analytics",
    date: "2026",
    rarity: "Epic",
    icon: "TrendingUp"
  },
  {
    id: "ach-06",
    title: "API Integrations",
    description: "Connecting software systems through REST/GraphQL APIs, webhooks, and database synchronization.",
    category: "Engineering",
    date: "2026",
    rarity: "Rare",
    icon: "Link"
  },
  {
    id: "ach-07",
    title: "Production Deployments",
    description: "Deploying web platforms to reliable production environments using Vercel, Firebase, Docker, and CI/CD pipelines.",
    category: "Engineering",
    date: "2026",
    rarity: "Rare",
    icon: "Globe"
  },
  {
    id: "ach-08",
    title: "End-to-End Ownership",
    description: "Managing the entire development process—from system design and coding to cloud deployment and ongoing support.",
    category: "Product",
    date: "2026",
    rarity: "Rare",
    icon: "Wrench"
  }
];

export const CLIENT_REWARDS: ClientReward[] = [
  { id: "rew-1", label: "Save Time", icon: "Clock" },
  { id: "rew-2", label: "Save Money", icon: "Coins" },
  { id: "rew-3", label: "Better Visibility", icon: "Eye" },
  { id: "rew-4", label: "Automation", icon: "Bot" },
  { id: "rew-5", label: "Faster Workflows", icon: "Speedometer" },
  { id: "rew-6", label: "Actionable Insights", icon: "BarChart3" }
];
