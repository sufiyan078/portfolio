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
    description: "Architecting full-stack web applications tailored to solve unique operational needs, internal workflows, and enterprise logic.",
    category: "Product",
    date: "2026",
    rarity: "Legendary",
    icon: "Rocket"
  },
  {
    id: "ach-02",
    title: "AI Agents & Automation",
    description: "Building intelligent AI assistants, LLM workflow integrations, custom prompt pipelines, and autonomous business bots.",
    category: "AI",
    date: "2026",
    rarity: "Legendary",
    icon: "Bot"
  },
  {
    id: "ach-03",
    title: "Executive Dashboards",
    description: "Designing real-time business command centers, executive KPI monitors, and interactive analytics visualization portals.",
    category: "Analytics",
    date: "2026",
    rarity: "Epic",
    icon: "BarChart3"
  },
  {
    id: "ach-04",
    title: "Workflow Automation",
    description: "Eliminating manual data entry, automating repetitive business processes, web scraping, and scheduled task pipelines.",
    category: "Engineering",
    date: "2026",
    rarity: "Epic",
    icon: "Cog"
  },
  {
    id: "ach-05",
    title: "Reporting Systems",
    description: "Engineering automated multi-format PDF & Excel report engines for instant executive insights and data exports.",
    category: "Analytics",
    date: "2026",
    rarity: "Epic",
    icon: "TrendingUp"
  },
  {
    id: "ach-06",
    title: "API Integrations",
    description: "Connecting multi-app software ecosystems, third-party REST/GraphQL APIs, webhooks, and real-time database sync.",
    category: "Engineering",
    date: "2026",
    rarity: "Rare",
    icon: "Link"
  },
  {
    id: "ach-07",
    title: "Production Deployments",
    description: "Deploying high-reliability, cloud-backed web platforms on Vercel, Docker, GitHub CI/CD, and fast production servers.",
    category: "Engineering",
    date: "2026",
    rarity: "Rare",
    icon: "Globe"
  },
  {
    id: "ach-08",
    title: "End-to-End Ownership",
    description: "Managing complete software development lifecycles from architecture design and coding to cloud deployment and ongoing maintenance.",
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
