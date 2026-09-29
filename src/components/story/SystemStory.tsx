import { useCallback, useMemo, useRef, useState } from 'react';
import type { Project } from '../../data/projects';
import { Bot, Database, FileCode2, ShieldCheck, BarChart3, Layers } from '../ui/RealmIcons';
import { getUniversalAudioProps } from '../../utils/soundEffects';
import { useScrollTimeline } from './useScrollTimeline';
import { blendShape, captionOpacity, filmSegment, worldShape, type FilmShape } from './timelineMath';

type MissionBeat = { title:string; text:string };
const stops=[0,.13,.25,.38,.51,.64,.77,1];
const fieldNames=['Item codes','Descriptions','Divisions','Suppliers','Quantities','Closing values','Remarks','Physical counts','System quantities','Sub divisions','Normalized fields','Audit values'];
const resumeFields=['Resume','Job description','Skills','Requirements','Experience','Keywords','Qualifications','Role context','Resume structure','Target role','Candidate context','Application'];
function missionBeats(project:Project):MissionBeat[] {
  const career=project.id==='mission-02',quarterly=project.id==='mission-03';
  if(career)return [
    {title:'A resume meets a role.',text:project.businessProblem},
    {title:'Two inputs become structured context.',text:'The resume and job description are prepared for the prompt construction layer.'},
    {title:'Context enters Gemini Flash.',text:'The Gemini API receives the structured prompt. The application processes its response into the career workflow.'},
    {title:'Skills and requirements connect.',text:'ATS analysis identifies keyword gaps and how the resume matches the target job description.'},
    {title:'Analysis becomes an improvement.',text:'The ATS score and keyword analysis inform actionable resume optimization.'},
    {title:'The application takes shape.',text:'Resume improvements and a tailored cover letter turn the analysis into application materials.'},
    {title:'The complete career workflow.',text:'JSearch supports job discovery. Firebase provides authentication, database and billing integration.'},
    {title:'The result, in context.',text:project.outcome[0]},
  ];
  return [
    {title:'Start with the workbook.',text:project.businessProblem},
    {title:'Rows become recognizable fields.',text:'SheetJS parses the Excel workbook in the browser. Item codes, descriptions, quantities and values enter the processing boundary.'},
    {title:'Clean the model before trusting it.',text:'Mixed formats are normalized and validated before calculations. Consistent fields give every metric the same foundation.'},
    {title:quarterly?'Explicit rules reconcile the inventory.':'Zero is different from missing.',text:quarterly?'The Business Rule Engine and KPI Calculation Engine create consistent inventory analysis. This is rule-driven BI, not AI/ML.':'Explicit checks distinguish a physical count of zero from an undefined count before audit calculations.'},
    {title:'Structured data becomes analysis.',text:'Division and supplier groupings make the inventory understandable. The same validated fields now form the visual analysis.'},
    {title:quarterly?'One report model joins the outputs.':'The dashboard comes together.',text:quarterly?'The Shared Report Model supplies consistent calculated metrics to the dashboard, PDF and PowerPoint outputs.':'Audit KPIs, charts, tables, search and filters support monthly stock inspection.'},
    {title:quarterly?'Dashboard. PDF. PowerPoint.':'From spreadsheet review to visual audit.',text:quarterly?'The reporting surfaces follow the shared model. Metrics are not independently recalculated in each output.':project.whyItMattered},
    {title:'The result, in context.',text:project.outcome[0]},
  ];
}
function missionShape(index:number,phase:number,career:boolean,quarterly:boolean):FilmShape {
  if(career){
    if(phase<2)return {x:9+(index%2)*45,y:8+Math.floor(index/2)*13,w:37,h:8,alpha:1,round:2};
    if(phase<4)return {x:12+(index%2)*57,y:8+Math.floor(index/2)*13,w:19,h:8,alpha:1,round:2};
    return {x:5+(index%3)*32,y:13+Math.floor(index/3)*18,w:25,h:7,alpha:1,round:1};
  }
  if(phase===0)return worldShape(index,1);
  if(phase<3)return worldShape(index,2);
  if(phase<5)return worldShape(index,3);
  if(!quarterly){
    if(index<4)return {x:3+index*24,y:13,w:22,h:17,alpha:1,round:2};
    if(index<10){const height=[25,40,31,51,37,46][index-4];return {x:5+(index-4)*7,y:89-height,w:5,h:height,alpha:1,round:1};}
    return {x:55,y:42+(index-10)*24,w:40,h:19,alpha:1,round:2};
  }
  return {x:7+(index%3)*31,y:19+Math.floor(index/3)*16,w:24,h:11,alpha:1,round:2};
}

