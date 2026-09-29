import type { CSSProperties } from 'react';
import type { ProjectId } from './projectPresentation';

/** An annotated schematic, using the project's actual fields and output types. */
export function CaseTransformation({ id }: { id: ProjectId }) {
  const ai=id==='mission-02', quarterly=id==='mission-03';
  const fields=ai?['Experience','Skills','Qualifications','Job description','Keywords','Context']:['Item code','Division','Supplier','Quantity','Valuation','Period'];
  return <div className={`case-transformation ${ai?'flow-ai':quarterly?'flow-report':'flow-audit'}`} aria-hidden="true">
    <div className="flow-axis"><span>INPUT</span><span>PROCESS</span><span>OUTPUT</span></div>
    <svg className="flow-connections" viewBox="0 0 600 440"><path d="M65 115H180Q220 115 220 165V220H310M65 220H310M65 325H180Q220 325 220 275V220M310 220H395Q435 220 435 150V115H540M310 220H540M310 220H395Q435 220 435 290V325H540"/></svg>
    <div className="flow-input"><span>{ai?'RESUME + ROLE':'EXCEL WORKBOOK'}</span>{fields.map((field,i)=><div key={field} style={{'--row':i} as CSSProperties}><span>{field}</span><i/><i/></div>)}</div>
    <div className="flow-core"><span>THE PROCESSING LAYER</span><svg viewBox="0 0 120 120"><path d="M30 30H90V90H30ZM10 45H30M10 75H30M90 45H110M90 75H110M45 10V30M75 10V30M45 90V110M75 90V110"/><rect x="45" y="45" width="30" height="30"/></svg><strong>{ai?'Gemini Flash':quarterly?'Shared report model':'Validated audit model'}</strong><small>{ai?'STRUCTURED PROMPTS → STRUCTURED RESPONSE':'PARSE → VALIDATE → CALCULATE'}</small></div>
    <div className="flow-output"><div className="flow-output-header"><span>{ai?'CAREERAI':quarterly?'GAS / QUARTERLY':'GAS / AUDIT'}</span><b>↗</b></div><strong>{ai?'A stronger application.':quarterly?'One source of truth.':'Inventory, understood.'}</strong>{ai?<div className="flow-documents"><span>ATS analysis<i/><i/><i/></span><span>Resume optimization<i/><i/><i/></span><span>Cover letter<i/><i/><i/></span></div>:<><div className="flow-chart">{[43,62,36,82,54,95,70,86].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div><div className="flow-output-labels">{(quarterly?['Dashboard','PDF report','PowerPoint']:['Division analysis','Supplier insights','Audit KPIs']).map(label=><span key={label}>{label}</span>)}</div></>}<small>ILLUSTRATIVE SYSTEM VIEW</small></div>
    <div className="flow-progress"><i/><span>INFORMATION → APPLICATION</span></div>
  </div>;
}
