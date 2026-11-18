import { useLanguage } from '../../shared/i18n/LanguageContext';
import { KATAHS } from '../data/katahs';
import { useArmySelection } from './ArmySelectionContext';
import type { KatahId } from '../../shared/types';
import { KatahList } from './KatahList';

export function KatahListContainer() {
  const { t } = useLanguage();
  const { detachments } = useArmySelection();

  const favouredBy = (katahId: KatahId) => detachments.filter((detachment) => detachment.favouredKatah?.katahId === katahId);

  return <KatahList katahs={KATAHS} hint={t('army.katahsHint')} favouredBy={favouredBy} />;
}
