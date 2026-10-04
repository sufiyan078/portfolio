import { ArrowGlyph } from './ArrowGlyph';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { contactEmail, createContactDraft, type ProjectBrief } from './contactDraft';
import { TypewriterText } from './TypewriterText';

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
    <div className="section-marker"><span><TypewriterText text="06 / LET’S TALK"/></span><span>A GOOD PLACE TO START</span></div>
    <div className="contact-layout"><div className="contact-intro"><h2>Have a problem<br/><em>worth solving?</em></h2><p>Tell me what you’re trying to build, automate or improve. We can start with the problem.</p><a className="contact-email notranslate" translate="no" href={`mailto:${contactEmail}`}>{contactEmail} <span><ArrowGlyph/></span></a><button className="text-link" onClick={() => void copy(contactEmail, 'Email address copied.')}>Copy email address</button><div className="contact-networks"><a href="https://linkedin.com/in/sufiyan-ahmed-66baa91b3" target="_blank" rel="noreferrer">LinkedIn <ArrowGlyph/></a><a href="https://github.com/sufiyan078" target="_blank" rel="noreferrer">GitHub <ArrowGlyph/></a></div></div>
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

