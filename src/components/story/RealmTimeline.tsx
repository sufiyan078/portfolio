import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS } from '../../data/projects';
import { PROFILE, BUILDER_PROFILE } from '../../data/profile';
import { ENGINEERING_PRINCIPLES } from '../../data/principles';
import { FileCode2, Database, ShieldCheck, Layers, BarChart3, Bot } from '../ui/RealmIcons';
import { MissionControlSection } from '../MissionControlSection';
import { ContactSection } from '../ContactSection';
import { PlayerProfileSection } from '../PlayerProfileSection';
import { InventorySkillsSection } from '../InventorySkillsSection';
import { BossBattlesSection } from '../BossBattlesSection';
import { AchievementsSection } from '../AchievementsSection';
import { QuestLogSection } from '../QuestLogSection';
import { EngineeringPrinciplesSection } from '../EngineeringPrinciplesSection';
import { useModalLayer } from '../../hooks/useModalLayer';
import { getUniversalAudioProps } from '../../utils/soundEffects';
import { useScrollTimeline } from './useScrollTimeline';
import { blendShape, captionOpacity, filmSegment, smooth, worldShape, WORLD_STOPS } from './timelineMath';
import { revealStoryTarget } from './navigation';
import './story.css';

const beats = [
  { at:0, id:'hero', label:'THE CODE REALM / SYSTEM ONLINE', title:'SUFIYAN AHMED', text:'Full Stack Engineer & System Architect', detail:'Data-driven software. Automation. Dashboards. AI-powered products.' },
  { at:.115, id:'builder', label:'UNDERSTAND THE WORK', title:'Every system starts with a real problem.', text:'A workbook to audit. A report to prepare. A process that asks people to do the same work again.', detail:'Business context → repeatable workflow' },
  { at:.215, id:'validation', label:'MAKE THE DATA TRUSTWORTHY', title:'Find structure in the noise.', text:'Fields become consistent. Validation distinguishes missing information from meaningful values. The same rows become a model.', detail:'Ingestion → normalization → validation' },
  { at:.305, id:'capabilities', label:'CONNECT THE CAPABILITIES', title:'A system is more than its screen.', text:'Data processing, business logic and interfaces work together. The validated model now becomes something a person can use.', detail:'Full-stack development · analytics · automation · AI applications' },
  { at:.405, id:'projects', label:'THREE APPLICATIONS / REAL WORKFLOWS', title:'The work takes three forms.', text:'Monthly inventory audits. AI-assisted career documents. Quarterly analytics and reporting.', detail:'Inventory analytics · career tools · executive reporting' },
  { at:.505, id:'missions', label:'AN OPTIONAL DOORWAY', title:'Look deeper. Or keep going.', text:'The gate opens the Mission Vault, where you choose a technical case study. The main story continues beyond it.', detail:'Click the gate, or focus it and press Enter / Space.' },
  { at:.605, id:'architecture', label:'FOLLOW THE RESPONSIBILITIES', title:'Beneath the interface, the system connects.', text:'The project paths become the architecture. Follow authentication, input, processing and delivery through a real application.', detail:'Choose a project to trace its actual implementation.' },
  { at:.705, id:'system', label:'FROM INPUT TO OUTPUT', title:'Different problems. Different architectures.', text:'CareerAI uses Gemini Flash. Inventory reporting uses explicit business rules. Each layer has a specific responsibility.', detail:'Browser-first inventory processing. API-backed career tools.' },
  { at:.805, id:'principles', label:'THE DECISIONS THAT HOLD IT TOGETHER', title:'Build for the work that comes next.', text:'Readable architecture. Repeatable workflows. Traceable data. Clear boundaries. Useful business outcomes.', detail:'Engineering principles turn a working application into a maintainable system.' },
  { at:.895, id:'profile', label:'THE ENGINEER BEHIND THE SYSTEM', title:'Sufiyan Ahmed.', text:PROFILE.bio, detail:BUILDER_PROFILE.roles.join(' · ') },
  { at:.975, id:'signal', label:'THE NEXT CONVERSATION', title:'Let’s build something useful.', text:'The system becomes a connection. Bring the business problem, the workflow or the product you want to build.', detail:'Continue below to prepare a project brief or contact me directly.' },
];
const icons = [FileCode2,Database,ShieldCheck,Layers,BarChart3,Bot];
const captionStops = beats.map(beat => beat.at);
const fields = ['Item code','Description','Division','Supplier','Quantity','Closing value','Physical count','System quantity','Remarks','Resume','Job description','Requirements'];
const referenceTitles: Record<string,string> = { inventory:'Abilities & technology', 'boss-battles':'Engineering challenges', achievements:'Professional capabilities', 'quest-log':'Professional journey', profile:'Professional profile', principles:'Engineering principles' };

