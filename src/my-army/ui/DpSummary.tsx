import type { SelectionWarning } from '../domain/selection';
import { useLanguage } from '../../shared/i18n/LanguageContext';

export function DpSummary({ total, limit, hasDetachments, warnings, showIncursionHint }: {
  total: number;
  limit: number;
  hasDetachments: boolean;
  warnings: readonly SelectionWarning[];
  showIncursionHint: boolean;
}) {
  const { t } = useLanguage();
  const hasWarnings = warnings.length > 0;

  return (
    <div className="mt-3" aria-live="polite">
      <p
        className={`rounded-lg px-3 py-2 text-center font-display text-xl font-bold ${
          hasWarnings ? 'bg-red-950 text-red-100 ring-1 ring-red-500' : 'bg-ink-800 text-gold-300'
        }`}
      >
        {t('army.dpTotal', { total, limit })}
      </p>
      {warnings.length > 0 ? (
        <ul className="mt-2 space-y-1">
          {warnings.map((warning) => (
            <li
              key={warning.kind}
              role="alert"
              className="rounded border border-red-500/70 bg-red-950/60 px-3 py-2 text-sm text-red-100"
            >
              {warning.kind === 'dp-over-limit' ? (
                <>
                  {t('army.warning.dpOver', { total: warning.total, limit: warning.limit })}
                  {showIncursionHint ? (
                    <span className="block text-xs opacity-90">{t('army.warning.incursionHint')}</span>
                  ) : null}
                </>
              ) : (
                t('army.warning.shieldHosts', { names: warning.detachmentNames.join(', ') })
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-center text-sm text-parchment/70">
          {!hasDetachments ? t('army.noneSelected') : t('army.valid')}
        </p>
      )}
    </div>
  );
}
