import { VerifyNote } from '../../shared/components/VerifyNote';
import { PHASE_LABELS, TURN_LABELS } from '../../shared/i18n/dictionary';
import { useLanguage } from '../../shared/i18n/LanguageContext';
import type { StratagemEntry } from '../domain/stratagem-list';
import { GroupTags } from './GroupTags';

export function StratagemCard({ entry, showGroups, usage }: { entry: StratagemEntry; showGroups: boolean; usage?: { used: boolean; onToggle: () => void } }) {
  const { t, tx } = useLanguage();
  const { stratagem, sources } = entry;

  return (
    <article
      data-stratagem={stratagem.id}
      aria-label={stratagem.name}
      data-group={stratagem.groups[0]}
      className="plate scroll-mt-20"
      data-used={usage?.used || undefined}
    >
      <div className="plate-inner">
        <div className="plate-medallion" role="img" aria-label={t('common.cp', { cp: stratagem.cp })}>
          <span>{stratagem.cp}<small>CP</small></span>
        </div>
        <h4 className="plate-title">{stratagem.name}</h4>
        {stratagem.cpNote ? (
          <p className="mt-1 text-xs text-gold-400">{tx(stratagem.cpNote)}</p>
        ) : null}
        <p
          className="plate-meta"
          aria-label={t('common.sources')}
        >
          {[
            ...sources.map((source) =>
              source.kind === 'core' ? t('common.core') : source.detachmentName
            ),
            ...stratagem.timings.map((timing) =>
              `${tx(PHASE_LABELS[timing.phase])} · ${tx(TURN_LABELS[timing.turn])}`
            ),
          ].join(' · ')}
        </p>
        <dl>
          <dt>{t('common.when')}</dt>
          <dd>{tx(stratagem.when)}</dd>
          <dt>{t('common.target')}</dt>
          <dd>{tx(stratagem.target)}</dd>
          <dt>{t('common.effect')}</dt>
          <dd className="plate-effect">{tx(stratagem.effect)}</dd>
          {stratagem.restrictions ? (
            <>
              <dt>{t('common.restrictions')}</dt>
              <dd>{tx(stratagem.restrictions)}</dd>
            </>
          ) : null}
        </dl>
        <VerifyNote note={stratagem.verify} />
        {showGroups ? (
          <div className="mt-2">
            <GroupTags groups={stratagem.groups} />
          </div>
        ) : null}
        {usage && (
          <label className="mt-3 flex items-center gap-2 text-sm font-semibold text-gold-300">
            <input
              type="checkbox"
              checked={usage.used}
              onChange={usage.onToggle}
              aria-label={`${t('battle.used')}: ${stratagem.name}`}
              className="h-5 w-5 shrink-0 accent-[var(--color-gold-500)]"
            />
            <span aria-hidden="true">{t('battle.used')}</span>
            {stratagem.oncePerBattle ? <span className="text-xs font-normal text-parchment/70">· {t('battle.oncePerBattle')}</span> : null}
          </label>
        )}
      </div>
    </article>
  );
}
