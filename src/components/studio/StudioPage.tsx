import { ArrowGlyph } from './ArrowGlyph';
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../../data/projects';
import { PLAYER_PROFILE } from '../../data/player';
import { INVENTORY_CATEGORIES } from '../../data/inventory';
import { QUEST_LOG } from '../../data/timeline';
import { SystemLens } from './SystemLens';
import { ProjectVisual } from './ProjectVisual';
import { ProjectContact } from './ProjectContact';
import { projectOrder, projectPresentation, type ProjectId } from './projectPresentation';
import { TypewriterText } from './TypewriterText';
import { ProcessSection } from './ProcessSection';
import { LiquidTextMorph } from './LiquidTextMorph';
import { TechIconsRow } from './TechIconsRow';
import { FloatingNavBar } from './FloatingNavBar';
import { HeaderClock, HeaderLang } from './HeaderMeta';
const CaseStudy = lazy(() => import('./CaseStudy'));
const baseTitle = 'Sufiyan Ahmed — Independent Engineer · Web, Data & AI';
const services = [
  ['Web applications','Software built around how you work.','Internal tools, client portals and SaaS products with thoughtful interfaces, authentication and a dependable data layer.','React / Next.js / TypeScript'],
  ['Data & analytics','Make your information useful.','Excel ingestion, interactive dashboards and reporting systems that turn scattered data into a clear operational picture.','SheetJS / Python / Power BI'],
  ['Automation','Give repetitive work a better system.','Connected workflows, API integrations and automated reporting that reduce the manual steps between input and output.','APIs / n8n / Google Apps Script'],
  ['AI applications','Practical intelligence, built into the workflow.','Resume tools, assistants and structured LLM integrations with clear input boundaries and useful application outputs.','Gemini / Prompt workflows / Firebase'],
  ['Technical systems','A solid foundation for what comes next.','Application architecture, database design and integrations that keep responsibilities clear as a product grows.','System design / SQL / REST & GraphQL'],
];
function caseFromHash(): ProjectId | null {
  return projectOrder.find(id => location.hash === `#case/${projectPresentation[id].slug}`) ?? null;
}

