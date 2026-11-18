import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { STORAGE_KEYS, readStorage, writeStorage } from '../storage';
import type { Language, LocalizedText } from '../types';
import { DICTIONARY, type UiKey } from './dictionary';

export const DEFAULT_LANGUAGE: Language = 'es';

type Params = Record<string, string | number>;

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  /** Translates a UI dictionary key, replacing `{name}` placeholders. */
  t: (key: UiKey, params?: Params) => string;
  /** Picks the current language from a data text. */
  tx: (text: LocalizedText) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): Language {
  const stored = readStorage(STORAGE_KEYS.language);
  return stored === 'es' || stored === 'en' ? stored : DEFAULT_LANGUAGE;
}

export function interpolate(template: string, params?: Params): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    writeStorage(STORAGE_KEYS.language, next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key, params) => interpolate(DICTIONARY[key][language], params),
      tx: (text) => text[language],
    }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
