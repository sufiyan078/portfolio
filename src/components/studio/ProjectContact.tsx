import { ArrowGlyph } from './ArrowGlyph';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { contactEmail, createContactDraft, type ProjectBrief } from './contactDraft';

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

export function ProjectContact() {
  const [values, setValues] = useState<ProjectBrief>({ name: '', email: '', category: 'Custom Web Application', budget: 'Other / Flexible', brief: '' });
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('');
  const review = useRef<HTMLDivElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const edited = useRef(false);
  useEffect(() => {
    if (ready) review.current?.focus({ preventScroll: true });
    else if (edited.current) nameInput.current?.focus({ preventScroll: true });
  }, [ready]);
  const update = (key: keyof ProjectBrief, value: string) => setValues(current => ({ ...current, [key]: value }));
  const draft = createContactDraft(values);
  const prepare = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.name.trim() || !values.brief.trim()) { setMessage('Please add your name and a short project brief.'); return; }
    setMessage(''); setReady(true);
  };
  const copy = async (text: string, success: string) => {
    try { await navigator.clipboard.writeText(text); setMessage(success); }
    catch { setMessage('Clipboard unavailable. You can select and copy the text instead.'); }
  };
  return <section id="contact" className="studio-contact section-pad">
    <div className="section-marker contact-section-marker">
      <div className="contact-marker-tab">
        <span className="section-pill">Contact</span>
      </div>
      <span className="contact-marker-tagline">A GOOD PLACE TO START</span>
    </div>
    <div className="contact-layout"><div className="contact-intro"><h2>Have a problem<br/><em>worth solving?</em></h2><p>Tell me what you’re trying to build, automate or improve. We can start with the problem.</p><a className="contact-email notranslate" translate="no" href={`mailto:${contactEmail}`}>{contactEmail} <span><ArrowGlyph/></span></a><button className="text-link" onClick={() => void copy(contactEmail, 'Email address copied.')}>Copy email address</button><div className="contact-networks" aria-label="Professional networks"><a href="https://linkedin.com/in/sufiyan-ahmed-66baa91b3" target="_blank" rel="noreferrer" className="contact-network-chip" aria-label="LinkedIn profile" title="LinkedIn"><LinkedInIcon /></a><a href="https://github.com/sufiyan078" target="_blank" rel="noreferrer" className="contact-network-chip" aria-label="GitHub profile" title="GitHub"><GitHubIcon /></a></div></div>
      <div className="contact-form-wrap">{!ready ? <form onSubmit={prepare} aria-label="Project inquiry">
        <div className="form-title"><h3>A little about your project.</h3><span>01 / BRIEF</span></div>
        <div className="form-pair"><label>Your name<input ref={nameInput} name="name" autoComplete="name" required maxLength={100} value={values.name} onChange={e => update('name', e.target.value)} placeholder="Alex Morgan"/></label><label>Email address<input name="email" autoComplete="email" type="email" required maxLength={254} value={values.email} onChange={e => update('email', e.target.value)} placeholder="alex@company.com"/></label></div>
        <div className="form-pair"><label>What do you need?<select value={values.category} onChange={e => update('category', e.target.value)}>{['Custom Web Application','AI Agents & Automation','Dashboard & Analytics Portal','Full SaaS MVP Development','Full-Time Engineering Role','System Optimization / Audit','Others'].map(label=><option key={label} value={label}>{label}</option>)}</select></label><label>Budget range<select value={values.budget} onChange={e => update('budget', e.target.value)}>{['Other / Flexible','<$2,500','$2,500 - $5,000','$5,000 - $10,000','$10,000+','Full-Time Compensation'].map(label=><option key={label} value={label}>{label}</option>)}</select></label></div>
        <label>What are you trying to solve?<textarea name="brief" required maxLength={2000} rows={4} value={values.brief} onChange={e => update('brief', e.target.value)} placeholder="The problem, who it’s for, and what a useful outcome looks like…"/></label>
        <button className="button button-light" type="submit">Prepare project brief <span><ArrowGlyph/></span></button><p className="form-note">This prepares a draft in your email app. You review and send it.</p>
      </form> : <div className="draft-review" ref={review} tabIndex={-1} aria-label="Review your project brief"><span className="eyebrow">02 / REVIEW</span><h3>Your brief is ready.</h3><p>Nothing has been sent. Review your brief, then open your email app to send it.</p><div className="draft-preview notranslate" translate="no"><strong>{values.category}</strong><span>{values.name} · {values.email}</span><p>{values.brief}</p><span>Budget: {values.budget}</span></div><a className="button button-light" href={draft.href}>Open email app <span><ArrowGlyph/></span></a><div className="review-actions"><button className="text-link" onClick={()=>void copy(`To: ${contactEmail}\nSubject: ${draft.subject}\n\n${draft.body}`, 'Brief copied. Paste it into your email app.')}>Copy brief</button><button className="text-link" onClick={()=>{edited.current=true;setReady(false);setMessage('');}}>Edit brief</button></div></div>}
      <p className="form-feedback" role="status">{message}</p></div>
    </div>
  </section>;
}

