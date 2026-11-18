import { GROUP_ORDER, PHASE_ORDER, TURN_ORDER } from '../../shared/game-constants';
import type { Detachment, GroupId, Phase, Stratagem, TurnOwner } from '../../shared/types';

export type StratagemSource =
  | { kind: 'core' }
  | { kind: 'detachment'; detachmentId: string; detachmentName: string };

export interface StratagemEntry {
  stratagem: Stratagem;
  sources: StratagemSource[];
}

export interface GroupBucket {
  group: GroupId;
  entries: StratagemEntry[];
}

export interface TurnBucket {
  turn: TurnOwner;
  entries: StratagemEntry[];
}

export interface PhaseBucket {
  phase: Phase;
  turns: TurnBucket[];
}

/**
 * Core stratagems first, then the stratagems of each selected detachment.
 * A stratagem printed in several selected detachments appears once, with every source.
 */
export function mergeStratagems(core: readonly Stratagem[], detachments: readonly Detachment[]): StratagemEntry[] {
  const byId = new Map<string, StratagemEntry>();
  for (const stratagem of core) {
    byId.set(stratagem.id, { stratagem, sources: [{ kind: 'core' }] });
  }
  for (const detachment of detachments) {
    for (const stratagem of detachment.stratagems) {
      const source: StratagemSource = {
        kind: 'detachment',
        detachmentId: detachment.id,
        detachmentName: detachment.name,
      };
      const existing = byId.get(stratagem.id);
      if (existing) existing.sources.push(source);
      else byId.set(stratagem.id, { stratagem, sources: [source] });
    }
  }
  return [...byId.values()];
}

/** One bucket per non-empty group, in GROUP_ORDER. A stratagem can be in several groups. */
export function groupByGroup(entries: readonly StratagemEntry[]): GroupBucket[] {
  return GROUP_ORDER.map((group) => ({
    group,
    entries: entries.filter((entry) => entry.stratagem.groups.includes(group)),
  })).filter((bucket) => bucket.entries.length > 0);
}

/** One bucket per non-empty phase, split by whose turn it is. Each stratagem appears once per phase it belongs to. */
export function groupByPhase(entries: readonly StratagemEntry[]): PhaseBucket[] {
  return PHASE_ORDER.map((phase) => ({
    phase,
    turns: TURN_ORDER.map((turn) => ({
      turn,
      entries: entries.filter((entry) =>
        entry.stratagem.timings.some((timing) => timing.phase === phase && timing.turn === turn),
      ),
    })).filter((bucket) => bucket.entries.length > 0),
  })).filter((bucket) => bucket.turns.length > 0);
}
