import React, { useCallback, useEffect, useState, useRef } from 'react';

// Common world languages supported by Google Translate
const WORLD_LANGUAGES = [
  { code: 'el', name: 'Greek' },
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

function formatTime(now: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  const offset = -now.getTimezoneOffset();
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} (UTC${offset < 0 ? '−' : '+'}${pad(Math.floor(Math.abs(offset) / 60))}:${pad(Math.abs(offset) % 60)})`;
}

// One loader per document: no duplicate widgets under StrictMode, retry on failure.
let translator: Promise<HTMLSelectElement> | null = null;
function loadTranslator(): Promise<HTMLSelectElement> {
  const existing = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (existing?.options.length) return Promise.resolve(existing);
  if (translator) return translator;
  translator = new Promise((resolve, reject) => {
    const anchor = document.getElementById('google_translate_element') ?? document.createElement('div');
    anchor.id = 'google_translate_element';
    anchor.className = 'notranslate';
    if (!anchor.isConnected) document.body.appendChild(anchor);
    let script: HTMLScriptElement | undefined;
    const observer = new MutationObserver(check);
    const timeout = window.setTimeout(() => finish(new Error('Translation service did not respond. Please try again.')), 20000);
    function finish(error?: Error, combo?: HTMLSelectElement) {
      clearTimeout(timeout); observer.disconnect();
      if (error) { script?.remove(); translator = null; reject(error); }
      else if (combo) resolve(combo);
    }
    function check() {
      const combo = anchor.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (combo?.options.length) finish(undefined, combo);
    }
    window.googleTranslateElementInit = () => {
      try {
        const Widget = window.google?.translate?.TranslateElement;
        if (!Widget) throw new Error('Translation service unavailable. Please try again.');
        if (!anchor.querySelector('.goog-te-combo')) new Widget({ pageLanguage: 'en', autoDisplay: false }, anchor.id);
        check();
      } catch (error) { finish(error instanceof Error ? error : new Error('Translation unavailable.')); }
    };
    observer.observe(anchor, { childList: true, subtree: true });
    if (window.google?.translate?.TranslateElement) window.googleTranslateElementInit();
    else {
      script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onerror = () => finish(new Error('Translation could not load. Check your connection and try again.'));
      document.body.appendChild(script);
    }
  });
  return translator;
}

const TRANSLATION_SAMPLE_SELECTOR = '.hero-copy > p, .manifesto-bottom > p, .work-caption > p';
type TranslationSample = { original: string };
function captureTranslationSamples(): TranslationSample[] {
  // Static editorial text only: animated copy, names, artwork and form values
  // are deliberately excluded from completion detection.
  return Array.from(document.querySelectorAll(TRANSLATION_SAMPLE_SELECTOR))
    .map(element => ({ original: element.textContent ?? '' }));
}

function clearTranslationCookie() {
  document.cookie = 'googtrans=; Max-Age=0; path=/';
  const parts = location.hostname.split('.');
  if (!parts.every(part => /^\d+$/.test(part))) {
    for (let i = 0; i < parts.length - 1; i++) {
      document.cookie = `googtrans=; Max-Age=0; path=/; domain=.${parts.slice(i).join('.')}`;
    }
  }
}

function applyLanguage(combo: HTMLSelectElement, language: string, samples: TranslationSample[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver(check);
    let settle: number | undefined;
    const timeout = window.setTimeout(() => finish(new Error('Translation is unavailable right now. Please select the language again to retry.')), 30000);
    function finish(error?: Error) {
      clearTimeout(timeout); clearTimeout(settle); observer.disconnect();
      if (error) reject(error);
      else {
        // Google's restore-original action can label English as "auto".
        // Restore the document's real source-language metadata as well.
        if (language === 'en') document.documentElement.lang = 'en';
        resolve();
      }
    }
    function check() {
      const live = Array.from(document.querySelectorAll(TRANSLATION_SAMPLE_SELECTOR));
      const changed = live.filter((element, index) => element.textContent !== samples[index]?.original).length;
      const complete = live.length === samples.length && live.length > 0 && (language === 'en' ? changed === 0 : changed === live.length);
      if ((language === 'en' || document.documentElement.lang === language) && complete) {
        // lang changes before Google's response. Verify actual text, without
        // depending on undocumented <font> wrappers or one paragraph.
        if (settle === undefined) settle = window.setTimeout(() => finish(), 300);
      } else { clearTimeout(settle); settle = undefined; }
    }
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    const content = document.getElementById('main');
    if (content) observer.observe(content, { childList: true, subtree: true, characterData: true });
    if (language === 'en') {
      restoreOriginal();
    } else {
      combo.value = language;
      combo.dispatchEvent(new Event('change', { bubbles: true }));
    }
    check();
  });
}

function restoreOriginal() {
  // Use the widget's actual "Show original" action. Selecting English in its
  // target-language dropdown does not reset its original/translated toggle.
  for (const frame of document.querySelectorAll<HTMLIFrameElement>('iframe.skiptranslate')) {
    try {
      const restore = frame.contentDocument?.querySelector<HTMLButtonElement>('button[id$=".restore"]');
      if (restore) { restore.click(); return; }
    } catch { /* A cross-origin frame cannot provide this control. */ }
  }
}

/**
 * 1. Current Time Clock Component
 * Displays the visitor's local time with an exact UTC offset.
 */
export const HeaderClock: React.FC = () => {
  const [timeString, setTimeString] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const updateTime = () => {
      setTimeString(formatTime(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    document.addEventListener('visibilitychange', updateTime);
    return () => { clearInterval(interval); document.removeEventListener('visibilitychange', updateTime); };
  }, []);

  return (
    <div className="header-clock notranslate" translate="no" aria-label="Your local time" title={`Your local time · ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}>
      {timeString}
    </div>
  );
};

