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

  // Schedule auto-advance to next step (brisk 2000ms pace)
  const scheduleAdvance = (delayMs = 2000) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (!isVisible.current || document.hidden) {
        scheduleAdvance(800);
        return;
      }
      const nextIndex = (currentStep.current + 1) % steps.length;
      navigateToStep(nextIndex);
      scheduleAdvance(2000);
    }, delayMs);
  };

  useEffect(() => {
    const element = host.current;
    const container = containerRef.current;
    if (!element || !container) return;

    let cancelled = false;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const phone = matchMedia('(max-width: 640px)').matches;

    void import('./createSystemSculpture')
      .then(({ createSystemSculpture }) => {
        if (cancelled) return;
        engine.current = createSystemSculpture(element);
        // Phone timers can advance before Three.js finishes downloading.
        engine.current.setPhase(phone ? currentStep.current : 0);
      })
      .catch(() => {
        element.dataset.renderer = 'fallback';
      });

    // Start auto-advance after initial 2s dwell on Input
    if (!preference.matches) {
      scheduleAdvance(2000);
    }

    // Pause only when hero is completely scrolled out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting && !preference.matches) {
          scheduleAdvance(1600);
        } else if (timerRef.current) {
          window.clearTimeout(timerRef.current);
        }
      },
      { threshold: phone ? 0 : 0.15 }
    );
    // Phone controls can be below the fold while the object is in view.
    observer.observe(phone ? element : container);

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) window.clearTimeout(timerRef.current);
      } else if (isVisible.current && !preference.matches) {
        scheduleAdvance(1600);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    if (phone) window.addEventListener('pageshow', onVisibilityChange);

    return () => {
      cancelled = true;
      if (timerRef.current) window.clearTimeout(timerRef.current);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (phone) window.removeEventListener('pageshow', onVisibilityChange);
      engine.current?.dispose();
      engine.current = null;
    };
  }, []);

  const handleStepClick = (index: number) => {
    navigateToStep(index);
    onInteract();
    // Continue the quick auto-advance from the newly chosen step
    scheduleAdvance(2400);
  };

  return (
    <div
      ref={containerRef}
      className="system-lens"
      data-step={step}
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
        onPointerLeave={() => engine.current?.setPointer(0, 0)}
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
