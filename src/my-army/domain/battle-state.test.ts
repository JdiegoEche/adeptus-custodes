import { describe, expect, it } from 'vitest';
import { CORE_STRATAGEMS } from '../../core-rules/data/core-stratagems';
import type { Stratagem } from '../../shared/types';
import {
  INITIAL_BATTLE_STATE,
  isStratagemUsed,
  markKey,
  parseStoredBattle,
  resetBattle,
  startNewTurn,
  toggleKatahChosen,
  toggleStratagemUsed,
} from './battle-state';

const byName = (name: string): Stratagem => {
  const found = CORE_STRATAGEMS.find((stratagem) => stratagem.name === name);
  if (!found) throw new Error(`Missing core stratagem ${name}`);
  return found;
};

const overwatch = byName('Fire Overwatch');
const bravery = byName('Insane Bravery');

describe('markKey', () => {
  it('combines stratagem, phase and turn owner', () => {
    expect(markKey('fire-overwatch', 'movement', 'opponent')).toBe('fire-overwatch|movement|opponent');
  });
});

describe('toggleStratagemUsed', () => {
  it('marks a stratagem as used and unmarks it on the second toggle', () => {
    const used = toggleStratagemUsed(INITIAL_BATTLE_STATE, overwatch, 'movement', 'opponent');
    expect(isStratagemUsed(used, overwatch, 'movement', 'opponent')).toBe(true);
    const unused = toggleStratagemUsed(used, overwatch, 'movement', 'opponent');
    expect(isStratagemUsed(unused, overwatch, 'movement', 'opponent')).toBe(false);
  });

  it('tracks the same stratagem separately per phase', () => {
    const used = toggleStratagemUsed(INITIAL_BATTLE_STATE, overwatch, 'movement', 'opponent');
    expect(isStratagemUsed(used, overwatch, 'shooting', 'opponent')).toBe(false);
  });

  it('does not mutate the previous state', () => {
    toggleStratagemUsed(INITIAL_BATTLE_STATE, overwatch, 'movement', 'opponent');
    expect(INITIAL_BATTLE_STATE.used).toEqual([]);
  });

  it('stores a once-per-battle stratagem by id, whatever the phase', () => {
    const spent = toggleStratagemUsed(INITIAL_BATTLE_STATE, bravery, 'command', 'mine');
    expect(spent.spent).toEqual(['insane-bravery']);
    expect(spent.used).toEqual([]);
    expect(isStratagemUsed(spent, bravery, 'command', 'mine')).toBe(true);
  });
});

describe('toggleKatahChosen', () => {
  it('chooses several ka\'tahs and unchooses one', () => {
    let state = toggleKatahChosen(INITIAL_BATTLE_STATE, 'salvus');
    state = toggleKatahChosen(state, 'rendax');
    expect(state.chosenKatahs).toEqual(['salvus', 'rendax']);
    state = toggleKatahChosen(state, 'salvus');
    expect(state.chosenKatahs).toEqual(['rendax']);
  });
});

describe('startNewTurn', () => {
  it('increments the turn and clears per-turn marks and chosen ka\'tahs', () => {
    let state = toggleStratagemUsed(INITIAL_BATTLE_STATE, overwatch, 'movement', 'opponent');
    state = toggleKatahChosen(state, 'calistus');
    const next = startNewTurn(state);
    expect(next.turn).toBe(2);
    expect(next.used).toEqual([]);
    expect(next.chosenKatahs).toEqual([]);
  });

  it('keeps once-per-battle stratagems spent', () => {
    const spent = toggleStratagemUsed(INITIAL_BATTLE_STATE, bravery, 'command', 'mine');
    expect(isStratagemUsed(startNewTurn(spent), bravery, 'command', 'mine')).toBe(true);
  });
});

describe('resetBattle', () => {
  it('returns the initial state, including once-per-battle stratagems', () => {
    const spent = startNewTurn(toggleStratagemUsed(INITIAL_BATTLE_STATE, bravery, 'command', 'mine'));
    expect(resetBattle()).toEqual(INITIAL_BATTLE_STATE);
    expect(spent.turn).toBe(2);
  });
});

describe('parseStoredBattle', () => {
  it('falls back to the initial state for null, strings, numbers and arrays', () => {
    for (const value of [null, undefined, 'x', 42, ['a']]) {
      expect(parseStoredBattle(value)).toEqual(INITIAL_BATTLE_STATE);
    }
  });

  it('keeps a well-formed state', () => {
    const stored = {
      turn: 3,
      used: ['fire-overwatch|movement|opponent'],
      chosenKatahs: ['salvus'],
      spent: ['insane-bravery'],
    };
    expect(parseStoredBattle(stored)).toEqual(stored);
  });

  it('resets an invalid turn to 1', () => {
    expect(parseStoredBattle({ turn: 0 }).turn).toBe(1);
    expect(parseStoredBattle({ turn: 'two' }).turn).toBe(1);
    expect(parseStoredBattle({ turn: 2.5 }).turn).toBe(1);
  });

  it('drops malformed marks, unknown ka\'tahs and non-string ids', () => {
    const parsed = parseStoredBattle({
      turn: 2,
      used: ['fire-overwatch|movement|opponent', 'garbage', 7, null],
      chosenKatahs: ['salvus', 'bogus', 3],
      spent: ['insane-bravery', 9, {}],
    });
    expect(parsed.used).toEqual(['fire-overwatch|movement|opponent']);
    expect(parsed.chosenKatahs).toEqual(['salvus']);
    expect(parsed.spent).toEqual(['insane-bravery']);
  });

  it('removes duplicates', () => {
    const parsed = parseStoredBattle({
      turn: 1,
      used: ['a|movement|mine', 'a|movement|mine'],
      chosenKatahs: ['salvus', 'salvus'],
      spent: ['x', 'x'],
    });
    expect(parsed.used).toHaveLength(1);
    expect(parsed.chosenKatahs).toEqual(['salvus']);
    expect(parsed.spent).toEqual(['x']);
  });

  it('falls back to empty lists when they are not arrays', () => {
    const parsed = parseStoredBattle({ turn: 2, used: 'x', chosenKatahs: {}, spent: 5 });
    expect(parsed).toEqual({ turn: 2, used: [], chosenKatahs: [], spent: [] });
  });
});
