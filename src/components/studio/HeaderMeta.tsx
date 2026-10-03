import React, { useEffect, useState, useRef } from 'react';

// Common world languages supported by Google Translate
const WORLD_LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh-CN', name: 'Chinese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ru', name: 'Russian' },
  { code: 'nl', name: 'Dutch' },
  { code: 'sv', name: 'Swedish' },
  { code: 'tr', name: 'Turkish' },
  { code: 'pl', name: 'Polish' },
  { code: 'id', name: 'Indonesian' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
  { code: 'he', name: 'Hebrew' },
  { code: 'fa', name: 'Persian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'cs', name: 'Czech' },
  { code: 'ro', name: 'Romanian' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'da', name: 'Danish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'no', name: 'Norwegian' },
];

/**
 * 1. Current Time Clock Component
 * Displays live time formatted as HH:MM:SS (GMT+X)
 */
export const HeaderClock: React.FC = () => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');

      const offsetMinutes = now.getTimezoneOffset();
      const offsetHours = -offsetMinutes / 60;
      const sign = offsetHours >= 0 ? '+' : '';
      const offsetDisplay = Number.isInteger(offsetHours)
        ? `${sign}${offsetHours}`
        : `${sign}${offsetHours.toFixed(1).replace(/\.0$/, '')}`;

      setTimeString(`${h}:${m}:${s} (GMT${offsetDisplay})`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-clock" aria-label="Current time">
      {timeString || '00:00:00 (GMT+0)'}
    </div>
  );
};

/**
 * 2. Translation Component
 * Client-side translation engine supporting English, Greek, and any world language
 */
export const HeaderLang: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<string>('en');
  const isGoogleLoaded = useRef(false);

  useEffect(() => {
    // Read current cookie if already set
    const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
    if (match && match[1]) {
      setCurrentLang(match[1]);
    }

    if (window.google?.translate?.TranslateElement || isGoogleLoaded.current) {
      return;
    }
    isGoogleLoaded.current = true;

    // Define global callback
    window.googleTranslateElementInit = () => {
      try {
        const GoogleTranslate = window.google?.translate?.TranslateElement;
        if (GoogleTranslate) {
          new GoogleTranslate(
            {
              pageLanguage: 'en',
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }
      } catch (err) {
        console.warn('Google Translate initialization:', err);
      }
    };

    // Append hidden anchor element if not already present
    if (!document.getElementById('google_translate_element')) {
      const gDiv = document.createElement('div');
      gDiv.id = 'google_translate_element';
      gDiv.style.display = 'none';
      document.body.appendChild(gDiv);
    }

    // Load Google script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    if (langCode === 'en') {
      const domain = window.location.hostname === 'localhost' ? '' : `.${window.location.hostname}`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;${domain ? ` domain=${domain};` : ''}`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (combo) {
        combo.value = 'en';
        combo.dispatchEvent(new Event('change'));
      }
      setCurrentLang('en');
      return;
    }

    const domain = window.location.hostname === 'localhost' ? '' : `.${window.location.hostname}`;
    document.cookie = `googtrans=/en/${langCode}; path=/;${domain ? ` domain=${domain};` : ''}`;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;

    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
    }
    setCurrentLang(langCode);
  };

  const activeCustomLang = WORLD_LANGUAGES.find(l => l.code === currentLang);

  return (
    <div className="header-lang" role="navigation" aria-label="Language selection">
      <button
        type="button"
        className={`lang-tab ${currentLang === 'en' ? 'is-active' : ''}`}
        onClick={() => handleLanguageChange('en')}
        aria-label="Translate to English"
      >
        ENGLISH
      </button>

      <button
        type="button"
        className={`lang-tab ${currentLang === 'el' ? 'is-active' : ''}`}
        onClick={() => handleLanguageChange('el')}
        aria-label="Translate to Greek"
      >
        GREEK
      </button>

      {/* Dropdown for Any Language */}
      <div className="lang-select-container">
        <select
          className={`lang-select ${currentLang !== 'en' && currentLang !== 'el' ? 'is-active' : ''}`}
          value={currentLang !== 'en' && currentLang !== 'el' ? currentLang : ''}
          onChange={(e) => handleLanguageChange(e.target.value)}
          aria-label="Translate portfolio to any language"
        >
          <option value="" disabled hidden>
            {activeCustomLang ? activeCustomLang.name.toUpperCase() : 'ANY LANGUAGE'}
          </option>
          {WORLD_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const HeaderMeta: React.FC = () => {
  return (
    <>
      <HeaderClock />
      <HeaderLang />
    </>
  );
};

// Global typing extension
declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (options: unknown, elementId: string) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}
