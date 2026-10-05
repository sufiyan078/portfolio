import { useId, useState } from 'react';
import { FileCheck2, CopyCheck, Tags, FileText, Presentation, Table2 } from 'lucide-react';
import './monthly-case.css';
import './quarterly-case.css';

const stages = [
  { name:'Upload', title:'Bring the stock-take records together.', text:'Read operational Excel sheets in the browser. Map header aliases and exclude summary tabs before profiling the records.', rows:['Multi-sheet Excel input','Header alias mapping','Summary-tab exclusion'], visual:'EXCEL WORKBOOK → NORMALIZED RECORDS' },
  { name:'Validate', title:'Check the records before calculation.', text:'Profile the workbook, flag duplicate references, resolve supplier fields and keep unverified records distinguishable before reconciliation.', rows:['Workbook profiling','Duplicate-reference review','Supplier fallback resolution'], visual:'PROFILE → REVIEW → VALIDATE' },
  { name:'Dashboard', title:'Investigate the differences.', text:'Deterministic reconciliation links physical counts to ERP records. Explore executive, division, supplier, financial-risk and item-ledger views.', rows:['Count difference','Shortage and excess','Aging and provision exposure'], visual:'VALIDATED RECORDS → RECONCILIATION → INVESTIGATION' },
  { name:'Pre-report', title:'Put evidence and review behind the report.', text:'Prepare the cover, theme and executive commentary. Add session evidence and record prepared, checked and approved sign-off before the approval lock.', rows:['Cover and commentary','Evidence appendix','Prepared · Checked · Approved'], visual:'ANALYSIS → EVIDENCE → SIGN-OFF' },
  { name:'Report', title:'Deliver the reviewed audit package.', text:'Generate executive PDF reports, editable PowerPoint presentations and a master Excel reconciliation in the browser. Historical records retain the audit context.', rows:['Executive PDF','Editable PowerPoint','Excel reconciliation'], visual:'REVIEWED MODEL → PDF / PPTX / XLSX' },
];
const perspectives=[
 {name:'Executive',text:'Audit health, count accuracy and variance composition.',rows:['Health assessment','Matched / discrepant records','Net variance']},
 {name:'Division',text:'Compare audit performance and discrepancy exposure across operational units.',rows:['Division performance','Discrepancy distribution','Financial exposure']},
 {name:'Supplier',text:'Investigate supplier concentration and variance exposure.',rows:['Supplier performance','Concentration','Variance exposure']},
 {name:'Financial risk',text:'Separate shortages and excess stock from aging-based provision calculations.',rows:['Shortage liability','Excess stock','Aging-based provision']},
 {name:'Item ledger',text:'Filter by organization, supplier, issue, status and risk. Search item codes, descriptions and shelf locations.',rows:['Matched · Shortage · Excess · Unverified','Status and risk filters','Searchable, paginated records']},
];

/** Illustrative workflow anatomy; never represents a client record or balance. */
function QuarterlyStageIllustration({ stage }: { stage: number }) {
 if (stage === 1) return <div className="quarterly-validation-visual">
  <div><FileCheck2 aria-hidden="true"/><strong>Profile workbook</strong><span>Map headers<br/>Exclude summary tabs</span></div>
  <div><CopyCheck aria-hidden="true"/><strong>Review duplicates</strong><span>Flag repeated references<br/>Review consolidation</span></div>
  <div><Tags aria-hidden="true"/><strong>Resolve suppliers</strong><span>Apply fallback rules<br/>Keep unverified records visible</span></div>
 </div>;
 if (stage === 2) return <div className="quarterly-reconciliation-visual">
  <div className="quarterly-count-inputs"><span><Table2 aria-hidden="true"/><strong>ERP records</strong><small>Book quantity</small></span><b aria-hidden="true">↔</b><span><FileCheck2 aria-hidden="true"/><strong>Stock-take</strong><small>Physical count</small></span></div>
  <div className="quarterly-reconciliation-rule"><strong>Physical count − ERP quantity</strong><small>Deterministic count difference</small></div>
  <div className="quarterly-status-labels">{['Matched','Shortage','Excess','Unverified'].map(label=><span key={label}>{label}</span>)}</div>
  <small>Illustrative classification · No client records or values</small>
 </div>;
 return <div className="quarterly-report-visual">{[{icon:FileText,format:'PDF',title:'Executive report',detail:'Overview · findings · evidence'},{icon:Presentation,format:'PPTX',title:'Editable presentation',detail:'Native slides · management review'},{icon:Table2,format:'XLSX',title:'Reconciliation workbook',detail:'Item ledger · calculated differences'}].map(({icon:Icon,format,title,detail})=><div key={format}><Icon aria-hidden="true"/><small>{format}</small><strong>{title}</strong><i aria-hidden="true"/><i aria-hidden="true"/><span>{detail}</span></div>)}</div>;
}

