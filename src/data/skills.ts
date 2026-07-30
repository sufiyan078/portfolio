export interface SkillAbility {
  id: string;
  name: string;
  category: string;
  level: string;
  percentage: number;
  description: string;
  capabilityTag: string;
  projectsUsed: string[];
  iconName: string;
}

export const SKILLS: SkillAbility[] = [
  {
    id: "sk-ai-builder",
    name: "AI Builder",
    category: "AI SYSTEMS",
    level: "Mastered",
    percentage: 99,
    description: "Architecting autonomous AI agents, LLM integrations, prompt engineering, and intelligent workflow assistants.",
    capabilityTag: "✓ AI Agents",
    projectsUsed: ["AI Agents", "LLM Integrations", "RAG Systems"],
    iconName: "Bot"
  },
  {
    id: "sk-automation-builder",
    name: "Automation Builder",
    category: "AUTOMATION",
    level: "Mastered",
    percentage: 98,
    description: "Automating repetitive business processes, web scraping, API sync pipelines, and custom task bots.",
    capabilityTag: "✓ Automation",
    projectsUsed: ["Process Automation", "Web Scraping", "n8n Workflows"],
    iconName: "Zap"
  },
  {
    id: "sk-dashboard-builder",
    name: "Dashboard Builder",
    category: "BI & ANALYTICS",
    level: "Mastered",
    percentage: 96,
    description: "Building executive business dashboards, real-time KPI monitors, and interactive data visualization portals.",
    capabilityTag: "✓ Dashboards",
    projectsUsed: ["KPI Portals", "Analytics Dashboards", "Reporting Systems"],
    iconName: "BarChart3"
  },
  {
    id: "sk-webapp-builder",
    name: "Web App Builder",
    category: "WEB ENGINEERING",
    level: "Mastered",
    percentage: 97,
    description: "Developing full-stack web applications, internal admin control panels, and custom enterprise web software.",
    capabilityTag: "✓ Admin Panels",
    projectsUsed: ["Internal Web Apps", "Admin Panels", "Client Portals"],
    iconName: "Layout"
  },
  {
    id: "sk-saas-builder",
    name: "SaaS Builder",
    category: "SAAS PRODUCTS",
    level: "Mastered",
    percentage: 95,
    description: "Building complete end-to-end SaaS MVPs with authentication, subscriptions, cloud databases, and sleek UI.",
    capabilityTag: "✓ SaaS",
    projectsUsed: ["SaaS MVPs", "Full-Stack Products", "Cloud Systems"],
    iconName: "Rocket"
  },
  {
    id: "sk-api-builder",
    name: "API Builder",
    category: "BACKEND & APIS",
    level: "Mastered",
    percentage: 96,
    description: "Designing scalable REST & GraphQL APIs, serverless backends, webhooks, and secure microservices.",
    capabilityTag: "✓ APIs",
    projectsUsed: ["REST APIs", "GraphQL", "Webhooks"],
    iconName: "Server"
  },
  {
    id: "sk-data-builder",
    name: "Data Builder",
    category: "DATA PIPELINES",
    level: "Mastered",
    percentage: 94,
    description: "Engineering data ingestion pipelines, automated ETL workflows, relational SQL databases, and data platforms.",
    capabilityTag: "✓ Data Platforms",
    projectsUsed: ["Data Platforms", "Reporting Systems", "ETL Pipelines"],
    iconName: "Database"
  },
  {
    id: "sk-business-systems-builder",
    name: "Business Systems Builder",
    category: "SYSTEM INTEGRATIONS",
    level: "Mastered",
    percentage: 98,
    description: "Connecting multi-app ecosystems, third-party API integrations, automated notifications, and business logic.",
    capabilityTag: "✓ Integrations",
    projectsUsed: ["Integrations", "Business Logic", "App Ecosystems"],
    iconName: "Cpu"
  }
];
