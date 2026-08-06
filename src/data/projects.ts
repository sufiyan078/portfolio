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
  whyItMattered: string;
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
    tagline: "Automated inventory analysis converting monthly Excel workbooks into interactive visual audit dashboards for GAS (GAS Arabian Services)",
    category: "Analytics",
    status: "COMPLETED",
    difficulty: "★ ★ ★ ★ ★",
    description: "A browser-based monthly inventory audit application built for GAS (GAS Arabian Services) to convert manual spreadsheet reviews into visual dashboards. The system ingests monthly Excel workbooks, normalizes inventory data, calculates audit KPIs, and presents division and supplier breakdowns through interactive dashboards—allowing auditors to review stock data without manual spreadsheet filtering.",
    businessProblem: "Every month, auditors at GAS (GAS Arabian Services) manually reviewed large inventory valuation Excel workbooks. Filtering rows, checking formulas, and inspecting spreadsheets cell-by-cell consumed significant time and increased the risk of human oversight during recurring monthly audits.",
    whyItMattered: "Why it mattered: It turned time-consuming spreadsheet filtering into instant visual audit dashboards, allowing auditors to focus on variance inspection rather than manual file processing.",
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
      "Automated monthly inventory analysis, converting uploaded Excel files into interactive dashboards",
      "Streamlined monthly valuation reviews by visualizing division and supplier stock performance",
      "Eliminated repetitive manual data formatting and formula recalculation across monthly workbooks",
      "Accelerated identification of stock discrepancies and slow-moving inventory",
      "Maintained data privacy through 100% local browser-based file processing with zero server uploads",
      "Ensured consistent KPI calculation rules across recurring monthly audit cycles"
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
    tagline: "AI-assisted resume generation, ATS keyword optimization, cover letter creation, and job search application",
    category: "AI",
    status: "COMPLETED",
    difficulty: "★ ★ ★ ★ ☆",
    description: "An AI-assisted career web application that automates resume creation, ATS compatibility scoring, keyword gap analysis, and cover letter generation. Combining Next.js and the Gemini Flash API with structured prompt schemas, the system provides application materials and job recommendations within a unified workflow.",
    businessProblem: "Job seekers manually format resumes for individual job descriptions, identify missing ATS keywords, and write tailored cover letters from scratch. This manual process limits application volume and leads to inconsistent resume formatting across job submissions.",
    whyItMattered: "Why it mattered: It centralized job search, resume tailoring, and ATS analysis into one structured application, eliminating repetitive writing for every job application.",
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
      "Automated ATS keyword analysis and compatibility scoring against target job descriptions",
      "Streamlined resume tailoring and custom cover letter creation into a single guided flow",
      "Improved formatting consistency and keyword alignment using structured AI output parsing",
      "Integrated live job search recommendations using the JSearch API",
      "Established a multi-user SaaS foundation with authentication, database storage, and billing structures"
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
    tagline: "Excel-driven quarterly inventory analytics, business rule validation, and automated report generation built for GAS (GAS Arabian Services)",
    category: "Analytics",
    status: "COMPLETED",
    difficulty: "★ ★ ★ ★ ★",
    description: "A quarterly inventory analytics and reporting application built for GAS (GAS Arabian Services) to process raw Excel workbooks into visual dashboards and management reports. Operating on a single-source shared report model, the application maintains data consistency across live dashboards, PDF reports, and PowerPoint slide decks.",
    businessProblem: "Quarterly inventory audits at GAS (GAS Arabian Services) required validating spreadsheet rows, calculating metrics across multiple files, and manually copying numbers into management slide decks and PDF documents. This manual workflow introduced data discrepancies between spreadsheets and final presentations.",
    whyItMattered: "Why it mattered: It established a single source of truth for inventory metrics, guaranteeing that dashboards, PDF documents, and PowerPoint slide decks always present identical audit numbers.",
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
      "Automated quarterly inventory analytics and KPI calculations directly from uploaded Excel workbooks",
      "Generated PDF audit reports and PowerPoint slide decks directly from processed spreadsheet data",
      "Reduced manual presentation preparation effort by generating slide decks and PDFs automatically",
      "Eliminated metric discrepancies across dashboards, PDFs, and slide decks via a shared report model",
      "Improved audit accuracy through rule-based data validation and automated subtotal reconciliation"
    ],
    lessonsLearned: [
      "A shared report model that decouples calculation from presentation eliminates cross-format inconsistencies in multi-output reporting systems.",
      "Deterministic report layouts require explicit control over data flow — allowing each export to independently compute metrics guarantees divergence."
    ]
  }
];
