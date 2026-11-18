import type { Language } from '../types';
import { useLanguage } from './LanguageContext';

const OPTIONS: Array<{ value: Language; short: string }> = [
  { value: 'es', short: 'ES' },
  { value: 'en', short: 'EN' },
];

/** Español / English switch, shown in the header of every screen. */
export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div role="group" aria-label={t('lang.label')} className="flex rounded-full border border-gold-600 p-0.5">
      {OPTIONS.map((option) => {
        const active = option.value === language;
        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={active}
            aria-label={t(option.value === 'es' ? 'lang.es' : 'lang.en')}
            onClick={() => setLanguage(option.value)}
            className={`min-w-11 rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
              active ? 'bg-gold-500 text-ink-950' : 'text-gold-300 hover:bg-ink-800'
            }`}
          >
            {option.short}
          </button>
        );
      })}
    </div>
  );
}
