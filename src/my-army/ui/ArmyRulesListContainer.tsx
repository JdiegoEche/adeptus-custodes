import { useNavigation } from '../../shared/navigation';
import { ARMY_RULES, MARTIAL_KATAH_RULE_ID } from '../data/army-rules';
import { SUPERHUMAN_FOCUS } from '../data/detachments/shared-stratagems';
import { useArmySelection } from './ArmySelectionContext';
import { ArmyRulesList } from './ArmyRulesList';

export function ArmyRulesListContainer() {
  const { goTo } = useNavigation();
  const { detachments } = useArmySelection();
  const superhumanFocusAvailable = detachments.some((detachment) =>
    detachment.stratagems.some((stratagem) => stratagem.id === SUPERHUMAN_FOCUS.id),
  );

  return (
    <ArmyRulesList
      rules={ARMY_RULES}
      martialKatahRuleId={MARTIAL_KATAH_RULE_ID}
      superhumanFocus={superhumanFocusAvailable ? { onGo: () => goTo('stratagems', `[data-stratagem="${SUPERHUMAN_FOCUS.id}"]`) } : undefined}
    />
  );
}
