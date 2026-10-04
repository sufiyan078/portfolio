import { ArrowGlyph } from './ArrowGlyph';
import type { ProjectId } from './projectPresentation';

/** Original interface studies based on documented features, not product screenshots. */
export function ProjectVisual({ id }: { id: ProjectId }) {
  return <div className={`project-visual visual-${id}`} role="img" aria-label={id === 'mission-01' ? 'Illustrated audit dashboard showing division and supplier analysis' : id === 'mission-03' ? 'Shared inventory report model connected to dashboard, PDF and PowerPoint outputs' : 'Resume and job description connected to ATS analysis, optimization and a cover letter'}>
    <div className="visual-grid" aria-hidden="true" />
    <div className="project-art-title" aria-hidden="true"><span>{id === 'mission-01' ? 'Monthly.' : id === 'mission-03' ? 'Quarterly.' : 'CareerAI'}</span><small>{id === 'mission-01' ? 'MONTHLY INVENTORY VISUALIZATION.' : id === 'mission-03' ? 'ONE MODEL. EVERY PERSPECTIVE.' : 'YOUR NEXT MOVE, REIMAGINED.'}</small></div>
    <div className="project-art-orbit" aria-hidden="true"/>
    <span className="project-view-affordance" aria-hidden="true">Explore the system <ArrowGlyph/></span>
    {id === 'mission-01' ? <div className="audit-interface" aria-hidden="true">
      <aside><strong>MONTHLY<span> / AUDIT</span></strong><i>Overview</i><span>Inventory</span><span>Divisions</span><span>Suppliers</span><small>LOCAL PROCESSING<br/>SheetJS / Browser</small></aside>
      <div className="audit-main"><div className="browser-toolbar"><i/><i/><i/><span>Inventory audit / Overview</span></div><header><span>Inventory overview</span><small>MONTHLY AUDIT</small></header>
        <div className="audit-kpis"><div><small>PROCESSING</small><strong>In-browser</strong></div><div><small>DATA BOUNDARY</small><strong>Private by design</strong></div></div>
        <div className="audit-chart"><span>Division breakdown</span><div className="bar-chart">{[34,65,47,80,56,91,69,44,74,57].map((height,i)=><i key={i} style={{height:`${height}%`}}/>)}</div><small>DIVISION ANALYSIS</small></div>
        <div className="audit-table"><span>Item code</span><span>Supplier</span><span>Quantity</span>{Array.from({length:9},(_,i)=><i key={i}/>)}</div>
      </div>
    </div> : id === 'mission-03' ? <div className="report-composition" aria-hidden="true">
      <div className="report-source"><span>VALIDATED INVENTORY</span><strong>One shared<br/>report model.</strong><small>BUSINESS RULES / KPI ENGINE</small></div>
      <div className="report-connectors"><i/><i/><i/></div>
      <div className="report-outputs">{['Dashboard','PDF report','PowerPoint'].map((label,i)=><div key={label} className={`report-sheet sheet-${i}`}><small>INVENTORY / QUARTERLY</small><strong>{label}</strong><div className="mini-chart">{[30,65,48,85,54].map((h,j)=><i key={j} style={{height:`${h}%`}}/>)}</div><span/><span/><span/><b>01 — INVENTORY INTELLIGENCE</b></div>)}</div>
    </div> : <div className="career-composition" aria-hidden="true">
      <div className="career-paper"><span className="paper-kicker">CAREERAI / RESUME</span><strong>Your experience.<br/>A clearer story.</strong><span className="paper-rule"/><small>EXPERIENCE</small><i/><i/><i/><small>SKILLS & QUALIFICATIONS</small><div className="keyword-tags"><span>Skills</span><span>Context</span><span>Experience</span></div></div>
      <div className="career-analysis"><div className="analysis-mark">✳</div><span>GEMINI FLASH</span><h4>Make the<br/>connection.</h4><ul><li>Resume + job description</li><li>ATS & keyword analysis</li><li>Targeted improvements</li></ul><div className="analysis-result">Resume → Cover letter <span><ArrowGlyph/></span></div></div>
    </div>}
    <span className="visual-footnote">INTERFACE STUDY / ILLUSTRATIVE LAYOUT</span><span className="visual-index">{id === 'mission-01' ? '01' : id === 'mission-03' ? '02' : '03'}</span>
  </div>;
}