export function StudioPage() {
  const [activeCase,setActiveCase] = useState<ProjectId|null>(caseFromHash);
  const [openTechCategory, setOpenTechCategory] = useState<string | null>(null);
  const [soundOn,setSoundOn] = useState(false);
  const [soundNotice,setSoundNotice] = useState('');
  const audio = useRef<typeof import('../../utils/soundManager')['soundManager'] | null>(null);
  const returnScroll = useRef<number|null>(null);
  const contactPending = useRef(false);
  const main = useRef<HTMLElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const phone = matchMedia('(max-width: 640px)');
    const update = () => element.classList.toggle('phone-glass-scrolled', phone.matches && scrollY > 16);
    const sync = () => {
      window.removeEventListener('scroll', update);
      if (phone.matches) window.addEventListener('scroll', update, { passive: true });
      update();
    };
    sync();
    phone.addEventListener('change', sync);
    return () => {
      window.removeEventListener('scroll', update);
      phone.removeEventListener('change', sync);
      element.classList.remove('phone-glass-scrolled');
    };
  }, []);
  const play = () => { if(soundOn && !matchMedia('(prefers-reduced-motion: reduce)').matches) audio.current?.playSound('CARD_CLICK'); };
  const toggleAudio = async () => {
    if (soundOn) { if(audio.current?.isSoundEnabled()) audio.current.toggleSound(); setSoundOn(false); return; }
    if(matchMedia('(prefers-reduced-motion: reduce)').matches) { setSoundNotice('Sound remains off with reduced motion enabled.'); return; }
    audio.current ??= (await import('../../utils/soundManager')).soundManager;
    audio.current.setVolume(.12);
    if(!audio.current.isSoundEnabled()) audio.current.toggleSound();
    await audio.current.unlock();
    const ready = audio.current.getDiagnostics().contextState === 'running';
    setSoundOn(ready); setSoundNotice(ready ? 'Subtle interaction sound enabled.' : 'Audio could not start. Try again to enable it.');
    if(ready) audio.current.playSound('CARD_CLICK');
  };
  const closeCase = useCallback(() => {
    if(returnScroll.current === null && !contactPending.current) returnScroll.current = Math.max(0, (document.getElementById('work')?.getBoundingClientRect().top ?? 0) + scrollY - 90);
    history.replaceState(null,'',`${location.pathname}${location.search}#${contactPending.current ? 'contact' : 'work'}`);
    setActiveCase(null);
  },[]);
  const openCase = (id: ProjectId) => {
    returnScroll.current = scrollY; play(); location.hash = `case/${projectPresentation[id].slug}`;
  };
  useEffect(() => {
    const hash = () => setActiveCase(caseFromHash());
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const motion = () => { if(preference.matches) { if(audio.current?.isSoundEnabled()) audio.current.toggleSound(); setSoundOn(false); } };
    window.addEventListener('hashchange',hash); preference.addEventListener('change',motion);
    return () => { window.removeEventListener('hashchange',hash); preference.removeEventListener('change',motion); audio.current?.setScene('PORTFOLIO'); };
  },[]);
  useEffect(() => {
    document.title = activeCase ? `${projectPresentation[activeCase].shortName} — Sufiyan Ahmed` : baseTitle;
    if(activeCase) return;
    const frame = requestAnimationFrame(() => {
      if(contactPending.current) { contactPending.current=false; document.getElementById('contact')?.scrollIntoView({behavior:'instant'}); }
      else if(returnScroll.current!==null) { window.scrollTo({top:returnScroll.current,behavior:'instant'}); returnScroll.current=null; }
    });
    return () => cancelAnimationFrame(frame);
  },[activeCase]);
  useEffect(() => {
    const elements = main.current?.querySelectorAll<HTMLElement>('[data-reveal]');
    if(!elements || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }),{threshold:.08});
    elements.forEach(element=>observer.observe(element));
    return ()=>observer.disconnect();
  },[]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="studio-header" ref={header}>
      <a className="wordmark notranslate" translate="no" href="#top" aria-label="Sufiyan Ahmed home">
        <span className="identity-mark" aria-hidden="true">s/a.</span>
        <span className="identity-name">Sufiyan Ahmed<small>INDEPENDENT ENGINEER</small></span>
      </a>

      {/* 1. Time in the exact middle of the header */}
      <HeaderClock />

      {/* 2. Language option placed between Time and Start a project */}
      <div className="header-right-group">
        <HeaderLang />
        <nav aria-label="Main navigation">
          <a className="header-cta" href="#contact">Start a project <span><ArrowGlyph/></span></a>
        </nav>
      </div>
    </header>
    <main id="main" ref={main}>
      <section id="top" className="studio-hero section-pad">
        <div className="hero-meta"><span>SUFIYAN AHMED / INDEPENDENT ENGINEERING</span><span>WEB / DATA / AUTOMATION / AI</span></div>
        <div className="hero-layout"><div className="hero-copy"><span className="hero-kicker">THOUGHTFULLY ENGINEERED.</span><h1><LiquidTextMorph statements={['Complexity,<br/>meet <em>clarity.</em>', 'Ambition,<br/>meet <em>momentum.</em>', 'Ideas,<br/>meet <em>execution.</em>']} /></h1><p>I’m Sufiyan Ahmed, a full-stack engineer building web applications, data systems and AI tools that make business work better.</p><div className="hero-actions"><a className="button" href="#work">View selected work <span>↓</span></a><a className="text-link" href="#contact">Start a project <span><ArrowGlyph/></span></a></div></div><SystemLens onInteract={play}/></div>
        <div className="hero-bottom"><span>ENGINEERING / DESIGN THINKING / REAL-WORLD IMPACT</span><a href="#work">Scroll to discover <span>↓</span></a></div>
      </section>
      <section className="studio-manifesto section-pad" aria-label="Engineering approach"><span className="eyebrow">THE IDEA BEHIND THE WORK</span><p>Make the complex<br/><span className="manifesto-outline">understandable.</span><br/>Make the useful <em>beautiful.</em></p><div className="manifesto-bottom"><span>Data → insight. Ideas → products.</span><p>I connect thoughtful interfaces with the engineering beneath them. So your software doesn’t just work. It makes work better.</p></div></section>
      <section id="work" className="selected-work section-pad"><div className="section-marker"><span><TypewriterText text="01 / SELECTED WORK"/></span><span>THREE SYSTEMS. REAL BUSINESS PROBLEMS.</span></div><div className="section-heading work-heading"><h2>Proof, in<br/><em>practice.</em></h2><p>From the spreadsheet to the interface.<br/>A selection of applications that turn complex workflows into clear, usable software.</p></div>
        {projectOrder.map((id,index)=>{const project=PROJECTS.find(item=>item.id===id)!;const presentation=projectPresentation[id];return <article key={id} className={`work-feature theme-${presentation.theme}`} data-reveal><a className="work-visual-link" href={`#case/${presentation.slug}`} aria-label={`View ${presentation.shortName} case study`} onClick={event=>{event.preventDefault();openCase(id);}}><ProjectVisual id={id}/></a><div className="work-caption"><div className="work-meta"><span>0{index+1} / {presentation.client}</span><span>{project.status==='COMPLETED'?'Completed':'In development'}</span></div><h3>{presentation.title}</h3><p>{presentation.summary}</p><span className="work-discipline">{presentation.discipline}</span><a href={`#case/${presentation.slug}`} className="case-link" onClick={event=>{event.preventDefault();openCase(id);}}>Explore case study <span aria-hidden="true"><ArrowGlyph/></span><span className="sr-only">: {presentation.shortName}</span></a></div></article>;})}
      </section>
      <section id="services" className="studio-services section-pad"><div className="section-marker"><span><TypewriterText text="02 / WHAT I CAN HELP WITH"/></span><span>FROM THE FIRST QUESTION TO THE WORKING PRODUCT</span></div><div className="section-heading"><h2>Your next chapter.<br/><em>Built together.</em></h2><p>You don’t need to arrive with a technical specification. A messy workflow, an underused dataset or an idea worth testing is a good starting point.</p></div><div className="service-list">{services.map(([title,lead,copy,tools],index)=><details key={title}><summary><span>0{index+1}</span><h3>{title}</h3><p>{lead}</p><b aria-hidden="true">+</b></summary><div className="service-detail"><div className="service-detail-left"><p>{copy}</p><a href="#contact">Let’s discuss it <ArrowGlyph/></a></div><div className="service-detail-right"><TechIconsRow items={tools.split(' / ').map(t=>t.trim())} className="service-tech-icons" /></div></div></details>)}</div></section>
      <ProcessSection />
      <section id="about" className="studio-about section-pad"><div className="section-marker"><span><TypewriterText text="04 / THE PERSON BEHIND THE WORK"/></span><span className="notranslate" translate="no">SUFIYAN AHMED</span></div><div className="about-layout"><div className="about-statement"><div className="about-art" aria-hidden="true"><span className="about-art-label">THE PERSON / THE PRACTICE</span><span className="about-monogram notranslate" translate="no">sa.</span><span className="about-art-footer">A curious mind.<br/>An engineering approach.</span><i/><i/><i/></div><h2>I like making<br/>complex things<br/><em>make sense.</em></h2></div><div className="about-copy"><p className="large-copy">{PLAYER_PROFILE.bio}</p><p>My work brings together full-stack engineering, data analysis and automation. I care about what happens after a feature ships: whether people can understand it, use it and keep building on it.</p><p>For me, the interface and the system are part of the same problem. Both should make the next step clearer.</p><a className="text-link" href="#contact">Work with me <ArrowGlyph/></a><div className="about-principles">{PLAYER_PROFILE.philosophy.slice(0,3).map(item=><div key={item.number}><span>{item.number}</span><strong>{item.title}</strong><p>{item.text}</p></div>)}</div></div></div>
        <details className="experience-disclosure"><summary>Project experience <span><ArrowGlyph/></span></summary><div>{QUEST_LOG.map(item=><article key={item.id}><span>{item.period}</span><div><h3>{item.title}</h3><strong>{item.role}</strong><p>{item.description}</p></div></article>)}</div></details>
        <div className="technology-block"><div><span className="eyebrow">THE RIGHT TOOLS FOR THE WORK</span><h3>Technical range.<br/>Practical application.</h3></div><div className="technology-groups">{INVENTORY_CATEGORIES.map(group=><details key={group.id} open={openTechCategory === group.id} onToggle={e=>{const isNowOpen = (e.currentTarget as HTMLDetailsElement).open; if(isNowOpen) setOpenTechCategory(group.id); else if(openTechCategory === group.id) setOpenTechCategory(null);}}><summary>{group.name}<span>+</span></summary><div className="technology-group-drawer"><TechIconsRow items={group.techList}/></div></details>)}</div></div>
      </section>
      <ProjectContact/>
    </main>
    <footer className="studio-footer"><a className="wordmark notranslate" translate="no" href="#top" aria-label="Sufiyan Ahmed — back to top">Sufiyan Ahmed<span aria-hidden="true"><ArrowGlyph/></span></a><span>Independent engineering. Thoughtfully built.</span><div><button aria-pressed={soundOn} onClick={()=>void toggleAudio()}>Sound {soundOn?'on':'off'}</button><span>© {new Date().getFullYear()}</span><a href="#top">Back to top ↑</a></div><span className="sr-only" role="status">{soundNotice}</span></footer>
    <FloatingNavBar activeCase={activeCase} onCloseCase={closeCase} />
    {activeCase&&<Suspense fallback={<div className="case-loading" role="status"><p>Opening case study…</p><button onClick={closeCase}>Back to work</button></div>}><CaseStudy key={activeCase} id={activeCase} onClose={closeCase} onContact={()=>{contactPending.current=true;closeCase();}}/></Suspense>}
  </>;
}
