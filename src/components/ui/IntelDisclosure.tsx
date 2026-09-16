import type { ReactNode } from 'react';
import { getUniversalAudioProps } from '../../utils/soundEffects';

/** Keep full case-study copy available without making every card a wall of text. */
export function IntelDisclosure({ children, label = 'Inspect details' }: { children: ReactNode; label?: string }) {
  return <details className="realm-intel">
    <summary {...getUniversalAudioProps()}>{label}<span aria-hidden="true">+</span></summary>
    <div className="realm-intel-copy">{children}</div>
  </details>;
}
