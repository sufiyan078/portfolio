import { ArrowGlyph } from './ArrowGlyph';
import { MonthlyInterface } from './MonthlyInterface';
import type { ProjectId } from './projectPresentation';

/** Original interface studies based on documented features, not product screenshots. */
export function ProjectVisual({ id }: { id: ProjectId }) {
  return <div className={`project-visual visual-${id}`} role="img" aria-label={id === 'mission-01' ? 'Data-free inventory aging dashboard preview with organization, supplier, division, item and provision perspectives' : id === 'mission-03' ? 'Illustrative quarterly audit workflow connecting validated stock-take records, review and PDF, PowerPoint and Excel reporting; no client values' : 'Resume and job description connected to ATS analysis, optimization and a cover letter'}>
    <div className="visual-grid" aria-hidden="true" />
    <div className="project-art-title" aria-hidden="true"><span>{id === 'mission-01' ? 'Monthly.' : id === 'mission-03' ? 'Quarterly.' : 'CareerAI'}</span><small>{id === 'mission-01' ? 'MONTHLY INVENTORY VISUALIZATION.' : id === 'mission-03' ? 'VALIDATE. RECONCILE. REVIEW.' : 'YOUR NEXT MOVE, REIMAGINED.'}</small></div>
    <div className="project-art-orbit" aria-hidden="true"/>
    <span className="project-view-affordance" aria-hidden="true">Explore the system <ArrowGlyph/></span>
    {id === 'mission-01' ? <MonthlyInterface compact/> : id === 'mission-03' ? <div className="report-composition" aria-hidden="true">
      <div className="report-source"><span>VALIDATED STOCK-TAKE</span><strong>Reconciled.<br/>Reviewed.</strong><small>RULES / EVIDENCE / SIGN-OFF</small></div>
      <div className="report-connectors"><i/><i/><i/></div>
      <div className="report-outputs">{['PDF report','PowerPoint','Excel audit'].map((label,i)=><div key={label} className={`report-sheet sheet-${i}`}><small>INVENTORY / QUARTERLY</small><strong>{label}</strong><div className="mini-chart">{[30,65,48,85,54].map((h,j)=><i key={j} style={{height:`${h}%`}}/>)}</div><span/><span/><span/><b>01 — INVENTORY INTELLIGENCE</b></div>)}</div>
    </div> : <div className="career-composition" aria-hidden="true">
      <div className="career-paper"><span className="paper-kicker">CAREERAI / RESUME</span><strong>Your experience.<br/>A clearer story.</strong><span className="paper-rule"/><small>EXPERIENCE</small><i/><i/><i/><small>SKILLS & QUALIFICATIONS</small><div className="keyword-tags"><span>Skills</span><span>Context</span><span>Experience</span></div></div>
      <div className="career-analysis"><div className="analysis-mark">✳</div><span>GEMINI FLASH</span><h4>Make the<br/>connection.</h4><ul><li>Resume + job description</li><li>ATS & keyword analysis</li><li>Targeted improvements</li></ul><div className="analysis-result">Resume → Cover letter <span><ArrowGlyph/></span></div></div>
    </div>}
    <span className="visual-footnote">{id === 'mission-03' ? 'ILLUSTRATIVE WORKFLOW / CLIENT VALUES WITHHELD' : 'INTERFACE STUDY / ILLUSTRATIVE LAYOUT'}</span><span className="visual-index">{id === 'mission-01' ? '01' : id === 'mission-03' ? '02' : '03'}</span>
  </div>;
}