/**
 * 2. Translation Component
 * Client-side translation engine supporting English, Greek, and any world language
 */
export const HeaderLang: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const mounted = useRef(false);
  const changing = useRef(false);
  const originals = useRef<TranslationSample[]>([]);

  const handleLanguageChange = useCallback(async (langCode: string) => {
    if (changing.current) return;
    changing.current = true; setBusy(true); setNotice('Loading translation…');
    let combo: HTMLSelectElement | undefined;
    try {
      clearTranslationCookie();
      if (langCode === 'en' && !document.querySelector('.goog-te-combo') && !translator) {
        if (mounted.current) { setCurrentLang('en'); setNotice(''); }
        return;
      }
      combo = await loadTranslator();
      await applyLanguage(combo, langCode, originals.current);
      if (langCode !== 'en') document.cookie = `googtrans=/en/${langCode}; path=/; SameSite=Lax`;
      if (mounted.current) { setCurrentLang(langCode); setNotice(''); }
    } catch (error) {
      clearTranslationCookie();
      if (combo) {
        restoreOriginal();
      }
      if (mounted.current) setCurrentLang('en');
      if (mounted.current) setNotice(error instanceof Error ? error.message : 'Translation unavailable. Please try again.');
    } finally {
      changing.current = false;
      if (mounted.current) setBusy(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    if (!originals.current.length) originals.current = captureTranslationSamples();
    const saved = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([a-zA-Z-]+)/)?.[1];
    // Disable Google's automatic cookie-triggered request; use the same
    // confirmed, serialized path for both reloads and manual selection.
    clearTranslationCookie();
    if (saved && WORLD_LANGUAGES.some(language => language.code === saved)) void handleLanguageChange(saved);
    return () => { mounted.current = false; };
  }, [handleLanguageChange]);

  const activeCustomLang = WORLD_LANGUAGES.find(l => l.code === currentLang);

  return (
    <div className="header-language-wrap notranslate" translate="no"><div className="header-lang" role="navigation" aria-label="Language selection" aria-busy={busy}>
      <button
        type="button"
        disabled={busy}
        aria-pressed={currentLang === 'en'}
        className={`lang-tab ${currentLang === 'en' ? 'is-active' : ''}`}
        onClick={() => handleLanguageChange('en')}
        aria-label="Translate to English"
      >
        ENGLISH
      </button>

      {/* Dropdown for Any Language */}
      <div className="lang-select-container">
        <select
          disabled={busy}
          className={`lang-select ${currentLang !== 'en' ? 'is-active' : ''}`}
          value={currentLang !== 'en' ? currentLang : ''}
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
    </div><span className="translation-notice" role="status">{notice}</span></div>
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
