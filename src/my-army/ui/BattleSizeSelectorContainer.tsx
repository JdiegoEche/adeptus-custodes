import { BATTLE_SIZES } from '../../core-rules/data/battle-sizes';
import { useArmySelection } from './ArmySelectionContext';
import { BattleSizeSelector } from './BattleSizeSelector';

export function BattleSizeSelectorContainer() {
  const { battleSize, setBattleSize } = useArmySelection();
  return (
    <BattleSizeSelector sizes={BATTLE_SIZES} activeId={battleSize.id} onSelect={setBattleSize} />
  );
}
