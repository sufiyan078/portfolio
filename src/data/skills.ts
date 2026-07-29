export interface SkillAbility {
  id: string;
  name: string;
  category: 'Analytical Tools' | 'Data Libraries' | 'Data Visualization' | 'Machine Learning';
  level: 'Mastered' | 'Advanced' | 'Intermediate';
  percentage: number;
  description: string;
  projectsUsed: string[];
}

export const SKILLS: SkillAbility[] = [
  {
    id: "sk-analytical-tools",
    name: "Analytical Tools",
    category: "Analytical Tools",
    level: "Mastered",
    percentage: 96,
    description: "Advanced data manipulation, complex SQL queries, relational database modeling, and spreadsheet engineering.",
    projectsUsed: ["Microsoft Excel", "Python", "PostgreSQL"]
  },
  {
    id: "sk-viz-libraries",
    name: "Data Analysis & Science Libraries",
    category: "Data Libraries",
    level: "Mastered",
    percentage: 94,
    description: "Exploratory data analysis (EDA), web scraping, statistical data visualization, data cleaning, and feature engineering.",
    projectsUsed: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Web Scraping", "Scikit-Learn"]
  },
  {
    id: "sk-viz-tools",
    name: "Data Visualization Tools",
    category: "Data Visualization",
    level: "Mastered",
    percentage: 95,
    description: "Executive dashboard design, KPI tracking, DAX calculations, interactive story points, and visual data storytelling.",
    projectsUsed: ["Tableau", "Power BI"]
  },
  {
    id: "sk-ml",
    name: "Machine Learning & Modeling",
    category: "Machine Learning",
    level: "Advanced",
    percentage: 90,
    description: "Supervised & unsupervised learning, classification, regression, model validation, and predictive analytics pipelines.",
    projectsUsed: ["Scikit-Learn", "Python", "Predictive Modeling"]
  }
];
