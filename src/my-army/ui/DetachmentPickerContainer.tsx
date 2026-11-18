import { DETACHMENTS } from '../data/detachments';
import { useArmySelection } from './ArmySelectionContext';
import { DetachmentPicker } from './DetachmentPicker';

export function DetachmentPickerContainer() {
  const { isSelected, toggleDetachment } = useArmySelection();

  return (
    <DetachmentPicker detachments={DETACHMENTS} isSelected={isSelected} onToggle={toggleDetachment} />
  );
}
