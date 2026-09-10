export interface InventoryCategoryCard {
  id: string;
  name: string;
  categoryName: string;
  emoji: string;
  badgeColor: string;
  borderColor: string;
  textColor: string;
  bgColor: string;
  glowColor: string;
  dotBgColor: string;
  cardBg: string;
  rarity: 'LEGENDARY' | 'EPIC' | 'RARE' | 'MYTHIC';
  description: string;
  techList: string[];
  projectsUsed: string[];
  iconName: string;
}

export const INVENTORY_CATEGORIES: InventoryCategoryCard[] = [
  {
    id: "inv-ai",
    name: "AI & Intelligent Systems",
    categoryName: "AI",
    emoji: "🟩",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.35)]",
    borderColor: "border-emerald-500/50 hover:border-emerald-400",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-500/15",
    glowColor: "rgba(16, 185, 129, 0.25)",
    dotBgColor: "bg-emerald-400",
    cardBg: "from-emerald-950/40 via-[#1F150C]/90 to-[#0A160F]/95",
    rarity: "LEGENDARY",
    description: "Custom AI agents, LLM integration, prompt engineering, RAG pipelines, and automated intelligence.",
    techList: ["Gemini", "OpenAI", "Claude", "Vertex AI", "Hugging Face", "LangChain"],
    projectsUsed: ["AI Agents & Automation", "CareerAI Assistant", "Smart Workflows"],
    iconName: "Bot"
  },
  {
    id: "inv-frontend",
    name: "Frontend Engineering",
    categoryName: "Frontend",
    emoji: "🟦",
    badgeColor: "bg-sky-500/20 text-sky-400 border-sky-500/60 shadow-[0_0_12px_rgba(14,165,233,0.35)]",
    borderColor: "border-sky-500/50 hover:border-sky-400",
    textColor: "text-sky-400",
    bgColor: "bg-sky-500/15",
    glowColor: "rgba(14, 165, 233, 0.25)",
    dotBgColor: "bg-sky-400",
    cardBg: "from-sky-950/40 via-[#1F150C]/90 to-[#07131D]/95",
    rarity: "LEGENDARY",
    description: "High-performance web apps, interactive client dashboards, pixel-perfect UI/UX, and modern web software.",
    techList: ["React", "Next.js", "Tailwind CSS", "TypeScript", "HTML5 / CSS3", "Zustand & Redux"],
    projectsUsed: ["Websites & Landing Pages", "Audit Dashboards", "SaaS MVPs"],
    iconName: "Layout"
  },
  {
    id: "inv-backend",
    name: "Backend & Cloud Databases",
    categoryName: "Backend",
    emoji: "🟥",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/60 shadow-[0_0_12px_rgba(244,63,94,0.35)]",
    borderColor: "border-rose-500/50 hover:border-rose-400",
    textColor: "text-rose-400",
    bgColor: "bg-rose-500/15",
    glowColor: "rgba(244, 63, 94, 0.25)",
    dotBgColor: "bg-rose-400",
    cardBg: "from-rose-950/40 via-[#1F150C]/90 to-[#1D080E]/95",
    rarity: "LEGENDARY",
    description: "Scalable backend microservices, real-time databases, serverless APIs, authentication, and SQL schema design.",
    techList: ["Firebase", "Supabase", "Node.js", "PostgreSQL", "Express", "REST & GraphQL"],
    projectsUsed: ["Custom Web Applications", "User Auth Systems", "Database Schemas"],
    iconName: "Server"
  },
  {
    id: "inv-automation",
    name: "Workflow & Automation",
    categoryName: "Automation",
    emoji: "🟧",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.35)]",
    borderColor: "border-amber-500/50 hover:border-amber-400",
    textColor: "text-amber-400",
    bgColor: "bg-amber-500/15",
    glowColor: "rgba(245, 158, 11, 0.25)",
    dotBgColor: "bg-amber-400",
    cardBg: "from-amber-950/40 via-[#1F150C]/90 to-[#180E04]/95",
    rarity: "EPIC",
    description: "End-to-end business process automation, browser automation, web scraping, and API webhook integrations.",
    techList: ["n8n", "Google Apps Script", "Zapier", "Playwright", "Puppeteer", "Webhooks & APIs"],
    projectsUsed: ["Process Automation", "Automated Reporting", "Web Scraping"],
    iconName: "Zap"
  },
  {
    id: "inv-data",
    name: "Data Analytics & BI",
    categoryName: "Data",
    emoji: "🟩",
    badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/60 shadow-[0_0_12px_rgba(20,184,166,0.35)]",
    borderColor: "border-teal-500/50 hover:border-teal-400",
    textColor: "text-teal-400",
    bgColor: "bg-teal-500/15",
    glowColor: "rgba(20, 184, 166, 0.25)",
    dotBgColor: "bg-teal-400",
    cardBg: "from-teal-950/40 via-[#1F150C]/90 to-[#061715]/95",
    rarity: "EPIC",
    description: "Data wrangling, financial modeling, Power BI dashboard creation, automated reporting, and KPI analytics.",
    techList: ["Python", "Microsoft Excel", "Power BI", "Pandas", "NumPy", "Matplotlib & Seaborn"],
    projectsUsed: ["Inventory Analytics", "Executive BI Portals", "Data Pipelines"],
    iconName: "BarChart3"
  },
  {
    id: "inv-deployment",
    name: "DevOps & Deployment",
    categoryName: "Deployment",
    emoji: "🟪",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.35)]",
    borderColor: "border-purple-500/50 hover:border-purple-400",
    textColor: "text-purple-400",
    bgColor: "bg-purple-500/15",
    glowColor: "rgba(168, 85, 247, 0.25)",
    dotBgColor: "bg-purple-400",
    cardBg: "from-purple-950/40 via-[#1F150C]/90 to-[#170822]/95",
    rarity: "RARE",
    description: "Automated deployment workflows, containerization, custom domain setups, and zero-downtime releases.",
    techList: ["Vercel", "Docker", "GitHub & Actions", "CI/CD Pipelines", "Netlify", "Cloudflare"],
    projectsUsed: ["Production Shipping", "Cloud Hosting", "CI/CD Workflows"],
    iconName: "Box"
  }
];

// Legacy compatibility alias
export const INVENTORY_ITEMS = INVENTORY_CATEGORIES;
