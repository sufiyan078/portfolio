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
  rarity: 'LEGENDARY' | 'EPIC' | 'RARE';
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
    emoji: "🟨",
    badgeColor: "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/60 shadow-[0_0_12px_rgba(255,215,0,0.3)]",
    borderColor: "border-[#FFD700]/50 hover:border-[#FFD700]",
    textColor: "text-[#FFD700]",
    bgColor: "bg-[#FFD700]/15",
    glowColor: "rgba(255, 215, 0, 0.35)",
    dotBgColor: "bg-[#FFD700]",
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
    emoji: "🟨",
    badgeColor: "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/60 shadow-[0_0_12px_rgba(255,215,0,0.3)]",
    borderColor: "border-[#FFD700]/50 hover:border-[#FFD700]",
    textColor: "text-[#FFD700]",
    bgColor: "bg-[#FFD700]/15",
    glowColor: "rgba(255, 215, 0, 0.35)",
    dotBgColor: "bg-[#FFD700]",
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
    emoji: "🟨",
    badgeColor: "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/60 shadow-[0_0_12px_rgba(255,215,0,0.3)]",
    borderColor: "border-[#FFD700]/50 hover:border-[#FFD700]",
    textColor: "text-[#FFD700]",
    bgColor: "bg-[#FFD700]/15",
    glowColor: "rgba(255, 215, 0, 0.35)",
    dotBgColor: "bg-[#FFD700]",
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
    emoji: "🟥",
    badgeColor: "bg-[#FF4500]/20 text-[#FF4500] border-[#FF4500]/50",
    borderColor: "border-[#FF4500]/40 hover:border-[#FF4500]",
    textColor: "text-[#FF4500]",
    bgColor: "bg-[#FF4500]/10",
    glowColor: "rgba(255, 69, 0, 0.25)",
    dotBgColor: "bg-[#FF4500]",
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
    emoji: "🟥",
    badgeColor: "bg-[#FF4500]/20 text-[#FF4500] border-[#FF4500]/50",
    borderColor: "border-[#FF4500]/40 hover:border-[#FF4500]",
    textColor: "text-[#FF4500]",
    bgColor: "bg-[#FF4500]/10",
    glowColor: "rgba(255, 69, 0, 0.25)",
    dotBgColor: "bg-[#FF4500]",
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
    badgeColor: "bg-[#A855F7]/20 text-[#A855F7] border-[#A855F7]/50",
    borderColor: "border-[#A855F7]/40 hover:border-[#A855F7]",
    textColor: "text-[#A855F7]",
    bgColor: "bg-[#A855F7]/10",
    glowColor: "rgba(168, 85, 247, 0.25)",
    dotBgColor: "bg-[#A855F7]",
    rarity: "RARE",
    description: "Automated deployment workflows, containerization, custom domain setups, and zero-downtime releases.",
    techList: ["Vercel", "Docker", "GitHub & Actions", "CI/CD Pipelines", "Netlify", "Cloudflare"],
    projectsUsed: ["Production Shipping", "Cloud Hosting", "CI/CD Workflows"],
    iconName: "Box"
  }
];

// Legacy compatibility alias
export const INVENTORY_ITEMS = INVENTORY_CATEGORIES;