export function RealmTimeline({ inventoryTab, onInventoryTab, onSectionChange, onOpenTerminal }: {
  inventoryTab:'abilities'|'inventory'; onInventoryTab:(tab:'abilities'|'inventory')=>void; onSectionChange:(id:string)=>void; onOpenTerminal:()=>void;
}) {
  const trackRef = useRef<HTMLDivElement>(null), stageRef = useRef<HTMLDivElement>(null), modalRef = useRef<HTMLDivElement>(null);
  const [beat,setBeat] = useState(0), [selected,setSelected] = useState(0), [gateVisible,setGateVisible] = useState(false);
  const [reading,setReading] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [reference,setReference] = useState<string|null>(null);
  const pendingTarget = useRef<string|null>(null);
  useModalLayer(!!reference,modalRef);
  useEffect(() => {
    if (reference || !pendingTarget.current) return;
    const target = pendingTarget.current; pendingTarget.current = null;
    const frame = requestAnimationFrame(() => revealStoryTarget(target));
    return () => cancelAnimationFrame(frame);
  },[reference,reading]);
  useEffect(() => {
    const open = (event:Event) => setReference((event as CustomEvent<string>).detail);
    const leave = (event:Event) => { pendingTarget.current=(event as CustomEvent<string>).detail; setReference(null); };
    const key = (event:KeyboardEvent) => { if (event.key==='Escape') setReference(null); };
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const motion = () => setReading(preference.matches);
    const hash = () => { try { if(location.hash) revealStoryTarget(decodeURIComponent(location.hash.slice(1))); } catch { /* Unknown or malformed anchors leave normal navigation available. */ } };
    window.addEventListener('realm:reference',open); window.addEventListener('realm:leave-reference',leave); window.addEventListener('keydown',key); window.addEventListener('hashchange',hash); preference.addEventListener('change',motion);
    hash();
    return () => { window.removeEventListener('realm:reference',open); window.removeEventListener('realm:leave-reference',leave); window.removeEventListener('keydown',key); window.removeEventListener('hashchange',hash); preference.removeEventListener('change',motion); };
  },[]);
  const update = useCallback((progress:number) => {
    const stage = stageRef.current; if (!stage) return;
    const segment = filmSegment(progress,WORLD_STOPS);
    const parts = [...stage.querySelectorAll<HTMLElement>('[data-world-part]')];
    const lines = [...stage.querySelectorAll<SVGLineElement>('.realm-flow-lines line')];
    const shapes = parts.map((part,i) => {
      const shape = blendShape(worldShape(i,segment.index,stage.clientWidth<=700),worldShape(i,segment.index+1,stage.clientWidth<=700),segment.fraction);
      part.style.left=`${shape.x}%`; part.style.top=`${shape.y}%`; part.style.width=`${shape.w}%`; part.style.height=`${shape.h}%`;
      part.style.opacity=String(shape.alpha); part.style.borderRadius=`${shape.round}px`;
      return shape;
    });
    lines.forEach((line,i) => {
      const a=shapes[i],b=shapes[(i+1)%shapes.length];
      line.setAttribute('x1',String((a.x+a.w/2)*10));line.setAttribute('y1',String((a.y+a.h/2)*6));
      line.setAttribute('x2',String((b.x+b.w/2)*10));line.setAttribute('y2',String((b.y+b.h/2)*6));
    });
    let current=0; beats.forEach((item,i)=>{if(progress>=item.at-.025)current=i;});
    setBeat(previous=>previous===current?previous:current);
    const gate = progress>.455 && progress<.567;
    setGateVisible(previous=>previous===gate?previous:gate);
    stage.dataset.phase=String(current); stage.style.setProperty('--film-progress',String(progress));
    const contactTop=stage.parentElement?.querySelector('.realm-contact-continuation')?.getBoundingClientRect().top ?? innerHeight;
    stage.style.setProperty('--story-presence',String(1-smooth((innerHeight-contactTop)/(innerHeight*.65))));
    stage.style.setProperty('--connection-opacity',String(smooth((progress-.54)/.1)*(1-smooth((progress-.87)/.08))));
    const gateHost=stage.querySelector<HTMLElement>('.realm-story-gate');
    if(gateHost) gateHost.style.opacity=String(smooth((progress-.445)/.025)*(1-smooth((progress-.55)/.035)));
    const captions=[...stage.querySelectorAll<HTMLElement>('.realm-caption')];
    captions.forEach((caption,i)=>{
      const alpha=captionOpacity(progress,i,captionStops,.025);
      caption.style.opacity=String(alpha); caption.style.transform=`translate3d(${(1-alpha)*-22}px,${(1-alpha)*12}px,0)`;
    });
    window.dispatchEvent(new CustomEvent('realm:timeline',{detail:progress}));
  },[]);
  useScrollTimeline(trackRef,update);
  useEffect(()=>{ const id=beats[beat].id; onSectionChange(id==='capabilities'?'inventory':id==='projects'?'missions':id==='signal'?'contact':id); },[beat,onSectionChange]);
  const project=PROJECTS[selected];
  const nodeLabel=(i:number)=>beat>=6&&beat<=7 ? project.architecture.nodes[i]?.name ?? '' : beat===8 ? ENGINEERING_PRINCIPLES[i]?.title ?? '' : beat===4 ? PROJECTS[i%3].title : fields[i];
  return <div className={`realm-timeline${reading?' realm-reading':''}`}>
    <div ref={stageRef} className="realm-stage" data-phase="0" aria-label="Continuous portfolio story">
      <div className="realm-camera-shade" aria-hidden="true" />
      <div className="realm-world-axis" aria-hidden="true"><span />THE CODE REALM<i /></div>
      <div className="realm-fabric" aria-label="The same data transforms into systems">
        <svg className="realm-flow-lines" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">{Array.from({length:12},(_,i)=><line key={i} visibility={i>=(beat===8?ENGINEERING_PRINCIPLES.length:project.architecture.nodes.length)-1?'hidden':undefined}/>)}</svg>
        {Array.from({length:12},(_,i)=>{const Icon=icons[i%icons.length];return <div key={i} data-world-part={i} className={`realm-world-part${beat>=6&&beat<=8&&!nodeLabel(i)?' realm-unused-part':''}`} aria-hidden="true"><Icon className="realm-animated-icon"/><span>{nodeLabel(i)}</span><i/><b>✓</b></div>;})}
        <div className="realm-project-paths" aria-hidden={beat!==4}>{PROJECTS.map((item,i)=><div key={item.id}><span>0{i+1}</span><h3>{item.title}</h3><p>{i===0?'Browser-side Excel → monthly audit dashboard':i===1?'Resume + job description → Gemini Flash → career documents':'Excel → business rules → dashboard, PDF & PowerPoint'}</p></div>)}</div>
        <div className="realm-system-name" aria-hidden="true">{beat===9?<><strong>{PROFILE.name}</strong><span>FULL STACK ENGINEER & SYSTEM ARCHITECT</span></>:beat>=10?<><strong>Let’s connect.</strong><span>hello@sufiyanahmed.com</span></>:null}</div>
      </div>
      <div className="realm-story-gate" inert={!reading&&!gateVisible}>
        <MissionControlSection embedded activeInStory={reading||gateVisible}/>
      </div>
      <div className="realm-caption-track">{beats.map((item,i)=><article id={reading?item.id:undefined} key={item.id} className="realm-caption" aria-hidden={!reading&&beat!==i} inert={!reading&&beat!==i}>
        <p className="film-eyebrow">{item.label}</p>{i===0?<h1>{item.title}</h1>:<h2>{item.title}</h2>}<p className="realm-caption-copy">{item.text}</p><p className="realm-caption-detail">{item.detail}</p>
        {i===0&&<div className="realm-inline-actions"><button {...getUniversalAudioProps('CARD_CLICK','CARD_HOVER',()=>revealStoryTarget('builder'))}>Explore ↓</button><button {...getUniversalAudioProps('CARD_CLICK','CARD_HOVER',onOpenTerminal)}>Open terminal</button></div>}
        {i===3&&<button className="realm-text-action" {...getUniversalAudioProps('CARD_CLICK','CARD_HOVER',()=>setReference('inventory'))}>Explore abilities & technologies ↗</button>}
        {(i===6||i===7)&&<div className="realm-architecture-choice" aria-label="Project architecture">{PROJECTS.map((item,j)=><button key={item.id} aria-label={`Trace ${item.title}`} aria-pressed={selected===j} {...getUniversalAudioProps('CARD_CLICK','CARD_HOVER',()=>setSelected(j))}>0{j+1}</button>)}<span>{project.title}</span></div>}
        {i===4&&<ul className={reading?'realm-reading-evidence':'sr-only'}>{PROJECTS.map(item=><li key={item.id}>{item.title}: {item.tagline}</li>)}</ul>}
        {i===6&&<ol className={reading?'realm-reading-evidence':'sr-only'}>{project.architecture.nodes.map(node=><li key={node.name}>{node.name} — {node.type}</li>)}</ol>}
        {i===8&&<button className="realm-text-action" {...getUniversalAudioProps('CARD_CLICK','CARD_HOVER',()=>setReference('principles'))}>Read the engineering principles ↗</button>}
        {i===9&&<div className="realm-inline-actions"><button {...getUniversalAudioProps('CARD_CLICK','CARD_HOVER',()=>setReference('profile'))}>Profile & approach ↗</button><button {...getUniversalAudioProps('CARD_CLICK','CARD_HOVER',()=>setReference('quest-log'))}>Professional journey ↗</button></div>}
      </article>)}</div>
      <div className="realm-film-legend" aria-hidden="true"><span>{beat<1?'SCROLL TO BEGIN':beat===5?'OPTIONAL BRANCH · KEEP SCROLLING TO CONTINUE':beat>=10?'THE STORY CONTINUES WITH YOU':'SCROLL TO TRANSFORM THE SYSTEM'}</span><small>{beat>0&&beat<9?'ILLUSTRATIVE SYSTEM FLOW':''}</small></div>
      <div className="realm-film-progress" aria-hidden="true"><i/></div>
    </div>
    <div ref={trackRef} className="realm-distance" aria-hidden="true">{beats.map(item=><span key={item.id} data-timeline-target={item.id} data-story-at={item.at}/>)}</div>
    <div className="realm-contact-continuation"><ContactSection embedded/><p className="realm-end-note">Sufiyan Ahmed · Full Stack Engineer & System Architect<br/><span>Thank you for exploring the work.</span></p></div>
    <nav className="realm-timeline-nav" aria-label="Story navigation">{[['hero','Start'],['capabilities','Systems'],['missions','Gate'],['architecture','Architecture'],['profile','Profile'],['contact','Contact']].map(([id,label])=><button key={id} {...getUniversalAudioProps('CARD_CLICK','CARD_HOVER',()=>revealStoryTarget(id))}>{label}</button>)}<button aria-pressed={reading} onClick={()=>{pendingTarget.current=beats[beat].id;setReading(value=>!value);}}>{reading?'Cinematic view':'Reading view'}</button></nav>
    {reference&&createPortal(<div ref={modalRef} tabIndex={-1} className="realm-reference-modal" role="dialog" aria-modal="true" aria-label={referenceTitles[reference]??'Portfolio reference'}><div className="realm-reference-surface"><header><h2>{referenceTitles[reference]}</h2><button {...getUniversalAudioProps('CARD_CLICK','CARD_HOVER',()=>setReference(null))}>Return to story ×</button></header>
      {reference==='inventory'&&<InventorySkillsSection activeTab={inventoryTab} onTabChange={onInventoryTab}/>}{reference==='boss-battles'&&<BossBattlesSection/>}{reference==='achievements'&&<AchievementsSection/>}{reference==='quest-log'&&<QuestLogSection/>}{reference==='profile'&&<PlayerProfileSection/>}{reference==='principles'&&<EngineeringPrinciplesSection/>}
    </div></div>,document.body)}
  </div>;
}
