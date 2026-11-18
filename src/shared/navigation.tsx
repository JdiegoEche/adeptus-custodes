import { createContext, useContext } from 'react';

export type TabId = 'army' | 'battle' | 'stratagems' | 'rules';

export const TAB_IDS: TabId[] = ['army', 'battle', 'stratagems', 'rules'];

export interface NavigationValue {
  tab: TabId;
  /** Switches screen and optionally scrolls to the first element matching `anchorSelector`. */
  goTo: (tab: TabId, anchorSelector?: string) => void;
}

export const NavigationContext = createContext<NavigationValue | null>(null);

export function useNavigation(): NavigationValue {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used inside NavigationContext');
  return context;
}
