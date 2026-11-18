import { useLanguage } from '../../shared/i18n/LanguageContext';
import { KATAHS } from '../data/katahs';
import { useArmySelection } from './ArmySelectionContext';
import { useBattleState } from './BattleStateContext';
import type { KatahId } from '../../shared/types';
import { KatahList } from './KatahList';

export function KatahChooserContainer() {
  const { t } = useLanguage();
  const { detachments } = useArmySelection();
  const { isKatahChosen, toggleKatah } = useBattleState();

  const favouredBy = (katahId: KatahId) => detachments.filter((detachment) => detachment.favouredKatah?.katahId === katahId);

  return (
    <KatahList
      katahs={KATAHS}
      hint={t('battle.katahsHint')}
      favouredBy={favouredBy}
      chosen={{ isChosen: isKatahChosen, onToggle: toggleKatah }}
    />
  );
}
