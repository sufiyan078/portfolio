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
    title: "Quarterly Analysis with report generation",
    tagline: "Interactive quarterly data analytics, trend forecasting & automated executive report generation",
    category: "Analytics",
    status: "COMPLETED",
    difficulty: "★ ★ ★ ★ ☆",
    description: "An analytics dashboard designed to transform raw operational inventory information into clear, understandable business insights.",
    businessProblem: "Convert complex raw operational inventory data into intuitive visual dashboards for decision-makers.",
    architecture: {
      nodes: [
        { name: "React + TypeScript", type: "Dashboard Frontend" },
        { name: "Data Processing Engine", type: "Aggregation Layer" },
        { name: "Chart Visualization", type: "Analytics Component Suite" }
      ],
      description: "Modular dashboard architecture leveraging interactive charts and data aggregation utilities to present real-time business health metrics."
    },
    features: [
      "Interactive stock movement and trend charts",
      "Automated metric aggregation for fast business assessment",
      "Filterable inventory status views and alerts",
      "Responsive analytics layout optimized for executive review"
    ],
    technologyLoadout: [
      "React",
      "TypeScript",
      "Charts",
      "Data Processing"
    ],
    challenges: [
      {
        issue: "Visualizing complex multi-category inventory metrics without cluttering dashboard layout.",
        investigation: "Initial monolithic grid layout overloaded users with secondary metrics.",
        solution: "Organized dashboard into focused tabbed panels with key KPI overview cards at the top."
      }
    ],
    outcome: [
      "Successfully converted raw operational data into intuitive interactive dashboards",
      "Provided business decision-makers with clear visibility into inventory health"
    ],
    lessonsLearned: [
      "Clear visual hierarchy is essential when presenting multi-dimensional business metrics."
    ]
  }
];
