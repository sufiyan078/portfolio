export interface Principle {
  id: string;
  number: string;
  title: string;
  statement: string;
  category: string;
  icon: string;
}

export const ENGINEERING_PRINCIPLES: Principle[] = [
  {
    id: "principle-01",
    number: "APPROACH 01",
    title: "Maintainability",
    statement: "I prefer explicit, readable system architecture over clever or overly complex implementations. Code should remain easy to extend, debug, and maintain long after it is written.",
    category: "CODE QUALITY",
    icon: "Wrench"
  },
  {
    id: "principle-02",
    number: "APPROACH 02",
    title: "Workflow Automation",
    statement: "If repetitive manual work can be safely automated, it should be. Software should eliminate operational friction, reduce human oversight errors, and streamline recurring workflows.",
    category: "EFFICIENCY",
    icon: "Cog"
  },
  {
    id: "principle-03",
    number: "APPROACH 03",
    title: "Data Integrity",
    statement: "Every dashboard and report must be traceable back to its underlying source data. Validation logic belongs inside system boundaries rather than relying on manual verification.",
    category: "RELIABILITY",
    icon: "CheckCircle2"
  },
  {
    id: "principle-04",
    number: "APPROACH 04",
    title: "System Architecture",
    statement: "Applications should be organized around clear separation of responsibilities. Decoupling data ingestion, business logic, and presentation layers allows features to evolve cleanly.",
    category: "ARCHITECTURE",
    icon: "Layers"
  },
  {
    id: "principle-05",
    number: "APPROACH 05",
    title: "Business Outcomes",
    statement: "Technology succeeds when it reduces operational effort, enforces audit consistency, or enables faster decision-making. Software is built to serve clear business outcomes.",
    category: "VALUE DELIVERY",
    icon: "Target"
  }
];
