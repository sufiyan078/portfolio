export interface BossBattle {
  id: string;
  bossName: string;
  title: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  category: string;
  symptoms: string[];
  problem: string;
  investigation: string;
  rootCause: string;
  solution: string;
  outcome: string;
  takeaway: string;
  reward: string;
}

export const BOSS_BATTLES: BossBattle[] = [
  {
    id: "boss-01",
    bossName: "The Double Calculation Bug",
    title: "Inventory Totals Doubled After Excel Uploads",
    threatLevel: "CRITICAL",
    category: "Data Integrity & Calculation Engine",
    symptoms: [
      "Dashboard inventory valuation totals did not match source Excel file figures",
      "Calculations doubled stock quantities upon re-uploading file datasets",
      "Exported PDF reports reflected duplicated inventory figures"
    ],
    problem: "Inventory valuation metrics were incorrectly doubled after new Excel inventory files were uploaded to the portal.",
    investigation: "Traced data processing flow from Excel file parse boundary down into calculation state hooks. Discovered that secondary calculation passes re-processed already-aggregated records without clearing transient state.",
    rootCause: "Calculation pipeline lacked deterministic state reset boundaries between file ingestion events, causing newly parsed rows to accumulate onto previous calculation state buffers.",
    solution: "Implemented a deterministic calculation pipeline with explicit state resets prior to ingestion, enforcing atomic calculation passes.",
    outcome: "Dashboard metrics, PDF exports, and source Excel file totals reconciled with 100% data accuracy.",
    takeaway: "Reliable analytics systems require deterministic data pipelines with clear state reset boundaries.",
    reward: "Data Integrity Achievement"
  },
  {
    id: "boss-02",
    bossName: "Verification Accuracy Challenge",
    title: "Zero-Quantity Inventory Edge Case Discrepancy",
    threatLevel: "HIGH",
    category: "Business Validation Engine",
    symptoms: [
      "Verified stock values excluded valid items that had zero current quantity",
      "Financial calculations misaligned with expected audit verification figures",
      "Validation warnings failed to highlight legitimate out-of-stock items"
    ],
    problem: "Verified inventory values failed to count valid zero-quantity item records during compliance reconciliation.",
    investigation: "Audited validation engine rule logic. Found an edge case in business rule condition evaluating valid 0-quantity numeric fields using generic falsy checks (`if (!quantity)`).",
    rootCause: "Validation logic treated numeric 0 identically to missing or undefined data attributes.",
    solution: "Implemented precise rule corrections distinguishing valid numerical 0 stock levels from missing or corrupt data fields.",
    outcome: "Financial metrics and verified record counts aligned precisely with expected audit totals.",
    takeaway: "Small business rule assumptions in validation logic can cause major data discrepancies.",
    reward: "Precision Engineering Badge"
  },
  {
    id: "boss-03",
    bossName: "Report Export Consistency",
    title: "Multi-Format Output Rendering Drift",
    threatLevel: "HIGH",
    category: "Reporting System Architecture",
    symptoms: [
      "Exported PDF reports differed visually and numerically from active dashboard metrics",
      "PowerPoint summary slides contained outdated calculations relative to live view",
      "Redundant maintenance required whenever business rule logic updated"
    ],
    problem: "Different output channels (Interactive Dashboard, PDF Generator, PowerPoint Exporter) occasionally rendered conflicting values.",
    investigation: "Found that each export renderer executed its own separate data aggregation logic path independently.",
    rootCause: "Absence of a single source of truth architecture caused separate render paths to drift over time.",
    solution: "Architected a Shared Report Model where a single calculation engine produces data structures consumed identically across all output targets.",
    outcome: "Dashboard views, PDF exports, and PowerPoint decks became perfectly synchronized.",
    takeaway: "Single Source of Truth architecture prevents system drift across multiple output mediums.",
    reward: "Reporting Engine Achievement"
  }
];
