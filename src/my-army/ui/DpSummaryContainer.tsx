import { totalDp } from '../domain/selection';
import { useArmySelection } from './ArmySelectionContext';
import { DpSummary } from './DpSummary';

export function DpSummaryContainer() {
  const { battleSize, detachments, warnings } = useArmySelection();

  return (
    <DpSummary
      total={totalDp(detachments)}
      limit={battleSize.dp}
      hasDetachments={detachments.length > 0}
      warnings={warnings}
      showIncursionHint={battleSize.allowsSingleThreeDpDetachment}
    />
  );
}
