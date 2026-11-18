import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getBattleSize } from '../../core-rules/data/battle-sizes';
import { STORAGE_KEYS, readJson, writeJson } from '../../shared/storage';
import type { BattleSize, BattleSizeId, Detachment } from '../../shared/types';
import { DETACHMENTS } from '../data/detachments';
import {
  parseStoredSelection,
  resolveDetachments,
  toggleDetachmentId,
  validateSelection,
  type ArmySelection,
  type SelectionWarning,
} from '../domain/selection';

interface ArmySelectionValue {
  battleSize: BattleSize;
  detachments: Detachment[];
  warnings: SelectionWarning[];
  isSelected: (detachmentId: string) => boolean;
  toggleDetachment: (detachmentId: string) => void;
  setBattleSize: (id: BattleSizeId) => void;
}

const ArmySelectionContext = createContext<ArmySelectionValue | null>(null);

export function ArmySelectionProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<ArmySelection>(() =>
    parseStoredSelection(readJson(STORAGE_KEYS.selection)),
  );

  useEffect(() => {
    writeJson(STORAGE_KEYS.selection, selection);
  }, [selection]);

  const update = useCallback((change: (current: ArmySelection) => ArmySelection) => {
    setSelection(change);
  }, []);

  const value = useMemo<ArmySelectionValue>(() => {
    const battleSize = getBattleSize(selection.battleSizeId);
    const detachments = resolveDetachments(selection.detachmentIds, DETACHMENTS);
    return {
      battleSize,
      detachments,
      warnings: validateSelection(detachments, battleSize),
      isSelected: (id) => selection.detachmentIds.includes(id),
      toggleDetachment: (id) =>
        update((current) => ({ ...current, detachmentIds: toggleDetachmentId(current.detachmentIds, id) })),
      setBattleSize: (id) => update((current) => ({ ...current, battleSizeId: id })),
    };
  }, [selection, update]);

  return <ArmySelectionContext.Provider value={value}>{children}</ArmySelectionContext.Provider>;
}

export function useArmySelection(): ArmySelectionValue {
  const context = useContext(ArmySelectionContext);
  if (!context) throw new Error('useArmySelection must be used inside ArmySelectionProvider');
  return context;
}
