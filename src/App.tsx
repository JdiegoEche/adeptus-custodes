import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArmySelectionProvider } from './my-army/ui/ArmySelectionContext';
import { BattleScreen } from './my-army/ui/BattleScreen';
import { BattleStateProvider } from './my-army/ui/BattleStateContext';
import { MyArmyScreen } from './my-army/ui/MyArmyScreen';
import { StratagemsScreen } from './my-army/ui/StratagemsScreen';
import { RulesScreen } from './rules-reference/RulesScreen';
import { ErrorBoundary } from './shared/components/ErrorBoundary';
import { ScreenErrorFallback } from './shared/components/ScreenErrorFallback';
import { TabBar } from './shared/components/TabBar';
import { ThemeProvider } from './shared/theme/ThemeContext';
import { ThemeToggle } from './shared/theme/ThemeToggle';
import { LanguageProvider, useLanguage } from './shared/i18n/LanguageContext';
import { LanguageToggle } from './shared/i18n/LanguageToggle';
import { NavigationContext, TAB_IDS, type NavigationValue, type TabId } from './shared/navigation';
import { STORAGE_KEYS, readStorage, writeStorage } from './shared/storage';

function readStoredTab(): TabId {
  const stored = readStorage(STORAGE_KEYS.tab);
  return TAB_IDS.find((tab) => tab === stored) ?? 'army';
}

function Shell() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<TabId>(readStoredTab);
  const [pendingAnchor, setPendingAnchor] = useState<string | null>(null);

  const goTo = useCallback((next: TabId, anchorSelector?: string) => {
    setTab(next);
    writeStorage(STORAGE_KEYS.tab, next);
    setPendingAnchor(anchorSelector ?? null);
    if (!anchorSelector) window.scrollTo({ top: 0 });
  }, []);

  // Scroll to the requested element once the new screen has rendered.
  useEffect(() => {
    if (!pendingAnchor) return;
    const target = document.querySelector(pendingAnchor);
    if (target && typeof target.scrollIntoView === 'function') target.scrollIntoView({ block: 'start' });
    setPendingAnchor(null);
  }, [pendingAnchor, tab]);

  const navigation = useMemo<NavigationValue>(() => ({ tab, goTo }), [tab, goTo]);
  const titles: Record<TabId, string> = {
    army: t('nav.army'),
    battle: t('nav.battle'),
    stratagems: t('nav.stratagems'),
    rules: t('nav.rules'),
  };

  return (
    <NavigationContext.Provider value={navigation}>
      <header className="sticky top-0 z-30 h-[var(--header-height)] border-b border-gold-600/50 bg-ink-950/95 backdrop-blur">
        <div className="mx-auto flex h-full max-w-2xl items-center justify-between gap-3 px-4">
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-bold leading-tight text-gold-400">{t('app.title')}</p>
            <h1 className="truncate text-xs text-parchment/70">{titles[tab]}</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 pb-28 pt-4">
        <ErrorBoundary resetKey={tab} fallback={(reset) => <ScreenErrorFallback onRetry={reset} />}>
          {tab === 'army' ? <MyArmyScreen /> : null}
          {tab === 'battle' ? <BattleScreen /> : null}
          {tab === 'stratagems' ? <StratagemsScreen /> : null}
          {tab === 'rules' ? <RulesScreen /> : null}
        </ErrorBoundary>
      </main>
      <TabBar />
    </NavigationContext.Provider>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ArmySelectionProvider>
          <BattleStateProvider>
            <Shell />
          </BattleStateProvider>
        </ArmySelectionProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
