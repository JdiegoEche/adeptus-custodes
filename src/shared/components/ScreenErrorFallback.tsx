import { useLanguage } from '../i18n/LanguageContext';

interface ScreenErrorFallbackProps {
  onRetry: () => void;
}

/** Localized fallback shown in place of a screen that failed to render. */
export function ScreenErrorFallback({ onRetry }: ScreenErrorFallbackProps) {
  const { t } = useLanguage();
  return (
    <div role="alert" className="rounded-lg border border-red-500/60 bg-red-950/40 p-4 text-parchment">
      <p className="font-display text-lg font-bold text-gold-400">{t('error.title')}</p>
      <p className="mt-2 text-sm">{t('error.body')}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-md border border-gold-600 px-4 py-2 text-sm font-semibold text-gold-400"
      >
        {t('error.retry')}
      </button>
    </div>
  );
}

/**
 * Last-resort fallback for errors outside the screens (for example in the providers).
 * It cannot rely on the language context, so it shows both languages.
 */
export function AppErrorFallback() {
  return (
    <div role="alert" className="mx-auto max-w-2xl p-4 text-parchment">
      <p className="font-display text-lg font-bold text-gold-400">La app falló / The app failed</p>
      <p className="mt-2 text-sm">Recargá la página. / Reload the page.</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-4 rounded-md border border-gold-600 px-4 py-2 text-sm font-semibold text-gold-400"
      >
        Recargar / Reload
      </button>
    </div>
  );
}