export function QuarterlyProductTour() {
 const [stage,setStage]=useState(0),[perspective,setPerspective]=useState(0);
 const panelId=useId(),dashboardId=useId();
 const current=stages[stage],pane=perspectives[perspective];
 return <section className="monthly-product-tour quarterly-product-tour section-pad" aria-labelledby="quarterly-tour-title">
  <div className="section-heading"><div><span className="eyebrow">THE PORTAL / END-TO-END AUDIT JOURNEY</span><h2 id="quarterly-tour-title">From count<br/>to confidence.</h2></div><p>Follow the documented workflow. These interface reconstructions omit client figures, item records, report identifiers, accounts, signatures and site evidence.</p></div>
  <div className="quarterly-journey-controls" aria-label="Explore the quarterly audit workflow">{stages.map((item,i)=><button key={item.name} type="button" aria-pressed={stage===i} aria-controls={panelId} onClick={()=>setStage(i)}><small>{String(i+1).padStart(2,'0')}</small>{item.name}</button>)}</div>
  <div className="monthly-tour-story quarterly-stage-panel" id={panelId} aria-live="polite">
   <div><span className="eyebrow">{current.name.toUpperCase()} / DOCUMENTED WORKFLOW</span><h3>{current.title}</h3><p>{current.text}</p><p>Raw spreadsheets and photo evidence are handled within the browser session. Structured metadata and calculation summaries are persisted in Firestore with authentication and role-based governance.</p></div>
   <div className="monthly-interface quarterly-interface"><header><strong>QUARTERLY INVENTORY PORTAL<span>{current.name} workspace</span></strong><small>DATA-FREE PREVIEW</small></header>
    <div className="quarterly-stage-visual" key={stage}><span>{current.visual}</span>{stage===0?<div className="quarterly-upload-outline">Excel upload<br/><small>No file or client dataset is included.</small></div>:stage===3?<div className="quarterly-document-preview"><small>EXECUTIVE AUDIT REPORT</small><strong>Physical inventory<br/>verification &amp;<br/>reconciliation</strong><span>Evidence and signatures withheld</span></div>:<QuarterlyStageIllustration stage={stage}/>}</div>
    <div className="monthly-view-panel"><strong>{current.name === 'Report' ? 'Document outputs' : 'Workspace capabilities'}</strong><div className="monthly-placeholder-ledger">{current.rows.map(row=><div key={row}><span>{row}</span><small>{stage===0?'Browser-side':stage===4?'Export':'Documented'}</small></div>)}</div></div>
    <footer>INTERFACE RECONSTRUCTION · NO LIVE DATA OR PRODUCTION CONNECTION</footer>
   </div>
  </div>
  <div className="monthly-tour-story quarterly-dashboard-story"><div><span className="eyebrow">DASHBOARD / TRACE THE DISCREPANCY</span><h3>See the summary.<br/>Investigate the record.</h3><p>Division and supplier analysis lead into financial-risk review and an item ledger. Issue categories, audit status, risk filters and remark tagging help narrow the investigation without replacing the underlying stock-take records.</p><p>Inventory intelligence is deterministic and rule-driven. This case study makes no AI/ML claim and publishes no measured client balances or audit scores.</p></div>
   <div className="monthly-interface quarterly-interface"><header><strong>Audit investigation<span>Analytical perspectives</span></strong></header><p className="monthly-view-hint" id={`${dashboardId}-hint`}>Select a perspective below to explore its details.</p><div className="monthly-view-controls" aria-label="Explore quarterly analytics perspectives" aria-describedby={`${dashboardId}-hint`}>{perspectives.map((item,i)=><button key={item.name} type="button" aria-pressed={perspective===i} aria-controls={dashboardId} onClick={()=>setPerspective(i)}>{item.name}</button>)}</div><div className="monthly-measures">{['Count accuracy','Shortage','Excess','Net variance'].map(label=><div key={label}><small>{label}</small><strong>—</strong><span>Value withheld</span></div>)}</div><div className="monthly-view-panel" id={dashboardId} aria-live="polite"><strong>{pane.name}</strong><p>{pane.text}</p><div className="monthly-placeholder-ledger">{pane.rows.map(row=><div key={row}><span>{row}</span><small>Withheld</small></div>)}</div></div><footer>DOCUMENTED ANALYTICS PREVIEW · CLIENT VALUES WITHHELD</footer></div>
  </div>
  <div className="monthly-tour-outputs"><div><h3>Evidence, methodology and responsibility</h3><p>The pre-report studio combines document design, explanatory commentary, photo appendices and supplier evidence. Prepared, checked and approved fields establish review responsibility; approval locks the report state.</p></div><div><h3>Governance beyond the current cycle</h3><p>Administrator, Auditor and Viewer roles govern access. Historical audit archives and append-only event records preserve the reporting context. Browser-side document generation supports PDF, editable PowerPoint and Excel reconciliation deliverables.</p><small>Based on the supplied platform documentation. Screens are reconstructed for public presentation; confidential source screenshots and raw evidence are not embedded.</small></div></div>
 </section>;
}
