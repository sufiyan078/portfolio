import { ArrowGlyph } from './ArrowGlyph';
import { MonthlyInterface } from './MonthlyInterface';
import type { ProjectId } from './projectPresentation';

/** Original interface studies based on documented features, not product screenshots. */
export function ProjectVisual({ id }: { id: ProjectId }) {
  return <div className={`project-visual visual-${id}`} role="img" aria-label={id === 'mission-01' ? 'Data-free inventory aging dashboard preview with organization, supplier, division, item and provision perspectives' : id === 'mission-03' ? 'Illustrative quarterly audit workflow connecting validated stock-take records, review and PDF, PowerPoint and Excel reporting; no client values' : id === 'mission-02' ? 'Resume and job description connected to ATS analysis, optimization and a cover letter' : 'Mobile-first apparel store study: fit, fabric and trust with centimeter sizing and GSM fabric weights'}>
    <div className="visual-grid" aria-hidden="true" />
    <div className="project-art-title" aria-hidden="true"><span>{id === 'mission-01' ? 'Monthly.' : id === 'mission-03' ? 'Quarterly.' : id === 'mission-02' ? 'CareerAI' : 'Apparel.'}</span><small>{id === 'mission-01' ? 'MONTHLY INVENTORY VISUALIZATION.' : id === 'mission-03' ? 'VALIDATE. RECONCILE. REVIEW.' : id === 'mission-02' ? 'YOUR NEXT MOVE, REIMAGINED.' : 'FIT. FABRIC. TRUST.'}</small></div>
    <div className="project-art-orbit" aria-hidden="true"/>
    <span className="project-view-affordance" aria-hidden="true">Explore the system <ArrowGlyph/></span>
    {id === 'mission-01' ? <MonthlyInterface compact/> : id === 'mission-03' ? <div className="report-composition" aria-hidden="true">
      <div className="report-source"><span>VALIDATED STOCK-TAKE</span><strong>Reconciled.<br/>Reviewed.</strong><small>RULES / EVIDENCE / SIGN-OFF</small></div>
      <div className="report-connectors"><i/><i/><i/></div>
      <div className="report-outputs">{['PDF report','PowerPoint','Excel audit'].map((label,i)=><div key={label} className={`report-sheet sheet-${i}`}><small>INVENTORY / QUARTERLY</small><strong>{label}</strong><div className="mini-chart">{[30,65,48,85,54].map((h,j)=><i key={j} style={{height:`${h}%`}}/>)}</div><span/><span/><span/><b>01 — INVENTORY INTELLIGENCE</b></div>)}</div>
    </div> : id === 'mission-02' ? <div className="career-composition" aria-hidden="true">
      <div className="career-paper"><span className="paper-kicker">CAREERAI / RESUME</span><strong>Your experience.<br/>A clearer story.</strong><span className="paper-rule"/><small>EXPERIENCE</small><i/><i/><i/><small>SKILLS & QUALIFICATIONS</small><div className="keyword-tags"><span>Skills</span><span>Context</span><span>Experience</span></div></div>
      <div className="career-analysis"><div className="analysis-mark">✳</div><span>GEMINI FLASH</span><h4>Make the<br/>connection.</h4><ul><li>Resume + job description</li><li>ATS & keyword analysis</li><li>Targeted improvements</li></ul><div className="analysis-result">Resume → Cover letter <span><ArrowGlyph/></span></div></div>
    </div> : <div className="store-composition" aria-hidden="true">
      <div className="store-banner"><span>FREE SHIPPING OVER ₹1,999 · EASY EXCHANGES · COD ACROSS INDIA</span></div>
      <div className="store-card">
        <div className="store-card-header"><span className="store-tag">NEW IN</span><span className="store-gsm">420 GSM HEAVYWEIGHT</span></div>
        <div className="store-card-body">
          <h4>Heavyweight Fleece Hoodie</h4>
          <div className="store-pricing"><strong className="store-price">₹2,499</strong><span className="store-mrp">₹3,299</span><span className="store-discount">24% OFF</span></div>
          <div className="store-fit-note"><span>Model: 6'1" · Wears Size L · Relaxed fit</span></div>
          <div className="store-sizes"><span>S</span><span>M</span><span className="is-selected">L</span><span>XL</span><small className="size-guide-cue">Size guide (cm)</small></div>
        </div>
        <div className="store-card-footer">
          <div className="store-add-bag"><span>ADD TO BAG</span><ArrowGlyph/></div>
          <div className="store-trust-row"><span>✓ 15-day exchange</span><span>✓ UPI / COD</span><span>✓ Dispatched in 24h</span></div>
        </div>
      </div>
      <div className="store-mini-card"><span>FABRIC PROMISE</span><strong>100% Combed Cotton</strong><p>Pre-shrunk · Heavy drape · Zero pill</p></div>
    </div>}
    <span className="visual-footnote">{id === 'mission-03' ? 'ILLUSTRATIVE WORKFLOW / CLIENT VALUES WITHHELD' : id === 'mission-04' ? 'MOBILE-FIRST STORE STUDY / 30+ PRODUCTS' : 'INTERFACE STUDY / ILLUSTRATIVE LAYOUT'}</span><span className="visual-index">{id === 'mission-01' ? '01' : id === 'mission-03' ? '02' : id === 'mission-02' ? '03' : '04'}</span>
  </div>;
}
