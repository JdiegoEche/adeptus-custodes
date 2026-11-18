import { useLanguage } from '../../shared/i18n/LanguageContext';
import type { Detachment } from '../../shared/types';
import { SelectedDetachmentCard } from './SelectedDetachmentCard';
import { StratagemCard } from './StratagemCard';

export function DetachmentDetail({ detachment }: { detachment: Detachment }) {
  const { t } = useLanguage();

  return (
    <>
      <SelectedDetachmentCard detachment={detachment} />
      <h4 className="mt-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gold-600">{t('army.detachmentStratagems')}</h4>
      <ul className="space-y-2">
        {detachment.stratagems.map((stratagem) => (
          <li key={stratagem.id}>
            <StratagemCard entry={{ stratagem, sources: [{ kind: 'detachment', detachmentId: detachment.id, detachmentName: detachment.name }] }} showGroups />
          </li>
        ))}
      </ul>
    </>
  );
}
