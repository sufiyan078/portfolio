import { useCallback, useRef, useState } from 'react';
import { useScrollTimeline } from '../story/useScrollTimeline';
import { TypewriterText } from './TypewriterText';

export const PROCESS_STEPS = [
  ['Understand', 'Start with the right problem.', 'Clarify the people, workflow, constraints and what a useful outcome looks like.'],
  ['Structure', 'Make the moving parts clear.', 'Map the information, data model and system boundaries before building around them.'],
  ['Build', 'Turn the model into a product.', 'Develop the interface, application logic and integrations in manageable iterations.'],
  ['Validate', 'Test the reality, not just the happy path.', 'Check usability, data quality, edge cases and performance against the actual workflow.'],
  ['Deliver', 'Make the handover part of the work.', 'Deploy the application, explain how it works and document what comes next.'],
] as const;

const PROCESS_MARKS = ['↗', '⊞', '⌘', '✓', '↗'] as const;

export function ProcessSection() {
  const trackRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  const totalSteps = PROCESS_STEPS.length;

  const update = useCallback((progress: number, reduced: boolean) => {
    if (reduced) {
      setActiveStep(0);
      setStepProgress(1);
      setOverallProgress(1);
      return;
    }

    setOverallProgress(progress);

    // Dynamic steps across progress [0, 1]
    const clamped = Math.max(0, Math.min(0.9999, progress));
    const step = Math.min(totalSteps - 1, Math.floor(clamped * totalSteps));
    const subProgress = (clamped * totalSteps) - step;

    setActiveStep(current => (current === step ? current : step));
    setStepProgress(subProgress);
  }, [totalSteps]);

  useScrollTimeline(trackRef, update);

  const scrollToStep = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const trackTop = rect.top + scrollTop;
    const trackHeight = rect.height;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = trackHeight - viewportHeight;
    const targetProgress = (index + 0.5) / totalSteps;
    const targetScroll = trackTop + targetProgress * scrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  const sealRotation = overallProgress * 300;

  return (
    <section id="process" className="studio-process-track" ref={trackRef}>
      <div className="studio-process-stage">
        <div className="section-marker">
          <span><TypewriterText text="03 / HOW I WORK" /></span>
          <span>CLARITY AT EVERY STEP</span>
        </div>

        <div className="process-scrolly-grid">
          {/* Left Column: Anchor & Thesis */}
          <div className="process-scrolly-left">
            <div className="section-heading">
              <h2>Less mystery.<br /><em>More momentum.</em></h2>
              <p>A clear process makes room for better decisions. I connect the business problem to the technical details, then make the work visible along the way.</p>
            </div>

            {/* Step progress pills / timeline indicator */}
            <div className="process-step-tracker" role="tablist" aria-label="Process steps">
              <span className="process-step-badge">STEP 0{activeStep + 1} / 0{totalSteps}</span>
              <div className="process-step-pills">
                {PROCESS_STEPS.map(([name], idx) => {
                  const isCurrent = idx === activeStep;
                  const isPast = idx < activeStep;
                  const fillWidth = isPast ? 100 : isCurrent ? Math.min(100, Math.max(8, stepProgress * 100)) : 0;
                  return (
                    <button
                      key={name}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      className={`process-step-pill-btn ${isCurrent ? 'is-active' : ''}`}
                      onClick={() => scrollToStep(idx)}
                      title={`Jump to 0${idx + 1} / ${name}`}
                      aria-label={`Step 0${idx + 1}: ${name}`}
                    >
                      <span
                        className="process-step-pill-fill"
                        style={{ width: `${fillWidth}%` }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Kinetic Seal */}
            <div className="process-seal-interactive" aria-hidden="true">
              <svg
                viewBox="0 0 400 400"
                style={{ transform: `rotate(${sealRotation}deg)` }}
              >
                <circle cx="200" cy="200" r="160" />
                <circle cx="200" cy="200" r="115" />
                {Array.from({ length: 36 }, (_, i) => (
                  <path key={i} d="M200 24v24" transform={`rotate(${i * 10} 200 200)`} />
                ))}
                <path d="M200 86v228M86 200h228M120 120l160 160M120 280l160-160" />
              </svg>
              <div className="process-seal-words">
                <span
                  className={`process-seal-word ${activeStep === 0 || activeStep === 1 ? 'is-active' : ''}`}
                >
                  THINK.
                </span>
                <span
                  className={`process-seal-word ${activeStep === 2 ? 'is-active' : ''}`}
                >
                  BUILD.
                </span>
                <em
                  className={`process-seal-word ${activeStep === 3 || activeStep === 4 ? 'is-active' : ''}`}
                >
                  REFINE.
                </em>
              </div>
            </div>
          </div>

          {/* Right Column: Scrollytelling Step Narrative */}
          <div className="process-scrolly-right">
            <ol className="process-scrolly-list">
              {PROCESS_STEPS.map(([name, title, copy], index) => {
                const isActive = index === activeStep;
                const isPassed = index < activeStep;
                const beamWidth = isActive ? `${Math.min(100, Math.max(5, stepProgress * 100))}%` : isPassed ? '100%' : '0%';

                return (
                  <li
                    key={name}
                    className="process-scrolly-item"
                    data-active={isActive ? 'true' : 'false'}
                    onClick={() => scrollToStep(index)}
                  >
                    <span className="process-number">0{index + 1}</span>
                    <div className="process-item-body">
                      <span className="eyebrow">{name}</span>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                    </div>
                    <span className="process-mark" aria-hidden="true">
                      {PROCESS_MARKS[index]}
                    </span>
                    <span
                      className="process-item-progress-beam"
                      style={{ width: beamWidth }}
                      aria-hidden="true"
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