/** One persistent visual field per mission, with the same rows becoming its final deliverables. */
export function MissionStory({project,onReturn}:{project:Project;onReturn:()=>void}) {
  const trackRef=useRef<HTMLDivElement>(null),stageRef=useRef<HTMLDivElement>(null);
  const [active,setActive]=useState(0),[reading,setReading]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
  const beats=useMemo(()=>missionBeats(project),[project]);
  const career=project.id==='mission-02',quarterly=project.id==='mission-03';
  const update=useCallback((p:number,reduced:boolean)=>{
    if(reduced)setReading(true);
    const stage=stageRef.current;if(!stage)return;
    const segment=filmSegment(p,stops);
    const parts=[...stage.querySelectorAll<HTMLElement>('[data-mission-part]')];
    const shapes=parts.map((part,i)=>{
      const shape=blendShape(missionShape(i,segment.index,career,quarterly),missionShape(i,segment.index+1,career,quarterly),segment.fraction);
      part.style.left=`${shape.x}%`;part.style.top=`${shape.y}%`;part.style.width=`${shape.w}%`;part.style.height=`${shape.h}%`;
      return shape;
    });
    stage.querySelectorAll<SVGLineElement>('line').forEach((line,i)=>{
      const a=shapes[i],b=shapes[(i+1)%shapes.length];line.setAttribute('x1',String((a.x+a.w/2)*10));line.setAttribute('y1',String((a.y+a.h/2)*6));line.setAttribute('x2',String((b.x+b.w/2)*10));line.setAttribute('y2',String((b.y+b.h/2)*6));
    });
    let index=0;stops.forEach((stop,i)=>{if(p>=stop-.02)index=i;});
    setActive(previous=>previous===index?previous:index);stage.dataset.step=String(index);
    stage.style.setProperty('--mission-progress',String(p));
    const resultTop=stage.parentElement?.querySelector('.mission-film-result')?.getBoundingClientRect().top ?? innerHeight;
    const stageRect=stage.getBoundingClientRect();
    stage.style.setProperty('--mission-presence',String(Math.max(0,Math.min(1,(resultTop-stageRect.top)/(stageRect.height*.8)))));
    stage.querySelectorAll<HTMLElement>('.mission-film-caption').forEach((caption,i)=>{
      const alpha=captionOpacity(p,i,stops,.02);
      caption.style.opacity=String(alpha);caption.style.transform=`translateY(${(1-alpha)*12}px)`;
    });
  },[career,quarterly]);
  useScrollTimeline(trackRef,update);
  const labels=career?resumeFields:fieldNames;
  const Icon=career?Bot:quarterly?Layers:Database;
  const outputFields=career?['ATS analysis','Optimized resume','Cover letter','Keyword match','Experience','Target role','Keyword gaps','Skills','Role context','Recommendations','Resume structure','Application']:['KPI model','KPI model','KPI model','Division analysis','Division analysis','Division analysis','Supplier analysis','Supplier analysis','Supplier analysis','Calculated metrics','Calculated metrics','Calculated metrics'];
  return <div className={`mission-film ${career?'mission-film-career':quarterly?'mission-film-quarterly':'mission-film-audit'}${reading?' mission-film-reading':''}`}>
    <div ref={stageRef} className="mission-film-stage" data-step="0">
      <div className="mission-film-head"><span>{project.missionNumber} / FOLLOW THE DATA</span><button aria-pressed={reading} onClick={()=>setReading(value=>!value)}>{reading?'Cinematic view':'Reading view'}</button></div>
      <div className="mission-film-caption-track">{beats.map((item,i)=><article key={item.title} className="mission-film-caption" aria-hidden={!reading&&active!==i}><p className="film-eyebrow">0{i+1} / {project.status}</p><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      <div className="mission-film-field" aria-hidden="true">
        <svg className="realm-flow-lines" viewBox="0 0 1000 600" preserveAspectRatio="none">{labels.map((label,i)=><line key={label} data-link={i}/>)}</svg>
        {labels.map((label,i)=><div className="mission-film-row" data-mission-part={i} key={label}><FileCode2 className="realm-animated-icon"/><span>{active>=5?(!career&&!quarterly?(i<4?<><strong>{project.preview.kpis[i].value}</strong>{project.preview.kpis[i].label}</>:i===10?'Division breakdown':i===11?'Supplier breakdown':''):outputFields[i]):label}</span><b>✓</b></div>)}
        <div className="mission-film-engine"><Icon className="realm-animated-icon"/><strong>{career?'GEMINI FLASH':quarterly?'BUSINESS RULE ENGINE':'AUDIT VALIDATION'}</strong><span>{career?'Structured prompt → structured response':'Parse → normalize → validate'}</span></div>
        {career||quarterly?<div className="mission-film-deliverables">{(career?['ATS analysis','Optimized resume','Cover letter']:['Dashboard','PDF report','PowerPoint']).map((label,i)=><div key={label}>{i===0?<BarChart3 className="realm-animated-icon"/>:i===1?<ShieldCheck className="realm-animated-icon"/>:<FileCode2 className="realm-animated-icon"/>}<span>{label}</span></div>)}</div>:<div className="mission-dashboard-frame"><span>MONTHLY AUDIT / DIVISION · SUPPLIER · SEARCH</span></div>}
      </div>
      <div className="mission-film-bottom"><span>SCROLL TO TRANSFORM · ILLUSTRATIVE DATA FLOW</span><span>0{active+1} / 08</span><i/></div>
    </div>
    <div ref={trackRef} className="mission-film-distance" aria-hidden="true"/>
    <div className="mission-film-result"><p className="film-eyebrow">THE WORKING RESULT</p><h3>{project.preview.headline}</h3><div className="mission-recorded-metrics">{project.metrics.map(metric=><div key={metric.caption}><strong>{metric.number}</strong><span>{metric.caption}</span></div>)}</div><ul>{project.outcome.map(outcome=><li key={outcome}>{outcome}</li>)}</ul><button className="btn-primary" {...getUniversalAudioProps('CARD_CLICK','CARD_HOVER',onReturn)}>Return to Mission Vault ↗</button></div>
  </div>;
}
