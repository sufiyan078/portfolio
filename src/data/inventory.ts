export interface InventoryItem {
  id: string;
  name: string;
  category: 'Analytical Tools' | 'Data Libraries' | 'Visualization Tools' | 'Machine Learning';
  rarity: 'Legendary' | 'Epic' | 'Rare' | 'Common';
  mastery: number;
  description: string;
  projectsUsed: string[];
  iconName: string;
}

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "inv-excel",
    name: "Microsoft Excel",
    category: "Analytical Tools",
    rarity: "Legendary",
    mastery: 98,
    description: "Advanced formulas, Power Query, Pivot Tables, data modeling, VBA macros, and automated reporting.",
    projectsUsed: ["Financial Analysis", "Inventory Dashboards", "Data Modeling"],
    iconName: "FileSpreadsheet"
  },
  {
    id: "inv-python",
    name: "Python",
    category: "Analytical Tools",
    rarity: "Legendary",
    mastery: 96,
    description: "Core data analysis, scripting, automated data ingestion pipelines, web scraping, and algorithmic modeling.",
    projectsUsed: ["Data Ingestion", "Web Scraping", "Analytics Engines"],
    iconName: "Code"
  },
  {
    id: "inv-postgres",
    name: "PostgreSQL",
    category: "Analytical Tools",
    rarity: "Legendary",
    mastery: 94,
    description: "Complex relational queries, CTEs, window functions, indexing, schema design, and query optimization.",
    projectsUsed: ["Relational Databases", "Analytics Warehouses"],
    iconName: "Server"
  },
  {
    id: "inv-pandas-numpy",
    name: "Pandas & NumPy",
    category: "Data Libraries",
    rarity: "Epic",
    mastery: 95,
    description: "DataFrame manipulations, matrix computing, data cleaning, aggregation, missing value handling, and transformation.",
    projectsUsed: ["Exploratory Data Analysis", "Dataset Processing"],
    iconName: "FileText"
  },
  {
    id: "inv-viz-libs",
    name: "Matplotlib & Seaborn",
    category: "Data Libraries",
    rarity: "Epic",
    mastery: 92,
    description: "Custom statistical charts, heatmaps, correlation matrices, trend lines, and publication-grade data graphics.",
    projectsUsed: ["Visual EDA Reports", "Insight Dashboards"],
    iconName: "Palette"
  },
  {
    id: "inv-scraping",
    name: "Web Scraping Libraries",
    category: "Data Libraries",
    rarity: "Rare",
    mastery: 90,
    description: "Automated web data extraction using BeautifulSoup & Scrapy for gathering market intelligence and unstructured data.",
    projectsUsed: ["Automated Data Extraction", "Market Intelligence"],
    iconName: "FileCode"
  },
  {
    id: "inv-tableau-powerbi",
    name: "Tableau & Power BI",
    category: "Visualization Tools",
    rarity: "Epic",
    mastery: 96,
    description: "Interactive executive dashboard creation, DAX measures, parameters, data storytelling, and business KPI monitoring.",
    projectsUsed: ["Executive BI Portals", "KPI Dashboards"],
    iconName: "FileSpreadsheet"
  },
  {
    id: "inv-ml",
    name: "Machine Learning (Scikit-Learn)",
    category: "Machine Learning",
    rarity: "Rare",
    mastery: 90,
    description: "Predictive modeling, regression, decision trees, random forests, classification, clustering, and evaluation metrics.",
    projectsUsed: ["Predictive Analytics", "Classification Models"],
    iconName: "Cpu"
  }
];
