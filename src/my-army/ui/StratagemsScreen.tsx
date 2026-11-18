import { useMemo, useState } from 'react';
import { CORE_STRATAGEMS } from '../../core-rules/data/core-stratagems';
import { Section } from '../../shared/components/Section';
import { CollapsibleSection } from '../../shared/components/CollapsibleSection';
import { GROUP_LABELS, PHASE_LABELS, TURN_LABELS } from '../../shared/i18n/dictionary';
import { useLanguage } from '../../shared/i18n/LanguageContext';
import { STORAGE_KEYS, readStorage, writeStorage } from '../../shared/storage';
import { groupByGroup, groupByPhase, mergeStratagems } from '../domain/stratagem-list';
import { useArmySelection } from './ArmySelectionContext';
import { StratagemCard } from './StratagemCard';

type ViewMode = 'group' | 'phase';

function readViewMode(): ViewMode {
  return readStorage(STORAGE_KEYS.stratagemView) === 'phase' ? 'phase' : 'group';
}

export function StratagemsScreen() {
  const { t, tx } = useLanguage();
  const { detachments } = useArmySelection();
  const [view, setView] = useState<ViewMode>(readViewMode);
  const entries = useMemo(() => mergeStratagems(CORE_STRATAGEMS, detachments), [detachments]);
  const groups = useMemo(() => groupByGroup(entries), [entries]);
  const [openGroups, setOpenGroups] = useState<ReadonlySet<string>>(new Set());

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setOpenGroups(new Set(groups.map((bucket) => bucket.group)));
  };

  const collapseAll = () => {
    setOpenGroups(new Set());
  };

  const changeView = (next: ViewMode) => {
    setView(next);
    writeStorage(STORAGE_KEYS.stratagemView, next);
  };

  return (
    <>
      <div className="sticky top-[var(--header-height)] z-10 -mx-4 bg-ink-950/95 px-4 pb-2 pt-1 backdrop-blur">
        <div role="group" aria-label={t('strat.view')} className="grid grid-cols-2 gap-1 rounded-lg bg-ink-800 p-1">
          {(['group', 'phase'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={view === mode}
              onClick={() => changeView(mode)}
              className={`rounded-md py-2 text-sm font-semibold transition-colors ${
                view === mode ? 'bg-gold-500 text-ink-950' : 'text-gold-300'
              }`}
            >
              {t(mode === 'group' ? 'strat.byGroup' : 'strat.byPhase')}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-parchment/70">
          {t('strat.count', { count: entries.length })}
          {detachments.length === 0 ? <span className="block">{t('strat.onlyCore')}</span> : null}
        </p>
        {view === 'group' && (
          <>
            <p className="mb-3 text-xs italic text-parchment/60">{t('strat.groupNote')}</p>
            <div className="mb-3 flex gap-2">
              <button
                type="button"
                onClick={expandAll}
                className="rounded-md border border-gold-600 px-3 py-1 text-sm font-semibold text-gold-300"
              >
                {t('strat.expandAll')}
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="rounded-md border border-gold-600 px-3 py-1 text-sm font-semibold text-gold-300"
              >
                {t('strat.collapseAll')}
              </button>
            </div>
            {groups.map((bucket) => (
              <CollapsibleSection
                key={bucket.group}
                title={tx(GROUP_LABELS[bucket.group])}
                count={bucket.entries.length}
                open={openGroups.has(bucket.group)}
                onToggle={() => toggleGroup(bucket.group)}
              >
                <ul className="space-y-2">
                  {bucket.entries.map((entry) => (
                    <li key={entry.stratagem.id}>
                      <StratagemCard entry={entry} showGroups={false} />
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            ))}
          </>
        )}
        {view === 'phase' && (
          groupByPhase(entries).map((phaseBucket) => (
            <Section key={phaseBucket.phase} title={tx(PHASE_LABELS[phaseBucket.phase])}>
              {phaseBucket.turns.map((turnBucket) => (
                <div key={turnBucket.turn} className="mb-4">
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold-600">
                    {tx(TURN_LABELS[turnBucket.turn])}
                  </h3>
                  <ul className="space-y-2">
                    {turnBucket.entries.map((entry) => (
                      <li key={entry.stratagem.id}>
                        <StratagemCard entry={entry} showGroups />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>
          ))
        )}
      </div>
    </>
  );
}
