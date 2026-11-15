import { useState } from 'react';
import type { ProjectId } from './projectPresentation';

interface FolderProject {
  id: ProjectId;
  number: string;
  tabLabel: string;
  tabPositionClass: string;
  title: string;
  subheading: string;
  subtitle: string;
  bullets: string[];
  chapterMeta: string;
}

const FOLDER_PROJECTS: FolderProject[] = [
  {
    id: 'mission-01',
    number: '01',
    tabLabel: 'PROGRAM 1 →',
    tabPositionClass: 'tab-pos-1',
    title: 'SELF-INTRODUCTION',
    subheading: '自我介紹',
    subtitle: 'A clearer picture of inventory. Governed dataset history, ERP normalization and executive reports.',
    bullets: ['Skills', 'Work content', 'Interests', 'How I grew'],
    chapterMeta: 'Chapter 01 · page 03',
  },
  {
    id: 'mission-03',
    number: '02',
    tabLabel: 'PROGRAM 2 →',
    tabPositionClass: 'tab-pos-2',
    title: 'CONTENT OUTPUT',
    subheading: '內容產出',
    subtitle: 'One model. Every report. Deterministic stock-count reconciliation, discrepancy audit and evidence.',
    bullets: ['Workbook Validation', 'Deterministic Model', 'Audit Trail', 'Executive Reports'],
    chapterMeta: 'Chapter 02 · page 04',
  },
  {
    id: 'mission-02',
    number: '03',
    tabLabel: 'PROGRAM 3 →',
    tabPositionClass: 'tab-pos-3',
    title: 'WORKING PROCESS',
    subheading: '工作流程',
    subtitle: 'Better applications. Less repetition. Structured AI output for resume creation and ATS scoring.',
    bullets: ['Gemini Flash LLM', 'ATS Scoring', 'Tailored Letters', 'Streamed Generation'],
    chapterMeta: 'Chapter 03 · page 05',
  },
  {
    id: 'mission-04',
    number: '04',
    tabLabel: 'PROGRAM 4 →',
    tabPositionClass: 'tab-pos-4',
    title: 'TEAM EVALUATION',
    subheading: '團隊評價',
    subtitle: 'Built around fit, fabric and trust. Transparent sizing, GSM details & frictionless Indian checkout.',
    bullets: ['Fit Confidence UI', 'Fabric & GSM Spec', 'Transparent Returns', 'UPI & COD Flow'],
    chapterMeta: 'Chapter 04 · page 06',
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
      <div className="work-folder-stack">
        {FOLDER_PROJECTS.map(project => {
          const isExpanded = activeId === project.id;
          return (
            <div
              key={project.id}
              className={`folder-card ${project.tabPositionClass} ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
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
              <div className="folder-tab" aria-hidden="true">
                <span>{project.tabLabel}</span>
              </div>

              {!isExpanded ? (
                /* Collapsed View (Image 2) */
                <div className="folder-collapsed-content">
                  <span className="folder-num">{project.number}</span>
                  <h3 className="folder-collapsed-title">{project.title}</h3>
                </div>
              ) : (
                /* Expanded View (Image 3) */
                <div className="folder-expanded-content">
                  <div className="folder-expanded-left">
                    <div className="folder-header-row">
                      <span className="folder-num">{project.number}</span>
                      <div className="folder-title-wrap">
                        <h3 className="folder-expanded-title">{project.title}</h3>
                        {project.subheading && (
                          <span className="folder-subheading">{project.subheading}</span>
                        )}
                      </div>
                    </div>
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
