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
    id: "quest-04",
    period: "2026",
    title: "Direct-to-Consumer Apparel Store",
    role: "Lead Full Stack & Store Architect",
    questType: "Main Quest",
    description: "Architected a complete mobile-first online store for an emerging men's apparel brand, engineered around fit confidence, fabric weight transparency in GSM, centimeter size specifications, India-wide checkout, and 14 dedicated trust and policy workflows.",
    deliverables: [
      "Mobile-first product architecture and measured size guide engine (cm)",
      "Fabric weight transparency (GSM) and model fit specifications",
      "'Shop your size' inventory availability filtering",
      "UPI, Card, Net Banking, and Cash on Delivery payment integration",
      "14 dedicated customer trust, size assistance, and exchange policy pages"
    ],
    techLoadout: ["Liquid", "JavaScript", "HTML5", "CSS3", "Payment Gateways", "Responsive Design"],
    reward: "E-Commerce Architecture & Conversion-Focused Store Systems",
    status: "COMPLETED"
  },
  {
    id: "quest-03",
    period: "2026",
    title: "Quarterly Inventory Analytics & Reporting Portal",
    role: "Full Stack Engineer & System Architect",
    questType: "Main Quest",
    description: "Built the quarterly inventory portal from Excel validation and deterministic stock-take reconciliation through filtered investigation, evidence preparation, sign-off and browser-generated PDF, PowerPoint and Excel deliverables, with role-based access and historical audit records.",
    deliverables: [
      "Multi-sheet ingestion, header normalization and validation profiling",
      "Deterministic stock-count reconciliation and discrepancy investigation",
      "Pre-report design, evidence appendices and prepared/checked/approved sign-off",
      "Browser-generated PDF, editable PowerPoint and Excel reconciliation",
      "Role-based access, structured cloud audit records and archives"
    ],
    techLoadout: ["Next.js", "React", "SheetJS (xlsx)", "Firebase", "LZ-String", "jsPDF", "html2canvas", "PptxGenJS"],
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
    status: "IN PROGRESS"
  },
  {
    id: "quest-01",
    period: "2026",
    title: "Monthly Inventory Visualization — Enterprise Inventory Analytics",
    role: "Full Stack Developer",
    questType: "Main Quest",
    description: "Built the enterprise inventory-aging analytics webapp with Next.js and React: governed Google sign-in, multi-sheet Excel parsing, supplier recovery, aging and provision rules, filtered analytical views, compressed Firestore dataset history, and browser-generated reports.",
    deliverables: [
      "Dynamic Excel header mapping and two-pass supplier recovery",
      "Organization, supplier, division, item and provision analysis",
      "Compressed cloud dataset history and approved-user access",
      "Browser-generated Excel, PDF and PowerPoint reports"
    ],
    techLoadout: ["Next.js", "React", "SheetJS (xlsx)", "Firebase Auth", "Firestore", "LZ-String", "jsPDF", "PptxGenJS"],
    reward: "Excel Processing & Audit Dashboard Engineering",
    status: "COMPLETED"
  }
];
