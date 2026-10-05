import { useId, useState } from 'react';
import './monthly-case.css';

const views = [
  { name: 'Organization', heading: 'Aging exposure by cost organization', detail: 'Stacked aging breakdowns and a risk heatmap connect cost organizations to aged inventory and provision exposure.', labels: ['Stacked aging', 'Risk heatmap', 'Organization ledger'] },
  { name: 'Supplier', heading: 'Supplier concentration and aging', detail: 'Recovered supplier names support vendor-level aging distributions and concentration analysis.', labels: ['Supplier ranking', 'Aged inventory', 'Supplier distribution'] },
  { name: 'Division', heading: 'Division-level inventory governance', detail: 'Compare operating divisions against the overall inventory profile, then drill into their underlying units.', labels: ['Division comparison', 'Portfolio benchmark', 'Expandable hierarchy'] },
  { name: 'All items', heading: 'Trace the analysis to individual records', detail: 'Search, sort and page through item records. Switch between inventory values and quantities without losing the analytical context.', labels: ['Item code', 'Description', 'Cost organization', 'Quantity', 'Closing value'] },
  { name: 'Provision', heading: 'Understand the provision calculation', detail: 'Apply the documented business rule: half of the value aged five to seven years, plus the full value aged beyond seven years. These are calculation rules, not disclosed client balances.', labels: ['Five to seven years · half-value provision', 'Beyond seven years · full-value provision', 'Provision by organization'] },
];

/** Data-free reconstruction of the documented dashboard anatomy. Not a live dataset. */
export function MonthlyInterface({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const view = views[active];
  return <div className={`monthly-interface ${compact ? 'is-compact' : ''}`}>
    <header><strong>GAS · INV <span>Inventory aging dashboard</span></strong><small>Upload · My Data · Export</small></header>
    <div className="monthly-filters"><span>Division / All divisions</span><span>Organization / All</span><span>Metric / Inventory value</span></div>
    <div className="monthly-view-controls" aria-label="Documented dashboard perspectives">
      {views.map((item, i) => compact ? <span key={item.name} data-active={i === 0}>{item.name}</span> : <button key={item.name} type="button" aria-pressed={active === i} aria-controls={panelId} onClick={() => setActive(i)}>{item.name}</button>)}
    </div>
    <div className="monthly-measures">{['Total inventory', 'Slow moving', 'At risk', 'Total provision'].map(label => <div key={label}><small>{label}</small><strong>—</strong><span>Value withheld</span></div>)}</div>
    <div className="monthly-view-panel" id={panelId} aria-live={compact ? undefined : 'polite'}>
      <strong>{view.heading}</strong>
      {!compact && <p>{view.detail}</p>}
      <div className="monthly-placeholder-ledger">{view.labels.map(label => <div key={label}><span>{label}</span><i aria-hidden="true"/><small>Withheld</small></div>)}</div>
    </div>
    <footer>DOCUMENTED INTERFACE PREVIEW · CLIENT VALUES WITHHELD</footer>
  </div>;
}

export function MonthlyProductTour() {
  return <section className="monthly-product-tour section-pad" aria-labelledby="monthly-tour-title">
    <div className="section-heading"><div><span className="eyebrow">THE WEBAPP / FROM ACCESS TO REPORT</span><h2 id="monthly-tour-title">One dataset.<br/>Several perspectives.</h2></div><p>Explore the documented workflow. Client inventory values, quantities, item records and financial balances are intentionally omitted.</p></div>
    <figure className="monthly-access"><img src="/projects/monthly/access.png" width="1920" height="912" loading="lazy" alt="Actual GAS inventory analytics login screen with Google sign-in and administrator-reviewed access"/><figcaption><strong>Approved access comes first.</strong> Actual product screenshot: Google sign-in and administrator review before access to inventory datasets.</figcaption></figure>
    <div className="monthly-tour-story"><div><span className="eyebrow">UPLOAD / RESTORE / ANALYZE</span><h3>Start with the workbook.<br/>Keep the context.</h3><p>Upload an ERP Excel workbook or reopen a saved dataset through My Data. Dynamic header mapping handles irregular worksheets, normalization structures the records, and a two-pass supplier heuristic fills recoverable gaps.</p><p>Compressed datasets are persisted in Cloud Firestore. This is an authenticated cloud workflow with browser-side parsing, not a zero-upload application.</p></div><MonthlyInterface/></div>
    <div className="monthly-tour-outputs"><div><h3>From analysis to action</h3><p>Division, organization and metric filters recalibrate the analytical view. Searchable ledgers and rule-based diagnostics help users inspect aging and exposure before exporting the result.</p></div><div><h3>Reporting beyond the dashboard</h3><p>Excel workbooks, landscape PDF reports and PowerPoint presentations are generated in the browser using SheetJS, html2canvas, jsPDF and PptxGenJS.</p><small>Preview labels describe the documented interface. No client dataset is embedded, and the preview controls do not access the production application.</small></div></div>
  </section>;
}
