import { useState } from 'react';
import type { ProjectId } from './projectPresentation';

interface FolderProject {
  id: ProjectId;
  number: string;
  tabLabel: string;
  slot: number;
  title: string;
  discipline: string;
  subtitle: string;
  bullets: string[];
  chapterMeta: string;
}

const FOLDER_PROJECTS: FolderProject[] = [
  {
    id: 'mission-01',
    number: '01',
    tabLabel: 'PROJECT 01 →',
    slot: 0.58,
    title: 'MONTHLY INVENTORY VISUALIZATION',
    discipline: 'Inventory Analytics & Executive BI',
    subtitle: 'From ERP exports to governed dataset history, aging analysis and executive reports.',
    bullets: ['ERP Normalization', 'Aging & Risk Rules', 'Governed Cloud History', 'Executive PDF & PPT Reports'],
    chapterMeta: 'Project 01 · Enterprise Client',
  },
  {
    id: 'mission-03',
    number: '02',
    tabLabel: 'PROJECT 02 →',
    slot: 0.08,
    title: 'QUARTERLY INVENTORY RECONCILIATION',
    discipline: 'Audit Reconciliation & Reporting',
    subtitle: 'One model. Every report. Deterministic stock-count reconciliation, discrepancy audit and evidence.',
    bullets: ['Workbook Validation', 'Deterministic Model', 'Audit Trail & Evidence', 'Multi-Deliverable Generator'],
    chapterMeta: 'Project 02 · Enterprise Client',
  },
  {
    id: 'mission-02',
    number: '03',
    tabLabel: 'PROJECT 03 →',
    slot: 0.74,
    title: 'CAREERAI WORKFLOW PLATFORM',
    discipline: 'AI Application & Product Engineering',
    subtitle: 'Better applications. Less repetition. Structured AI output for resume creation and ATS scoring.',
    bullets: ['Gemini Flash LLM', 'ATS Scoring & Keywords', 'Tailored Cover Letters', 'Streamed Generation'],
    chapterMeta: 'Project 03 · CareerAI',
  },
  {
    id: 'mission-04',
    number: '04',
    tabLabel: 'PROJECT 04 →',
    slot: 0.28,
    title: "MEN'S APPAREL STORE SYSTEM",
    discipline: 'Store Architecture & Product Systems',
    subtitle: 'Built around fit, fabric and trust. Transparent sizing, GSM details & frictionless Indian checkout.',
    bullets: ['Fit Confidence UI', 'Fabric & GSM Specs', 'Transparent Returns', 'UPI & COD Checkout'],
    chapterMeta: 'Project 04 · Apparel Label',
  },
];

interface WorkFolderAccordionProps {
  onOpenCase: (id: ProjectId) => void;
  onMinimize: () => void;
}

export function WorkFolderAccordion({ onOpenCase, onMinimize }: WorkFolderAccordionProps) {
  const [activeId, setActiveId] = useState<ProjectId | null>(null);

  const toggleProject = (id: ProjectId) => {
    setActiveId(current => (current === id ? null : id));
  };

  return (
    <div className="work-folder-stage" id="work-projects-list" aria-label="Selected Projects Accordion">
      <div className="ftp-band-list">
        {FOLDER_PROJECTS.map(project => {
          const isExpanded = activeId === project.id;
          return (
            <div
              key={project.id}
              className="ftp-folder ftp-band"
              data-open={isExpanded ? 'true' : 'false'}
              style={{ '--tx': project.slot } as React.CSSProperties}
              onClick={() => toggleProject(project.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleProject(project.id);
                }
              }}
            >
              <span className="ftp-tabshape ftp-ftab" aria-hidden="true">
                {project.tabLabel}
              </span>

              <div className="ftp-fbody">
                {!isExpanded ? (
                  /* Collapsed View matching Template */
                  <div className="ftp-band-head">
                    <span className="ftp-band-n">{project.number}</span>
                    <span style={{ minWidth: 0 }}>
                      <span className="ftp-band-t">{project.title}</span>
                    </span>
                  </div>
                ) : (
                  /* Expanded View matching Image 3 */
                  <div className="folder-expanded-content">
                    <div className="folder-expanded-left">
                      <div className="folder-header-row">
                        <span className="ftp-band-n">{project.number}</span>
                        <div className="folder-title-wrap">
                          <h3 className="folder-expanded-title">{project.title}</h3>
                          <span className="folder-discipline">{project.discipline}</span>
                        </div>
                      </div>
                      <p className="folder-subtitle">{project.subtitle}</p>
                      <span className="folder-chapter-meta">{project.chapterMeta}</span>
                    </div>

                    <div className="folder-expanded-right">
                      <div className="folder-bullets-grid">
                        {project.bullets.map((bullet, idx) => (
                          <div key={idx} className="folder-bullet-item">
                            <span className="folder-bullet-dot">○</span>
                            <span className="folder-bullet-text">{bullet}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="folder-explore-btn"
                        onClick={e => {
                          e.stopPropagation();
                          onOpenCase(project.id);
                        }}
                        aria-label={`Explore ${project.title}`}
                      >
                        Explore the system <span>↗</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="work-collapse-bottom">
        <button type="button" className="work-minimize-btn-large" onClick={onMinimize}>
          Minimize selected work <span>▲</span>
        </button>
      </div>
    </div>
  );
}
