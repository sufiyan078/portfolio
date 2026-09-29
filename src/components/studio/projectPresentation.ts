/** Editorial presentation only. Project facts stay in data/projects.ts. */
export const projectPresentation = {
  'mission-01': {
    slug: 'monthly-inventory', client: 'GAS Arabian Services', theme: 'sage',
    title: 'A clearer picture of inventory.', shortName: 'Monthly inventory audit',
    summary: 'From monthly Excel workbooks to a private, browser-based audit dashboard. Less spreadsheet handling. More room for the work that matters.',
    discipline: 'Data systems / Web application', principle: 'Keep sensitive data where it belongs.',
    approach: 'Parse and normalize workbooks locally, distinguish zero counts from missing values, and turn the validated model into interactive audit KPIs.',
  },
  'mission-02': {
    slug: 'career-ai', client: 'CareerAI', theme: 'lilac',
    title: 'Better applications. Less repetition.', shortName: 'CareerAI',
    summary: 'A connected workflow for resume creation, ATS analysis, tailored cover letters and job discovery. Built around useful, structured AI output.',
    discipline: 'AI application / Product engineering', principle: 'Give intelligence a useful structure.',
    approach: 'Combine resume and job-description context in structured prompts, stream Gemini Flash responses, and separate ATS analysis from content generation.',
  },
  'mission-03': {
    slug: 'quarterly-reporting', client: 'GAS Arabian Services', theme: 'stone',
    title: 'One model. Every report.', shortName: 'Quarterly inventory intelligence',
    summary: 'An inventory intelligence system that connects validated Excel data to dashboards, PDF reports and PowerPoint. One source of truth across every output.',
    discipline: 'Business intelligence / Automation', principle: 'Calculate once. Communicate consistently.',
    approach: 'Normalize and reconcile source workbooks, apply explicit business rules, and calculate a shared report model before rendering any output.',
  },
} as const;
export type ProjectId = keyof typeof projectPresentation;
export const projectOrder: ProjectId[] = ['mission-01', 'mission-03', 'mission-02'];
