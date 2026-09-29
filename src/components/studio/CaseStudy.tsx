import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS } from '../../data/projects';
import { useModalLayer } from '../../hooks/useModalLayer';
import { useScrollTimeline } from '../story/useScrollTimeline';
import { ProjectVisual } from './ProjectVisual';
import { CaseTransformation } from './CaseTransformation';
import { projectPresentation, type ProjectId } from './projectPresentation';
import { TechIconsRow } from './TechIconsRow';

function CaseSystem({ id }: { id: ProjectId }) {
  const stage = useRef<HTMLDivElement>(null), track = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const update = useCallback((progress: number, reduced: boolean) => {
    const host = stage.current; if (!host) return;
    const staticView = reduced || window.innerHeight <= 740;
    const active = staticView ? 4 : Math.min(4, Math.floor(progress * 5));
    setStep(current => current === active ? current : active);
    host.style.setProperty('--system-progress', String(staticView ? 1 : progress));
  }, []);
  useScrollTimeline(track, update);
  const captions = id === 'mission-02' ? [
    ['The inputs', 'Resume and job description establish the context.'], ['Structure', 'The prompt construction layer prepares a consistent request.'], ['Intelligence', 'Gemini Flash processes the request through the Gemini API.'], ['Application', 'Structured responses support ATS analysis, resume optimization and cover letters.'], ['The result', 'A connected career workflow, with JSearch, authentication, database and billing integration.'],
  ] : [
    ['The inputs', 'An Excel workbook enters an authenticated application.'], ['Structure', 'SheetJS parses the workbook. Fields are cleaned, normalized and validated.'], ['Logic', id === 'mission-03' ? 'Explicit business rules and reconciliation checks produce dependable inventory metrics.' : 'Audit calculations distinguish missing information from valid zero counts.'], ['Application', id === 'mission-03' ? 'A shared report model feeds the dashboard, PDF and PowerPoint outputs.' : 'Charts, analytical tables, search and filters make the model useful.'], ['The result', id === 'mission-03' ? 'One set of calculations, consistent across three reporting formats.' : 'Private, browser-based monthly inventory analysis.'],
  ];
  return <div className="case-system-track" ref={track}><div className="case-system-stage" ref={stage}>
    <div className="case-system-caption"><span className="eyebrow">SYSTEM LENS / 0{step+1}</span><h3>{captions[step][0]}</h3><p>{captions[step][1]}</p><span className="scroll-instruction">Scroll to follow the system ↓</span></div>
    <CaseTransformation id={id}/>
  </div></div>;
}

export default function CaseStudy({ id, onClose, onContact }: { id: ProjectId; onClose: () => void; onContact: () => void }) {
  const project = PROJECTS.find(item => item.id === id)!;
  const presentation = projectPresentation[id];
  const modal = useRef<HTMLDivElement>(null);
  useModalLayer(true, modal);
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if(event.key==='Escape') onClose(); };
    window.addEventListener('keydown',key);
    return ()=>window.removeEventListener('keydown',key);
  },[onClose]);
  return createPortal(<div className={`case-study theme-${presentation.theme}`} ref={modal} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="case-title" data-story-scroll-root>
    <header className="case-nav"><button onClick={onClose}>← Back to selected work</button><span>SUFIYAN AHMED / CASE STUDY</span><button onClick={onContact}>Discuss a similar project ↗</button></header>
    <div className="case-intro section-pad"><span className="eyebrow">{presentation.client} / {project.status === 'COMPLETED' ? 'COMPLETED' : 'IN DEVELOPMENT'}</span><h1 id="case-title">{presentation.title}</h1><p>{project.title}</p><TechIconsRow items={project.technologyLoadout} /></div>
    <ProjectVisual id={id}/>
    <section className="case-context section-pad"><div><span className="eyebrow">01 / THE PROBLEM</span><h2>{presentation.principle}</h2></div><div><p className="case-lead">{project.businessProblem}</p><h3>Context</h3><p>{project.description}</p><h3>The approach</h3><p>{presentation.approach}</p></div></section>
    <section className="case-architecture section-pad"><div className="section-marker"><span>02 / FOLLOW THE SYSTEM</span><span>FROM INPUT TO OUTCOME</span></div><CaseSystem id={id}/><details className="architecture-reference"><summary>Explore the complete architecture <span>+</span></summary><ol>{project.architecture.nodes.map((node,index)=><li key={node.name}><span>{String(index+1).padStart(2, '0')}</span><strong>{node.name}</strong><small>{node.type}</small></li>)}</ol><p>{project.architecture.description}</p></details></section>
    <section className="case-details section-pad"><div className="section-heading"><span className="eyebrow">03 / ENGINEERING DECISIONS</span><h2>The work beneath<br/>the interface.</h2></div>{project.challenges.map((challenge,i)=><details key={challenge.issue} open={i===0}><summary><span>0{i+1}</span>{challenge.issue}<b aria-hidden="true">+</b></summary><div><h3>Investigation</h3><p>{challenge.investigation}</p><h3>Implementation</h3><p>{challenge.solution}</p></div></details>)}</section>
    <section className="case-results section-pad"><span className="eyebrow">04 / OUTCOME</span><h2>{project.preview.headline}</h2><div className="case-metrics">{project.metrics.map(metric=><div key={metric.caption}><strong>{metric.number}</strong><span>{metric.caption}</span></div>)}</div><ul>{project.outcome.map(outcome=><li key={outcome}>{outcome}</li>)}</ul><details><summary>Full functionality & lessons learned <span>+</span></summary><div className="case-features"><div><h3>Functionality</h3><ul>{project.features.map(feature=><li key={feature}>{feature}</li>)}</ul></div><div><h3>What this project taught me</h3>{project.lessonsLearned.map(lesson=><p key={lesson}>{lesson}</p>)}</div></div></details>{project.liveUrl&&<a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">View live project ↗</a>}{project.githubUrl&&<a className="text-link" href={project.githubUrl} target="_blank" rel="noreferrer">View source ↗</a>}</section>
    <footer className="case-footer section-pad"><span className="eyebrow">FROM THIS SYSTEM TO YOURS</span><h2>Working through<br/>a similar problem?</h2><button className="button" onClick={onContact}>Start a conversation <span>↗</span></button><button className="text-link" onClick={onClose}>Return to selected work</button></footer>
  </div>, document.body);
}


