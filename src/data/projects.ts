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
    tagline: "AI-assisted resume generation, optimization workflows & career application support",
    category: "AI",
    status: "COMPLETED",
    difficulty: "★ ★ ★ ★ ☆",
    description: "An AI-powered career platform designed to help users create better resumes, optimize job applications, and streamline overall job search workflows.",
    businessProblem: "Job seekers spend significant manual effort customizing resume bullet points and cover letters without structured feedback on application relevance.",
    architecture: {
      nodes: [
        { name: "Next.js + React Client", type: "Web Application" },
        { name: "Gemini / Vertex AI APIs", type: "LLM Inference Engine" },
        { name: "Firebase Services", type: "User Auth & Cloud Data" },
        { name: "Job Search APIs", type: "External Integration" }
      ],
      description: "Structured AI integration engine that processes resume content against job requirement specifications to provide actionable bullet optimization recommendations."
    },
    features: [
      "Structured resume creation and AI-assisted bullet point optimization",
      "Targeted application improvement suggestions based on job requirements",
      "Automated drafting assistant for cover letters and application materials",
      "Interactive career workflow dashboard for application tracking"
    ],
    technologyLoadout: [
      "Next.js",
      "React",
      "TypeScript",
      "Gemini",
      "Vertex AI",
      "Firebase",
      "Job Search APIs"
    ],
    challenges: [
      {
        issue: "AI generation latencies caused perceived UI slowdown during text generation.",
        investigation: "Blocking API requests waited for complete response text before updating client UI state.",
        solution: "Implemented streaming response handling to render AI suggestions progressively as generated."
      }
    ],
    outcome: [
      "Created an AI-powered career productivity platform simplifying job application workflows",
      "Streamlined resume drafting and tailoring processes through structured AI assistance",
      "Delivered a responsive user experience with clean workflow management"
    ],
    lessonsLearned: [
      "Streaming tokens dramatically improves perceived UI responsiveness during AI text generation.",
      "Clear prompt boundaries and schema validation ensure consistent LLM outputs."
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
