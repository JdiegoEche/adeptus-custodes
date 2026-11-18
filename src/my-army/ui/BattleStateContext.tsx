import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { STORAGE_KEYS, readJson, writeJson } from '../../shared/storage';
import type { KatahId, Phase, Stratagem, TurnOwner } from '../../shared/types';
import {
  isStratagemUsed,
  parseStoredBattle,
  resetBattle,
  startNewTurn,
  toggleKatahChosen,
  toggleStratagemUsed,
  type BattleState,
} from '../domain/battle-state';

interface BattleValue {
  state: BattleState;
  isUsed: (stratagem: Stratagem, phase: Phase, turn: TurnOwner) => boolean;
  toggleUsed: (stratagem: Stratagem, phase: Phase, turn: TurnOwner) => void;
  isKatahChosen: (katahId: KatahId) => boolean;
  toggleKatah: (katahId: KatahId) => void;
  newTurn: () => void;
  reset: () => void;
}

const BattleStateContext = createContext<BattleValue | null>(null);

export function BattleStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BattleState>(() =>
    parseStoredBattle(readJson(STORAGE_KEYS.battle)),
  );

  useEffect(() => {
    writeJson(STORAGE_KEYS.battle, state);
  }, [state]);

  const isUsed = useCallback(
    (stratagem: Stratagem, phase: Phase, turn: TurnOwner) =>
      isStratagemUsed(state, stratagem, phase, turn),
    [state],
  );

  const toggleUsed = useCallback(
    (stratagem: Stratagem, phase: Phase, turn: TurnOwner) => {
      setState((current) => toggleStratagemUsed(current, stratagem, phase, turn));
    },
    [],
  );

  const isKatahChosen = useCallback(
    (katahId: KatahId) => state.chosenKatahs.includes(katahId),
    [state],
  );

  const toggleKatah = useCallback(
    (katahId: KatahId) => {
      setState((current) => toggleKatahChosen(current, katahId));
    },
    [],
  );

  const newTurn = useCallback(() => {
    setState(startNewTurn);
  }, []);

  const reset = useCallback(() => {
    setState(() => resetBattle());
  }, []);

  const value = useMemo<BattleValue>(() => ({
    state,
    isUsed,
    toggleUsed,
    isKatahChosen,
    toggleKatah,
    newTurn,
    reset,
  }), [state, isUsed, toggleUsed, isKatahChosen, toggleKatah, newTurn, reset]);

  return <BattleStateContext.Provider value={value}>{children}</BattleStateContext.Provider>;
}

export function useBattleState(): BattleValue {
  const context = useContext(BattleStateContext);
  if (!context) throw new Error('useBattleState must be used inside BattleStateProvider');
  return context;
}
