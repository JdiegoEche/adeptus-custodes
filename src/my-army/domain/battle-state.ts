import type { KatahId, Phase, Stratagem, TurnOwner } from '../../shared/types';
import { KATAHS } from '../data/katahs';

/** What the player has spent during a battle. Pure data: no React, no storage. */
export interface BattleState {
  /** Turn counter, starting at 1. Incremented by "new turn". */
  turn: number;
  /** Per-turn stratagem marks, keyed by stratagem + phase + turn owner. Cleared on a new turn. */
  used: string[];
  /** Ka'tahs chosen for this turn. Cleared on a new turn. */
  chosenKatahs: KatahId[];
  /** Once-per-battle stratagem ids already spent. Only cleared by a battle reset. */
  spent: string[];
}

export const INITIAL_BATTLE_STATE: BattleState = { turn: 1, used: [], chosenKatahs: [], spent: [] };

const KNOWN_KATAH_IDS = new Set<string>(KATAHS.map((katah) => katah.id));
const MARK_KEY_PATTERN = /^[a-z0-9-]+\|[a-z]+\|[a-z]+$/;

export function markKey(stratagemId: string, phase: Phase, turn: TurnOwner): string {
  return `${stratagemId}|${phase}|${turn}`;
}

export function isStratagemUsed(state: BattleState, stratagem: Stratagem, phase: Phase, turn: TurnOwner): boolean {
  return stratagem.oncePerBattle
    ? state.spent.includes(stratagem.id)
    : state.used.includes(markKey(stratagem.id, phase, turn));
}

function toggleIn<T>(list: readonly T[], item: T): T[] {
  return list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item];
}

export function toggleStratagemUsed(
  state: BattleState,
  stratagem: Stratagem,
  phase: Phase,
  turn: TurnOwner,
): BattleState {
  return stratagem.oncePerBattle
    ? { ...state, spent: toggleIn(state.spent, stratagem.id) }
    : { ...state, used: toggleIn(state.used, markKey(stratagem.id, phase, turn)) };
}

export function toggleKatahChosen(state: BattleState, katahId: KatahId): BattleState {
  return { ...state, chosenKatahs: toggleIn(state.chosenKatahs, katahId) };
}

/** Starts a new turn: per-turn marks and chosen ka'tahs reset, once-per-battle stratagems stay spent. */
export function startNewTurn(state: BattleState): BattleState {
  return { ...state, turn: state.turn + 1, used: [], chosenKatahs: [] };
}

export function resetBattle(): BattleState {
  return INITIAL_BATTLE_STATE;
}

function uniqueStrings(value: unknown, accept: (item: string) => boolean): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item): item is string => typeof item === 'string' && accept(item)))];
}

/** Accepts only a well-formed stored state; anything else falls back to the initial state. */
export function parseStoredBattle(value: unknown): BattleState {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return INITIAL_BATTLE_STATE;
  const record = value as Record<string, unknown>;
  const turn = Number.isInteger(record.turn) && (record.turn as number) >= 1 ? (record.turn as number) : 1;
  return {
    turn,
    used: uniqueStrings(record.used, (item) => MARK_KEY_PATTERN.test(item)),
    chosenKatahs: uniqueStrings(record.chosenKatahs, (item) => KNOWN_KATAH_IDS.has(item)) as KatahId[],
    spent: uniqueStrings(record.spent, () => true),
  };
}
