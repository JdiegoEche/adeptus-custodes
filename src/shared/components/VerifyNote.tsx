import { useLanguage } from '../i18n/LanguageContext';
import type { LocalizedText } from '../types';
import { Badge } from './Badge';

/** "A verificar / To verify" badge with the doubt explained. Renders nothing without a note. */
export function VerifyNote({ note }: { note?: LocalizedText }) {
  const { t, tx } = useLanguage();
  if (!note) return null;
  return (
    <p className="mt-2 flex flex-wrap items-start gap-2 rounded border border-amber-600/60 bg-amber-950/40 p-2 text-sm text-amber-100">
      <Badge tone="warning">{t('common.verify')}</Badge>
      <span className="min-w-0 flex-1">{tx(note)}</span>
    </p>
  );
}
