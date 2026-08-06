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
    description: "Building AI tools, LLM integrations, custom prompt workflows, and practical assistant features.",
    capabilityTag: "✓ AI Integration",
    projectsUsed: ["AI Assistants", "LLM Features", "RAG Systems"],
    iconName: "Bot"
  },
  {
    id: "sk-automation-builder",
    name: "Automation Builder",
    category: "AUTOMATION",
    level: "Mastered",
    percentage: 98,
    description: "Automating repetitive business tasks, web scraping, data sync pipelines, and custom background bots.",
    capabilityTag: "✓ Process Automation",
    projectsUsed: ["Process Automation", "Web Scraping", "n8n Workflows"],
    iconName: "Zap"
  },
  {
    id: "sk-dashboard-builder",
    name: "Dashboard Builder",
    category: "BI & ANALYTICS",
    level: "Mastered",
    percentage: 96,
    description: "Creating clear business dashboards, KPI tracking tools, and interactive data analytics portals.",
    capabilityTag: "✓ Business Dashboards",
    projectsUsed: ["KPI Portals", "Analytics Dashboards", "Reporting Systems"],
    iconName: "BarChart3"
  },
  {
    id: "sk-webapp-builder",
    name: "Web App Builder",
    category: "WEB ENGINEERING",
    level: "Mastered",
    percentage: 97,
    description: "Developing full-stack web applications, internal admin tools, and custom web software.",
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
    description: "Building production-ready SaaS MVPs with authentication, subscriptions, databases, and responsive UI.",
    capabilityTag: "✓ SaaS Products",
    projectsUsed: ["SaaS MVPs", "Full-Stack Products", "Cloud Systems"],
    iconName: "Rocket"
  },
  {
    id: "sk-api-builder",
    name: "API Builder",
    category: "BACKEND & APIS",
    level: "Mastered",
    percentage: 96,
    description: "Designing REST & GraphQL APIs, serverless backends, webhooks, and secure backend services.",
    capabilityTag: "✓ API Development",
    projectsUsed: ["REST APIs", "GraphQL", "Webhooks"],
    iconName: "Server"
  },
  {
    id: "sk-data-builder",
    name: "Data Builder",
    category: "DATA PIPELINES",
    level: "Mastered",
    percentage: 94,
    description: "Building data ingestion pipelines, automated ETL workflows, SQL database schemas, and reporting engines.",
    capabilityTag: "✓ Data Pipelines",
    projectsUsed: ["Data Platforms", "Reporting Systems", "ETL Pipelines"],
    iconName: "Database"
  },
  {
    id: "sk-business-systems-builder",
    name: "Business Systems Builder",
    category: "SYSTEM INTEGRATIONS",
    level: "Mastered",
    percentage: 98,
    description: "Connecting business apps, third-party API integrations, automated notifications, and custom business logic.",
    capabilityTag: "✓ System Integrations",
    projectsUsed: ["App Integrations", "Business Logic", "Workflow Systems"],
    iconName: "Cpu"
  }
];
