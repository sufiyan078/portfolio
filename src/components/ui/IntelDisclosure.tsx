import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { getUniversalAudioProps } from '../../utils/soundEffects';

/** Keep full case-study copy available without making every card a wall of text. */
export function IntelDisclosure({ children, label = 'Inspect details' }: { children: ReactNode; label?: string }) {
  return (
    <details className="realm-intel group/intel">
      <summary {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER')}>
        <span className="realm-intel-label">{label}</span>
        <span className="realm-intel-btn" aria-hidden="true">
          <ChevronDown className="w-3.5 h-3.5 text-[#B8BAC0] transition-transform duration-200" strokeWidth={2.5} />
        </span>
      </summary>
      <div className="realm-intel-copy">{children}</div>
    </details>
  );
}
