export interface ProjectChallenge {
  issue: string;
  investigation: string;
  solution: string;
}

export interface Project {
  id: string;
  missionNumber: string;
  title: string;
  tagline: string;
  category: 'Full Stack' | 'AI' | 'Analytics' | 'Automation';
  status: 'COMPLETED' | 'IN PROGRESS';
  difficulty: '★ ★ ★ ★ ★' | '★ ★ ★ ★ ☆';
  description: string;
  businessProblem: string;
  architecture: {
    nodes: { name: string; type: string }[];
    description: string;
  };
  features: string[];
  technologyLoadout: string[];
  challenges: ProjectChallenge[];
  outcome: string[];
  lessonsLearned: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "mission-01",
    missionNumber: "MISSION 01",
    title: "Monthly Inventory Audit Dashboard",
    tagline: "Browser-based monthly inventory audit dashboard built for GAS (Global Audit Services)",
    category: "Analytics",
    status: "COMPLETED",
    difficulty: "★ ★ ★ ★ ★",
    description: "A browser-based monthly inventory audit dashboard built for GAS (Global Audit Services). Designed specifically for auditors to review monthly inventory valuation workbooks, the application converts uploaded Excel files into interactive dashboards—eliminating repetitive manual spreadsheet analysis and focusing entirely on visual audit insights. This application is an audit visualization tool, not an inventory management system, and does not generate PDF reports.",
    businessProblem: "Every month, auditors at GAS reviewed large inventory valuation Excel files where manual filtering and spreadsheet analysis consumed significant time. Auditors needed faster visibility into inventory performance. The dashboard automated Excel parsing, data normalization, KPI calculation, and visual analytics to streamline the monthly audit process.",
    architecture: {
      nodes: [
        { name: "React + TypeScript Application", type: "Frontend Client Dashboard" },
        { name: "Firebase Authentication", type: "Google Sign-In Access Control" },
        { name: "Monthly Excel Ingestion", type: "File Processing Boundary" },
        { name: "SheetJS Workbook Parser", type: "Local Data Parsing Engine" },
        { name: "Data Cleaning & Normalization", type: "Sanitization Layer" },
        { name: "Audit KPI Calculation", type: "Metrics & Valuation Engine" },
        { name: "Interactive Dashboard", type: "Charts, Tables & Filters" }
      ],
      description: "React + TypeScript Application → Firebase Authentication (Google Sign-In) → Monthly Excel Upload → SheetJS Workbook Parser → Data Cleaning & Normalization → Audit KPI Calculation → Interactive Dashboard (Charts, Tables, Filters)."
    },
    features: [
      "Secure login using Firebase Authentication (Google Sign-In)",
      "Upload monthly inventory valuation Excel workbooks",
      "Parse Excel files locally using SheetJS",
      "Clean and normalize imported inventory data",
      "Calculate monthly audit KPIs",
      "Interactive dashboards",
      "Division-wise visualizations",
      "Supplier analysis",
      "Search and filtering",
      "Responsive dashboard for auditors"
    ],
    technologyLoadout: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase Authentication",
      "Google Sign-In",
      "SheetJS (xlsx)",
      "Git"
    ],
    challenges: [
      {
        issue: "Large Monthly Workbook Ingestion Latency: Processing monthly inventory spreadsheets with extensive row counts caused brief UI thread freezing.",
        investigation: "SheetJS parsing and data sanitization were running synchronously in a single execution block.",
        solution: "Structured chunked dataset parsing to maintain smooth 60fps UI responsiveness during file uploads."
      },
      {
        issue: "Audit Count Zero Normalization: Valid zero-quantity stock items evaluated as empty unentered fields.",
        investigation: "Data cleaning logic treated numerical 0 stock counts identically to missing cell values.",
        solution: "Engineered explicit type-checking to distinguish numerical 0 inventory counts from missing cells."
      }
    ],
    outcome: [
      "Reduced repetitive manual spreadsheet analysis during monthly audits for GAS",
      "Faster review of inventory valuation data",
      "Improved visibility through interactive dashboards",
      "Better identification of inventory trends and discrepancies",
      "Browser-based processing of uploaded Excel files",
      "Improved efficiency of recurring monthly audit reviews"
    ],
    lessonsLearned: [
      "Local in-browser spreadsheet parsing with SheetJS protects sensitive audit data while eliminating server processing dependencies.",
      "Clear visual dashboards dramatically simplify recurring monthly auditing workflows compared to raw spreadsheet reviews."
    ]
  },
  {
    id: "mission-02",
    missionNumber: "MISSION 02",
    title: "CareerAI — AI Career Assistant",
    tagline: "AI-powered resume generation, ATS optimization, job matching & career application assistant",
    category: "AI",
    status: "COMPLETED",
    difficulty: "★ ★ ★ ★ ☆",
    description: "CareerAI is an AI-powered career platform that enables users to build professional resumes from scratch, choose from multiple resume templates, upload existing resumes for AI-assisted optimization, analyze resumes against job descriptions, receive ATS compatibility scoring, generate personalized cover letters, and discover relevant jobs through JSearch integration. The platform combines AI-assisted content generation with structured career workflows to simplify and improve the job application process.",
    businessProblem: "Job seekers commonly struggle with creating professional resumes, tailoring resumes for each application, understanding ATS compatibility, identifying missing keywords, writing customized cover letters, and finding relevant job opportunities. CareerAI reduces repetitive manual work by combining resume generation, optimization, ATS analysis, AI recommendations, and job search into a unified workflow.",
    architecture: {
      nodes: [
        { name: "Next.js + React Client", type: "Web Application" },
        { name: "Firebase Authentication", type: "User Login & Session Management" },
        { name: "Resume Builder", type: "Template Selection & Creation" },
        { name: "Resume Upload / Resume Creation", type: "Input Processing Layer" },
        { name: "Prompt Construction Layer", type: "AI Request Formatting" },
        { name: "Gemini Flash API", type: "LLM Inference Engine" },
        { name: "Structured AI Response Processing", type: "Output Parsing & Validation" },
        { name: "ATS Analysis & Resume Optimization", type: "Scoring & Recommendations" },
        { name: "Cover Letter Generation", type: "AI Content Generation" },
        { name: "Firebase Database & Billing", type: "User Data & SaaS Billing" }
      ],
      description: "Next.js + React Client → Firebase Authentication (User Login) → Resume Builder (Template Selection) → Resume Upload / Resume Creation → Prompt Construction Layer → Gemini Flash API → Structured AI Response Processing → ATS Analysis & Resume Optimization → Cover Letter Generation → Firebase Database (User Data & Billing)."
    },
    features: [
      "AI-powered resume generation from scratch",
      "Resume template selection with multiple professional layouts",
      "Upload existing resumes for AI-assisted optimization",
      "ATS compatibility scoring against job descriptions",
      "Resume analysis with keyword gap identification",
      "AI-generated resume improvement suggestions",
      "Personalized cover letter generation",
      "Job discovery through JSearch API integration",
      "Firebase Authentication for secure user sessions",
      "Firebase Database and Billing integration for SaaS model"
    ],
    technologyLoadout: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Gemini API",
      "Gemini Flash",
      "Firebase Authentication",
      "Firebase Database",
      "Firebase Billing",
      "JSearch API",
      "Git"
    ],
    challenges: [
      {
        issue: "AI generation latencies caused perceived UI slowdown during resume content generation.",
        investigation: "Blocking API requests waited for complete Gemini Flash response before updating client UI state.",
        solution: "Implemented streaming response handling to render AI suggestions progressively as tokens were generated."
      },
      {
        issue: "ATS keyword matching produced inconsistent relevance scores across different job description formats.",
        investigation: "Raw text comparison missed semantic equivalences between resume terms and job description requirements.",
        solution: "Structured prompt construction layer to normalize job descriptions before comparison, improving ATS scoring consistency."
      }
    ],
    outcome: [
      "Built an AI-powered career platform combining resume creation, optimization, ATS analysis, and job discovery",
      "Reduced repetitive manual effort involved in tailoring resumes for different job applications",
      "Delivered structured AI workflows using Gemini Flash API for resume generation and optimization",
      "Created a scalable SaaS foundation using Firebase Authentication, Database, and Billing"
    ],
    lessonsLearned: [
      "Structured prompt construction with clear schema boundaries ensures consistent and reliable LLM outputs from Gemini Flash.",
      "Separating ATS analysis from content generation allows independent optimization of scoring accuracy without affecting resume quality."
    ]
  },
  {
    id: "mission-03",
    missionNumber: "MISSION 03",
    title: "Quarterly Inventory Analytics & Reporting Portal",
    tagline: "Excel-driven quarterly inventory analytics, business rule validation & executive report generation",
    category: "Analytics",
    status: "COMPLETED",
    difficulty: "★ ★ ★ ★ ★",
    description: "A browser-based inventory analytics and reporting platform built to streamline quarterly inventory audits. The application enables users to upload inventory valuation Excel workbooks, automatically validate and normalize inventory data, calculate business KPIs, visualize inventory performance through interactive dashboards, and generate professional executive reports. Unlike a simple dashboard, the platform combines Excel processing, business rule validation, KPI calculation, reporting, and visualization into a single workflow.",
    businessProblem: "Quarterly inventory audits required manually reviewing large Excel workbooks, validating thousands of inventory records, calculating business metrics, and preparing management reports. The existing process was time-consuming and susceptible to inconsistencies between spreadsheets and reports. The application automates Excel ingestion, validation, data normalization, KPI calculation, dashboard generation, and executive reporting while ensuring consistency across all outputs.",
    architecture: {
      nodes: [
        { name: "User Authentication", type: "Firebase Authentication" },
        { name: "Quarterly Excel Upload", type: "File Ingestion Layer" },
        { name: "SheetJS Workbook Parser", type: "Excel Processing Engine" },
        { name: "Data Validation & Normalization", type: "Cleaning & Sanitization" },
        { name: "Business Rule Engine", type: "Rule-Based Validation" },
        { name: "KPI Calculation Engine", type: "Metrics & Aggregation" },
        { name: "Interactive Analytics Dashboard", type: "Charts, Tables & Filters" },
        { name: "Shared Report Model", type: "Consistent Data Layer" },
        { name: "Professional PDF Export", type: "html2canvas + jsPDF" },
        { name: "PowerPoint Export", type: "pptxgenjs" }
      ],
      description: "User Authentication (Firebase) → Quarterly Excel Upload → SheetJS Workbook Parser → Data Validation & Normalization → Business Rule Engine → KPI Calculation Engine → Interactive Analytics Dashboard → Shared Report Model → Professional PDF Export → PowerPoint Export."
    },
    features: [
      "Secure user authentication with Firebase Authentication",
      "Upload quarterly inventory valuation Excel workbooks",
      "Browser-based Excel parsing using SheetJS",
      "Automated validation and normalization of uploaded inventory data",
      "Rule-based KPI calculation engine",
      "Interactive dashboards with inventory KPIs, charts, and analytical tables",
      "Division and supplier performance analysis",
      "Executive PDF report generation",
      "PowerPoint report export",
      "Shared report model ensuring dashboard, PDF, and PowerPoint consistency"
    ],
    technologyLoadout: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase Authentication",
      "Firestore",
      "SheetJS (xlsx)",
      "html2canvas",
      "jsPDF",
      "pptxgenjs",
      "Git"
    ],
    challenges: [
      {
        issue: "Dashboard, PDF, and PowerPoint exports displayed inconsistent KPI values and formatting.",
        investigation: "Each export path independently recalculated metrics from raw data, introducing rounding and aggregation discrepancies.",
        solution: "Designed a shared report model that calculates all KPIs once and feeds the same data structure to dashboards, PDF, and PowerPoint exports."
      },
      {
        issue: "Complex Excel workbooks with inconsistent formatting caused parsing failures during quarterly uploads.",
        investigation: "SheetJS returned mixed types for cells that contained formulas, merged ranges, or whitespace-padded values.",
        solution: "Built a normalization pipeline with explicit type coercion, empty-cell handling, and merged-range expansion before data enters the validation layer."
      },
      {
        issue: "Uploaded workbook totals did not reconcile with calculated KPI summaries.",
        investigation: "Source workbooks contained pre-calculated subtotals that diverged from row-level re-aggregation due to hidden rows and filtered records.",
        solution: "Implemented reconciliation checks comparing uploaded subtotals against recalculated values, flagging discrepancies for auditor review."
      }
    ],
    outcome: [
      "Automated quarterly inventory analytics from uploaded Excel workbooks",
      "Reduced manual effort required to validate inventory data and prepare management reports",
      "Delivered consistent reporting across dashboards, PDF exports, and PowerPoint presentations through a shared reporting architecture",
      "Improved confidence in inventory reporting by implementing validation, reconciliation, and rule-based KPI calculations"
    ],
    lessonsLearned: [
      "A shared report model that decouples calculation from presentation eliminates cross-format inconsistencies in multi-output reporting systems.",
      "Deterministic report layouts require explicit control over data flow — allowing each export to independently compute metrics guarantees divergence."
    ]
  }
];
