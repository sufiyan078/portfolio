export interface ProjectChallenge {
  issue: string;
  investigation: string;
  solution: string;
}

export interface ProjectStat {
  number: string;
  caption: string;
}

export interface ProjectPreview {
  headline: string;
  type: string;
  metrics: string[];
  kpis: { label: string; value: string }[];
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
  metrics: ProjectStat[];
  preview: ProjectPreview;
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    "id": "mission-01",
    "missionNumber": "MISSION 01",
    "title": "Monthly Inventory Visualization — GAS Inventory Analytics",
    "tagline": "From multi-division ERP workbooks to governed inventory-aging analysis and executive reporting for GAS Arabian Services.",
    "category": "Analytics",
    "status": "COMPLETED",
    "difficulty": "★ ★ ★ ★ ★",
    "description": "An inventory-aging and business intelligence webapp for GAS Arabian Services, built with Next.js and React. Approved users upload monthly ERP Excel workbooks or reopen saved datasets. The system maps inconsistent headers, normalizes inventory records, recovers missing supplier names, and calculates aging, risk and provision measures. Organization, supplier, division, item and provision views share cascading filters. Dataset history is stored in Cloud Firestore; executive reports are generated in the browser.",
    "businessProblem": "Monthly ERP exports spread inventory across worksheets with inconsistent headers, merged cells, subtotals and incomplete supplier fields. Finance and supply-chain teams needed a consistent way to review aging stock, supplier concentration and provision exposure without repeatedly merging spreadsheets or circulating conflicting copies.",
    "whyItMattered": "A governed analysis workflow connects the source workbook, inventory rules, detailed ledger and management reports, helping teams inspect exposure and trace calculations back to inventory records.",
    "architecture": {
      "nodes": [
        {
          "name": "Next.js + React",
          "type": "Application and interface"
        },
        {
          "name": "Firebase Authentication + approval lifecycle",
          "type": "Google sign-in and governed access"
        },
        {
          "name": "SheetJS workbook ingestion",
          "type": "Multi-sheet parsing and dynamic header aliases"
        },
        {
          "name": "Normalization + supplier recovery",
          "type": "Two-pass description-based heuristic"
        },
        {
          "name": "Inventory calculation model",
          "type": "Aging, risk, provision and aggregate measures"
        },
        {
          "name": "Cloud Firestore + LZ-String",
          "type": "Compressed dataset storage and history"
        },
        {
          "name": "Cascading filters + analytical views",
          "type": "Organization, supplier, division, items and provision"
        },
        {
          "name": "Browser-generated reports",
          "type": "Excel, PDF and PowerPoint outputs"
        }
      ],
      "description": "Approved Google sign-in → upload or reopen a saved workbook dataset → SheetJS parsing and header mapping → normalization and supplier recovery → inventory calculations → filtered analytical views → browser-generated reports. Compressed datasets are saved in Cloud Firestore for later retrieval; local parsing does not mean that data never reaches cloud storage."
    },
    "features": [
      "Google sign-in with domain checks and administrator-reviewed pending, approved or rejected access",
      "Multi-sheet Excel ingestion with dynamic header aliases and division/sheet selection",
      "Data normalization and two-pass recovery of missing supplier names from descriptions",
      "Inventory value, quantity, slow-moving stock, at-risk stock and provision analysis",
      "Granular aging distributions, stacked aging charts, risk heatmaps and rule-based diagnostic insights",
      "Organization, supplier, division, all-items and provision perspectives",
      "Cascading division, organization and metric filters that update the analytical view",
      "Searchable, sortable and paginated ledgers with value/quantity toggles and risk badges",
      "Compressed cloud dataset history through My Data",
      "Browser-generated Excel workbooks, landscape PDF reports and PowerPoint presentations",
      "Dark/light theme, fullscreen mode and access/audit governance"
    ],
    "technologyLoadout": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Firebase Authentication",
      "Cloud Firestore",
      "Firebase Hosting",
      "SheetJS (xlsx)",
      "LZ-String",
      "Recharts / SVG",
      "jsPDF",
      "html2canvas",
      "PptxGenJS"
    ],
    "challenges": [
      {
        "issue": "Inconsistent workbook schemas",
        "investigation": "ERP worksheets used irregular header positions, field names, merged cells and subtotals; fixed column indexes could not reliably identify the inventory fields.",
        "solution": "Scan early worksheet rows with a dynamic alias dictionary, map inventory fields, and normalize records before calculating analytics."
      },
      {
        "issue": "Incomplete supplier information",
        "investigation": "Blank or placeholder supplier fields concealed concentration and aging exposure.",
        "solution": "Use a two-pass heuristic: build a description-to-supplier mapping from populated records, then match tokenized descriptions in incomplete rows. This is rule-based recovery, not AI inference."
      },
      {
        "issue": "Persisting large monthly datasets",
        "investigation": "Inventory JSON could exceed the Firestore document-size boundary.",
        "solution": "Compress datasets with LZ-String before cloud persistence and restore them through My Data. Keep dataset access aligned with the approved-user lifecycle."
      },
      {
        "issue": "Transparent aging and provision calculations",
        "investigation": "Manual formulas and separate reporting copies made financial exposure harder to reconcile.",
        "solution": "Apply the documented business rules consistently: half of the value in the five-to-seven-year band plus the full value beyond seven years contributes to the provision amount. Use the resulting analysis in dashboards and browser-generated reports."
      }
    ],
    "outcome": [
      "Delivered a deployed, access-controlled inventory analytics webapp for GAS Arabian Services",
      "Connected workbook ingestion, inventory normalization, aging analysis and executive reporting",
      "Made organization, supplier, division, item-level and provision perspectives available in one workflow",
      "Enabled approved users to reopen saved monthly datasets rather than repeatedly upload the same workbook",
      "Provided traceable provision rules and rule-based diagnostics alongside searchable analytical ledgers",
      "Delivered Excel, PDF and PowerPoint outputs without publishing confidential inventory values in this case study"
    ],
    "lessonsLearned": [
      "Spreadsheet analytics needs schema adaptation and supplier-data cleanup before visual presentation.",
      "Browser-based parsing and cloud persistence are separate responsibilities; access governance must cover stored datasets as well as sign-in.",
      "Explicit inventory rules, traceable ledgers and consistent reporting matter more than unverified speed or savings claims."
    ],
    "metrics": [
      {
        "number": "Governed",
        "caption": "Approved-user access"
      },
      {
        "number": "Traceable",
        "caption": "Inventory rules and ledgers"
      },
      {
        "number": "Reusable",
        "caption": "Cloud dataset history"
      }
    ],
    "preview": {
      "headline": "Inventory aging, risk and reporting in one workflow",
      "type": "GAS Arabian Services Inventory Analytics",
      "metrics": [
        "Governed access",
        "Cloud dataset history",
        "Multi-format reporting"
      ],
      "kpis": [
        {
          "label": "INGESTION",
          "value": "Multi-sheet Excel"
        },
        {
          "label": "ANALYTICS",
          "value": "Aging and provision"
        },
        {
          "label": "STORAGE",
          "value": "Cloud Firestore"
        },
        {
          "label": "REPORTING",
          "value": "Excel / PDF / PPT"
        }
      ]
    },
    "liveUrl": "https://data-visualisation-9de39.web.app"
  },
  {
    id: "mission-02",
    missionNumber: "MISSION 02",
    title: "CareerAI — AI Career Assistant",
    tagline: "AI-assisted resume generation, ATS keyword optimization, cover letter creation, and job search application",
    category: "AI",
    status: "IN PROGRESS",
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
    ],
    metrics: [
      { number: "10x", caption: "Faster Tailored Resume & Cover Creation" },
      { number: "+92%", caption: "ATS Keyword Match Accuracy" },
      { number: "< 2s", caption: "Gemini Flash Streaming Inference" }
    ],
    preview: {
      headline: "CareerAI Intelligent Application Hub",
      type: "AI-Powered SaaS Assistant",
      metrics: ["Gemini Flash Integration", "Real-Time ATS Scoring", "JSearch Job Aggregation"],
      kpis: [
        { label: "AI INFERENCE", value: "GEMINI FLASH" },
        { label: "SCHEMA VALIDATION", value: "STRICT JSON" },
        { label: "AUTH & BILLING", value: "FIREBASE SAAS" },
        { label: "PIPELINE LATENCY", value: "STREAMING" }
      ]
    }
  },
  {
    "id": "mission-03",
    "missionNumber": "MISSION 03",
    "title": "Quarterly Inventory Visualization — Analytics & Reporting Portal",
    "tagline": "A governed stock-take workflow from multi-sheet Excel reconciliation to evidence-backed executive reporting for GAS Arabian Services.",
    "category": "Analytics",
    "status": "COMPLETED",
    "difficulty": "★ ★ ★ ★ ★",
    "description": "A quarterly inventory intelligence and audit reconciliation portal for GAS Arabian Services, built with Next.js and React. Auditors move through upload, validation, dashboard analysis, pre-report preparation and report generation. Browser-side processing normalizes multi-sheet Excel records and applies deterministic calculations for count differences, shortages, excess stock, aging and provision exposure. Evidence, report design and preparer/checker/approver sign-off connect the analysis to PDF, editable PowerPoint and Excel deliverables. Firebase supports authentication, structured audit metadata, summaries and archives.",
    "businessProblem": "Quarterly stock-take records and ERP ledgers arrived in inconsistent spreadsheets with missing supplier fields, duplicate references, subtotal rows and summary tabs. Teams needed to reconcile physical counts against book records, investigate discrepancies, attach supporting evidence and prepare consistent management reports with a clear review and approval trail.",
    "whyItMattered": "The portal connects validation, reconciliation, investigation, evidence and sign-off in one audit workflow rather than treating report generation as a separate manual exercise.",
    "architecture": {
      "nodes": [
        {
          "name": "Next.js + React portal",
          "type": "Browser interface and staged audit workflow"
        },
        {
          "name": "Firebase Authentication + roles",
          "type": "Google sign-in, domain authorization and role-based access"
        },
        {
          "name": "SheetJS ingestion + alias mapping",
          "type": "Multi-sheet extraction and summary-tab exclusion"
        },
        {
          "name": "Data profiling + validation",
          "type": "Duplicate flags, supplier resolution and pre-calculation checks"
        },
        {
          "name": "Deterministic reconciliation model",
          "type": "Physical/book differences, shortage, excess, aging and provision"
        },
        {
          "name": "Analytical dashboard + item ledger",
          "type": "Division, supplier, issue, status, risk and text filters"
        },
        {
          "name": "Pre-report + evidence + sign-off",
          "type": "Cover design, session evidence, review and approval lock"
        },
        {
          "name": "Browser document generation",
          "type": "PDF, editable PowerPoint and Excel reconciliation"
        },
        {
          "name": "Firestore metadata + audit archives",
          "type": "Compressed summaries, historical records and audit events"
        }
      ],
      "description": "Authenticate → parse multi-sheet stock-take workbooks → profile and validate normalized records → calculate deterministic reconciliation measures → investigate filtered dashboard and ledger views → prepare narrative, evidence and sign-off → generate PDF, PowerPoint and Excel deliverables. Raw files and photo evidence are handled within the browser session; structured metadata and calculation summaries are persisted in Firestore. The same calculated model supports analysis and reporting."
    },
    "features": [
      "Google sign-in with domain authorization and Administrator, Auditor and Viewer roles",
      "Staged upload, validation, dashboard, pre-report and reporting journey",
      "Multi-sheet workbook parsing with header aliases, operational-sheet selection and summary-tab exclusion",
      "Data profiling, duplicate-reference flags and supplier fallback resolution",
      "Deterministic physical-count reconciliation, shortage/excess analysis, aging and provision rules",
      "Executive overview, division performance, supplier performance, financial risk and item-level investigation",
      "Organization, supplier, issue category, audit status, risk-level and text-search filters",
      "Paginated item ledger with discrepancy categories and physical-count remark tagging",
      "Pre-report cover designer, theme presets, executive commentary and live document preview",
      "Session-based evidence appendix and supplier evidence with browser-side image compression",
      "Prepared, checked and approved sign-off fields with an approval lock",
      "Executive PDF packages, editable PowerPoint presentations and Excel reconciliation exports",
      "Historical audit archives, role administration and append-only audit event records"
    ],
    "technologyLoadout": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Firebase Authentication",
      "Cloud Firestore",
      "Firebase Hosting",
      "SheetJS (xlsx)",
      "Custom SVG",
      "LZ-String",
      "jsPDF",
      "html2canvas",
      "PptxGenJS"
    ],
    "challenges": [
      {
        "issue": "Irregular spreadsheets and subtotal pollution",
        "investigation": "Stock-take workbooks mixed naming conventions, incomplete fields, summary tabs and subtotal rows with operational records.",
        "solution": "Map header aliases to a normalized schema, exclude summary tabs, profile duplicate references and resolve supplier metadata before the calculation stage."
      },
      {
        "issue": "Reconciliation before presentation",
        "investigation": "Physical counts and ERP quantities needed consistent interpretation across item, division and supplier views.",
        "solution": "Apply deterministic count-difference, shortage, excess, aging and provision calculations to validated records. Keep unverified items distinguishable and expose discrepancy categories in the ledger."
      },
      {
        "issue": "Connecting evidence to the report workflow",
        "investigation": "Financial discrepancies alone did not explain warehouse conditions, count-sheet issues or the review responsibility.",
        "solution": "Add a pre-report workspace for cover design, commentary, evidence appendices and supplier evidence. Compress session images in the browser and capture prepared, checked and approved sign-off fields."
      },
      {
        "issue": "Governed reporting with browser-side processing",
        "investigation": "The portal needed export generation, audit history and access control while minimizing server-side computational work.",
        "solution": "Generate PDF, editable PowerPoint and Excel deliverables in the browser. Persist compressed structured metadata and calculation summaries in Firestore, with role-based access, approval state and audit events."
      }
    ],
    "outcome": [
      "Delivered an integrated quarterly stock-take reconciliation and reporting workflow",
      "Connected data validation to division, supplier, financial-risk and item-level investigation",
      "Brought document design, evidence preparation and formal review into the same audit journey",
      "Produced executive PDF packages, editable presentations and Excel reconciliation workbooks",
      "Provided historical audit records and role-based governance around reporting",
      "Kept client values, identifiers, account details and evidence out of the public portfolio"
    ],
    "lessonsLearned": [
      "Validation and subtotal exclusion must happen before reconciliation; charts cannot compensate for polluted source records.",
      "An audit deliverable needs evidence, methodology and review responsibility alongside calculated measures.",
      "Browser-side computation and cloud metadata storage are complementary boundaries, not a promise of zero data transfer.",
      "A calculated model should drive both investigation and exports without separate copies of audit logic."
    ],
    "metrics": [
      {
        "number": "Validated",
        "caption": "Before calculation"
      },
      {
        "number": "Reviewed",
        "caption": "Evidence and sign-off"
      },
      {
        "number": "Traceable",
        "caption": "Reports and archives"
      }
    ],
    "preview": {
      "headline": "From stock-take records to a reviewed audit package",
      "type": "GAS Arabian Services Quarterly Inventory Portal",
      "metrics": [
        "Deterministic reconciliation",
        "Evidence and sign-off",
        "PDF / PowerPoint / Excel"
      ],
      "kpis": [
        {
          "label": "WORKFLOW",
          "value": "Upload to report"
        },
        {
          "label": "CALCULATIONS",
          "value": "Rule-driven"
        },
        {
          "label": "GOVERNANCE",
          "value": "Roles and sign-off"
        },
        {
          "label": "DELIVERABLES",
          "value": "PDF / PPTX / XLSX"
        }
      ]
    },
    "liveUrl": "https://inv-analytics-portal-58f8e.web.app"
  }
];
