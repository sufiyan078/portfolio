export const contactEmail = 'hello@sufiyanahmed.com';
export type ProjectBrief = { name: string; email: string; category: string; budget: string; brief: string };
export function createContactDraft(values: ProjectBrief) {
  const subject = `[PROJECT INQUIRY] ${values.category} - ${values.name.trim()}`;
  const body = `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\nProject type: ${values.category}\nBudget: ${values.budget}\n\nProject brief:\n${values.brief.trim()}\n`;
  return { subject, body, href: `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}
