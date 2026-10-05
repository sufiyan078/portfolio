/** Editorial presentation only. Project facts stay in data/projects.ts. */
export const projectPresentation = {
  'mission-01': {
    slug: 'monthly-inventory', client: 'Enterprise Client', theme: 'sage',
    title: 'A clearer picture of inventory.', shortName: 'Monthly inventory visualization',
    summary: 'From multi-division Excel exports to inventory aging, risk and provision analysis. Governed dataset history and executive reports connect the whole workflow.',
    discipline: 'Inventory analytics / Business intelligence', principle: 'Make inventory exposure understandable.',
    approach: 'Map irregular workbook schemas, normalize records and recover missing suppliers before applying explicit inventory rules. Connect the analysis to cascading filters, approved-user cloud dataset history, and Excel, PDF and PowerPoint reports.',
  },
  'mission-02': {
    slug: 'career-ai', client: 'CareerAI', theme: 'lilac',
    title: 'Better applications. Less repetition.', shortName: 'CareerAI',
    summary: 'A connected workflow for resume creation, ATS analysis, tailored cover letters and job discovery. Built around useful, structured AI output.',
    discipline: 'AI application / Product engineering', principle: 'Give intelligence a useful structure.',
    approach: 'Combine resume and job-description context in structured prompts, stream Gemini Flash responses, and separate ATS analysis from content generation.',
  },
  'mission-03': {
    slug: 'quarterly-reporting', client: 'Enterprise Client', theme: 'stone',
    title: 'One model. Every report.', shortName: 'Quarterly inventory visualization',
    summary: 'A quarterly stock-take workflow connecting Excel validation, reconciliation, discrepancy investigation, evidence and sign-off to executive reports.',
    discipline: 'Audit reconciliation / Reporting', principle: 'Validate. Reconcile. Review.',
    approach: 'Normalize workbook schemas, exclude summary tabs and profile records before deterministic stock-count reconciliation. Connect filtered investigation to evidence, report design and sign-off, then generate PDF, editable PowerPoint and Excel deliverables from the calculated model.',
  },
} as const;
export type ProjectId = keyof typeof projectPresentation;
export const projectOrder: ProjectId[] = ['mission-01', 'mission-03', 'mission-02'];
