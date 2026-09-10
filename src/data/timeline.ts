export interface Quest {
  id: string;
  period: string;
  title: string;
  role: string;
  questType: 'Main Quest' | 'Milestone';
  description: string;
  deliverables: string[];
  techLoadout: string[];
  reward: string;
  status: 'COMPLETED' | 'IN PROGRESS';
}

export const QUEST_LOG: Quest[] = [
  {
    id: "quest-03",
    period: "2026",
    title: "Quarterly Inventory Analytics & Reporting Portal",
    role: "Full Stack Engineer & System Architect",
    questType: "Main Quest",
    description: "Engineered an enterprise Excel-driven inventory analytics platform with SheetJS parsing, business rule validation, KPI calculation, and a shared report model powering consistent dashboards, PDF, and PowerPoint exports.",
    deliverables: [
      "Shared Report Model synchronizing Dashboard, PDF and PowerPoint exports",
      "Robust client-side SheetJS ingestion pipeline with subtotal reconciliation",
      "Automated business rule validation flagging zero-quantity edge cases",
      "Executive PDF generation using html2canvas and jsPDF",
      "PowerPoint presentation export engine via pptxgenjs"
    ],
    techLoadout: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "SheetJS (xlsx)",
      "html2canvas",
      "jsPDF",
      "pptxgenjs",
      "Firebase"
    ],
    reward: "Enterprise Reporting Engine & Multi-Format Export Architecture",
    status: "COMPLETED"
  },
  {
    id: "quest-02",
    period: "2026",
    title: "CareerAI — AI Career Assistant",
    role: "Full Stack Developer",
    questType: "Main Quest",
    description: "Built an AI-powered career platform with Gemini Flash API integration for resume generation, ATS optimization, cover letter creation, and job discovery through JSearch API — backed by Firebase Authentication, Database, and Billing.",
    deliverables: [
      "Streaming Gemini Flash inference layer for fast progressive token rendering",
      "Semantic ATS keyword compatibility scoring engine",
      "Automated cover letter generator tailored to uploaded job specs",
      "Live job search discovery module integrated with JSearch API",
      "Multi-tenant Firebase Authentication, Firestore database, and billing foundation"
    ],
    techLoadout: [
      "Next.js",
      "React",
      "TypeScript",
      "Gemini API",
      "Gemini Flash",
      "Firebase Auth",
      "Firestore",
      "JSearch API",
      "Tailwind CSS"
    ],
    reward: "AI Product Engineering & LLM Integration Experience",
    status: "COMPLETED"
  },
  {
    id: "quest-01",
    period: "2026",
    title: "Monthly Inventory Audit Dashboard",
    role: "Full Stack Developer",
    questType: "Main Quest",
    description: "Developed a browser-based audit visualization tool for GAS that converts uploaded monthly Excel inventory workbooks into interactive dashboards with Firebase Authentication, SheetJS parsing, data normalization, and KPI analytics.",
    deliverables: [
      "100% in-browser spreadsheet parser protecting sensitive enterprise data",
      "Chunked parsing algorithm preventing UI freeze on large workbooks",
      "Division and supplier inventory breakdown charts and analytical tables",
      "Automated stock variance and slow-moving item identification",
      "Secure Google Sign-In access control via Firebase Authentication"
    ],
    techLoadout: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "SheetJS (xlsx)",
      "Firebase Auth",
      "Google Sign-In",
      "Chart UI"
    ],
    reward: "Excel Processing & Audit Dashboard Engineering",
    status: "COMPLETED"
  }
];
