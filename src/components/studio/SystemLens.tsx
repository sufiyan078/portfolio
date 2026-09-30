import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { createSystemSculpture } from './createSystemSculpture';

const steps = ['Input', 'Structure', 'Logic', 'Application', 'Result'];
const notes = ['Many moving parts. One possibility.', 'Turn scattered information into a dependable foundation.', 'Connect the parts. Make the system understandable.', 'Give the information a useful interface.', 'Complexity resolved. Ready for the real world.'];
type Sculpture = ReturnType<typeof createSystemSculpture>;

export function SystemLens({ onInteract }: { onInteract: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engine = useRef<Sculpture | null>(null);
  const currentStep = useRef(0);
  const [step, setStep] = useState(0);
  const timerRef = useRef<number | null>(null);
  const isHovered = useRef(false);
  const isVisible = useRef(true);

  // Transition to a specific step
  const navigateToStep = (nextIndex: number) => {
    const fromIndex = currentStep.current;
    if (fromIndex === nextIndex) return;

    // Moving from Result (4) to Input (0): phase 5 smoothly wraps forward into Input
    const targetPhase = fromIndex === 4 && nextIndex === 0 ? 5 : nextIndex;
    engine.current?.setPhase(targetPhase);
    currentStep.current = nextIndex;
    setStep(nextIndex);
  };

  // Schedule auto-advance to next step
  const scheduleAdvance = (delayMs = 3600) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (isHovered.current || !isVisible.current || document.hidden) {
        scheduleAdvance(1200);
        return;
      }
      const nextIndex = (currentStep.current + 1) % steps.length;
      navigateToStep(nextIndex);
      scheduleAdvance(3600);
    }, delayMs);
  };

  useEffect(() => {
    const element = host.current;
    const container = containerRef.current;
    if (!element || !container) return;

    let cancelled = false;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');

    void import('./createSystemSculpture')
      .then(({ createSystemSculpture }) => {
        if (cancelled) return;
        engine.current = createSystemSculpture(element);
        engine.current.setPhase(0);
      })
      .catch(() => {
        element.dataset.renderer = 'fallback';
      });

    // Start auto-advance after initial dwell on Input
    if (!preference.matches) {
      scheduleAdvance(3600);
    }

    // Pause when hero is scrolled out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting && !preference.matches) {
          scheduleAdvance(2600);
        } else if (timerRef.current) {
          window.clearTimeout(timerRef.current);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) window.clearTimeout(timerRef.current);
      } else if (isVisible.current && !preference.matches) {
        scheduleAdvance(2500);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelled = true;
      if (timerRef.current) window.clearTimeout(timerRef.current);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      engine.current?.dispose();
      engine.current = null;
    };
  }, []);

  const handleStepClick = (index: number) => {
    navigateToStep(index);
    onInteract();
    // Allow user to dwell on their selected step for 5 seconds before resuming auto-advance
    scheduleAdvance(5000);
  };

  const handlePointerEnter = () => {
    isHovered.current = true;
    if (timerRef.current) window.clearTimeout(timerRef.current);
  };

  const handlePointerLeave = () => {
    isHovered.current = false;
    engine.current?.setPointer(0, 0);
    scheduleAdvance(3400);
  };

  return (
    <div
      ref={containerRef}
      className="system-lens"
      data-step={step}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className="sculpture-caption">
        <span>THE SYSTEM LENS</span>
        <span>FORM / 0{step + 1}</span>
      </div>

      <div
        className="sculpture-stage"
        ref={host}
        aria-hidden="true"
        onPointerMove={(event) => {
          if (event.pointerType === 'touch') return;
          const rect = event.currentTarget.getBoundingClientRect();
          engine.current?.setPointer(
            ((event.clientX - rect.left) / rect.width) * 2 - 1,
            ((event.clientY - rect.top) / rect.height) * 2 - 1
          );
        }}
        onPointerCancel={() => engine.current?.setPointer(0, 0)}
      >
        <div className="sculpture-fallback">
          {Array.from({ length: 32 }, (_, i) => (
            <i key={i} style={{ '--rib': i } as CSSProperties} />
          ))}
        </div>
      </div>

      <div
        className="lens-controls"
        role="group"
        aria-label="Explore the system transformation"
      >
        {steps.map((label, index) => (
          <button
            key={label}
            aria-pressed={step === index}
            onClick={() => handleStepClick(index)}
          >
            <span>0{index + 1}</span>
            {label}
          </button>
        ))}
      </div>

      <p key={step} className="lens-description lens-note-animate" aria-live="polite">
        {notes[step]}
      </p>
    </div>
  );
}
