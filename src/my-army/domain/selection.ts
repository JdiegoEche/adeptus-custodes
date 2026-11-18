import { BATTLE_SIZES, DEFAULT_BATTLE_SIZE_ID } from '../../core-rules/data/battle-sizes';
import type { BattleSize, BattleSizeId, Detachment } from '../../shared/types';
import { DETACHMENTS } from '../data/detachments';

export interface ArmySelection {
  battleSizeId: BattleSizeId;
  detachmentIds: string[];
}

/** Core rules 25.03: in an Incursion battle a detachment of this many DP is allowed if it is the only one. */
export const SOLE_DETACHMENT_DP_EXCEPTION = 3;

const EMPTY_SELECTION: ArmySelection = { battleSizeId: DEFAULT_BATTLE_SIZE_ID, detachmentIds: [] };

/** Accepts only a well-formed stored selection; anything else falls back to defaults. */
export function parseStoredSelection(value: unknown): ArmySelection {
  if (!value || typeof value !== 'object') return EMPTY_SELECTION;
  const record = value as Record<string, unknown>;
  const battleSizeId = BATTLE_SIZES.some((size) => size.id === record.battleSizeId)
    ? (record.battleSizeId as BattleSizeId)
    : DEFAULT_BATTLE_SIZE_ID;
  const knownIds = new Set(DETACHMENTS.map((detachment) => detachment.id));
  const detachmentIds = Array.isArray(record.detachmentIds)
    ? [...new Set(record.detachmentIds.filter((id): id is string => typeof id === 'string' && knownIds.has(id)))]
    : [];
  return { battleSizeId, detachmentIds };
}

export type SelectionWarning =
  | { kind: 'dp-over-limit'; total: number; limit: number }
  | { kind: 'multiple-shield-hosts'; detachmentNames: string[] };

/** Maps ids to detachments in catalogue order; unknown and repeated ids are ignored. */
export function resolveDetachments(ids: readonly string[], catalogue: readonly Detachment[]): Detachment[] {
  const wanted = new Set(ids);
  return catalogue.filter((detachment) => wanted.has(detachment.id));
}

/** Adds the id if missing, removes it if present. The same detachment can never be selected twice. */
export function toggleDetachmentId(ids: readonly string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((current) => current !== id) : [...ids, id];
}

export function totalDp(detachments: readonly Detachment[]): number {
  return detachments.reduce((sum, detachment) => sum + detachment.dp, 0);
}

export function isWithinDpLimit(detachments: readonly Detachment[], battleSize: BattleSize): boolean {
  if (totalDp(detachments) <= battleSize.dp) return true;
  const [only] = detachments;
  return (
    battleSize.allowsSingleThreeDpDetachment && detachments.length === 1 && only?.dp === SOLE_DETACHMENT_DP_EXCEPTION
  );
}

export function selectedShieldHosts(detachments: readonly Detachment[]): Detachment[] {
  return detachments.filter((detachment) => detachment.shieldHost);
}

export function validateSelection(detachments: readonly Detachment[], battleSize: BattleSize): SelectionWarning[] {
  const warnings: SelectionWarning[] = [];
  if (!isWithinDpLimit(detachments, battleSize)) {
    warnings.push({ kind: 'dp-over-limit', total: totalDp(detachments), limit: battleSize.dp });
  }
  const shieldHosts = selectedShieldHosts(detachments);
  if (shieldHosts.length > 1) {
    warnings.push({ kind: 'multiple-shield-hosts', detachmentNames: shieldHosts.map((d) => d.name) });
  }
  return warnings;
}
