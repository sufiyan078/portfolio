import { memo } from 'react';

function getIconSvg(name: string) {
  const normalized = name.toLowerCase();

  if (normalized.includes('react')) {
    return (
      <svg width="24" height="24" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }

  if (normalized.includes('typescript')) {
    return (
      <svg width="24" height="24" viewBox="0 0 128 128">
        <rect width="128" height="128" rx="20" fill="#3178C6"/>
        <path d="M72.2 87.2c2.4 4 5.3 7 9.8 7 4.5 0 7.4-2.3 7.4-8 0-11-15.6-11.4-15.6-25.2 0-8.2 6.4-14.7 16.5-14.7 6.4 0 11.2 2.3 14.5 8l-7.7 5c-1.8-3.1-4-4.5-7-4.5-3.8 0-6.1 2.2-6.1 5.3 0 9.8 15.6 10.3 15.6 25 0 9.8-7.7 15.8-18.2 15.8-9.4 0-15.6-4.6-18.7-11.2l9.5-4.5zM38.8 60.5h14.5v46.9H41.5V60.5H27v-12h38.8v12h-27z" fill="#FFF"/>
      </svg>
    );
  }

  if (normalized.includes('tailwind')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#06B6D4"/>
      </svg>
    );
  }

  if (normalized.includes('next.js') || normalized.includes('nextjs')) {
    return (
      <svg width="24" height="24" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" fill="#000"/>
        <path d="M149.508 157.438L69.14 54H54v71.97h12.114V69.384l73.885 95.127a90.54 90.54 0 009.51-7.073z" fill="url(#next-g1)"/>
        <path d="M115 54h12v72h-12z" fill="url(#next-g2)"/>
        <defs>
          <linearGradient id="next-g1" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF"/>
            <stop offset="1" stopColor="#FFF" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="next-g2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF"/>
            <stop offset="1" stopColor="#FFF" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (normalized.includes('firebase') || normalized.includes('firestore')) {
    return (
      <svg width="22" height="24" viewBox="0 0 256 351">
        <path d="M0 282.857L33.774 2.822a9.429 9.429 0 0117.848-1.933L85.64 69.458 0 282.857z" fill="#FFA000"/>
        <path d="M0 282.857l85.64-213.399 37.892 70.835L0 282.857z" fill="#F57C00"/>
        <path d="M136.216 142.138l28.986-55.207a9.429 9.429 0 0117.37 1.831L256 282.857 136.216 142.138z" fill="#FFA000"/>
        <path d="M0 282.857l124.62 70.076a9.429 9.429 0 008.76 0L256 282.857 128 351 0 282.857z" fill="#FFCA28"/>
      </svg>
    );
  }

  if (normalized.includes('google')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
      </svg>
    );
  }

  if (normalized.includes('sheetjs') || normalized.includes('xlsx') || normalized.includes('excel')) {
    return (
      <svg width="24" height="24" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#107C41"/>
        <path d="M17.5 7h8a1.5 1.5 0 011.5 1.5v15a1.5 1.5 0 01-1.5 1.5h-8V7z" fill="#185C37" opacity=".4"/>
        <path d="M6 9.5A1.5 1.5 0 017.5 8h10A1.5 1.5 0 0119 9.5v13a1.5 1.5 0 01-1.5 1.5h-10A1.5 1.5 0 016 22.5v-13z" fill="#107C41"/>
        <path d="M9.8 20.5l2.7-4.5-2.5-4.5h2.3l1.4 2.8 1.4-2.8h2.2l-2.5 4.5 2.7 4.5h-2.3l-1.6-3-1.6 3H9.8z" fill="#FFF"/>
      </svg>
    );
  }

  if (normalized.includes('git')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M23.546 10.93L13.067.452a1.5 1.5 0 00-2.124 0L8.831 2.564l3.3 3.3a1.782 1.782 0 012.247 2.264l3.176 3.176a1.776 1.776 0 012.015 2.793l.03.03a1.782 1.782 0 01-2.483 2.522l-3.08-3.08a1.78 1.78 0 01-2.036-.372 1.78 1.78 0 01-.418-1.928l-3.14-3.14a1.786 1.786 0 01-1.983-.34 1.78 1.78 0 010-2.52l3.324-3.325L.452 10.93a1.5 1.5 0 000 2.124l10.479 10.48a1.5 1.5 0 002.124 0l10.491-10.48a1.5 1.5 0 000-2.124z" fill="#F05032"/>
      </svg>
    );
  }

  if (normalized.includes('gemini')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.627 12 12 0-6.627 5.627-12 12-12-6.627 0-12-5.627-12-12z" fill="url(#gemini-grad)"/>
        <defs>
          <linearGradient id="gemini-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1BA1E3"/>
            <stop offset=".45" stopColor="#5B7FE8"/>
            <stop offset="1" stopColor="#9B72CB"/>
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (normalized.includes('jsearch')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#7C3AED" strokeWidth="2.2"/>
        <path d="M20 20l-4-4" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M9 11h4M11 9v4" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
  }

  if (normalized.includes('html2canvas')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="18" rx="4" fill="#F43F5E"/>
        <path d="M7 16l3-4 2.5 3 3.5-5 4 6H7z" fill="#FFF"/>
        <circle cx="8" cy="8" r="1.5" fill="#FFF"/>
      </svg>
    );
  }

  if (normalized.includes('jspdf')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8l-5-5H5z" fill="#EF4444"/>
        <path d="M14 3v5h5" fill="#DC2626"/>
        <text x="5" y="17" fill="#FFF" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">PDF</text>
      </svg>
    );
  }

  if (normalized.includes('pptx') || normalized.includes('powerpoint')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#D24726"/>
        <path d="M7 6.5h5.5a3 3 0 010 6H9.5v5H7v-11zm2.5 4h2.8a1 1 0 000-2H9.5v2z" fill="#FFF"/>
      </svg>
    );
  }

  // Fallback icon for any other tool
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0C1E29" strokeWidth="2">
      <circle cx="12" cy="12" r="9"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  );
}

export const TechIconsRow = memo(function TechIconsRow({ items }: { items: string[] }) {
  // Deduplicate items
  const uniqueItems = Array.from(new Set(items));

  return (
    <div className="tech-icons-row" role="list" aria-label="Technologies and tools used">
      {uniqueItems.map(item => (
        <div
          key={item}
          className="tech-icon-chip"
          role="listitem"
          tabIndex={0}
          aria-label={item}
        >
          <div className="tech-icon-glyph">
            {getIconSvg(item)}
          </div>
          <span className="tech-icon-tooltip" role="tooltip">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
});
