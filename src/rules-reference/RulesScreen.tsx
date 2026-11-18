import { useId, useState } from 'react';
import { BATTLE_SIZES, ROSTER_RULES } from '../core-rules/data/battle-sizes';
import { GLOSSARY } from '../core-rules/data/glossary';
import {
  BATTLE_STRUCTURE,
  COMMAND_PHASE_STEPS,
  KEY_RULES,
  PHASE_NOTES,
  STRATAGEM_USAGE_RULES,
  TURN_SEQUENCE,
  type TitledText,
} from '../core-rules/data/turn-structure';
import { Card, Section } from '../shared/components/Section';
import { VerifyNote } from '../shared/components/VerifyNote';
import { useLanguage } from '../shared/i18n/LanguageContext';
import { filterGlossary } from './glossary-search';

function TitledList({ items }: { items: TitledText[] }) {
  const { tx } = useLanguage();
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.title.en}>
          <Card>
            <h3 className="font-display font-bold text-gold-300">{tx(item.title)}</h3>
            {item.text ? <p className="mt-1 text-sm leading-snug">{tx(item.text)}</p> : null}
          </Card>
        </li>
      ))}
    </ul>
  );
}

function BulletList({ items }: { items: { en: string; es: string }[] }) {
  const { tx } = useLanguage();
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm leading-snug marker:text-gold-500">
      {items.map((item) => (
        <li key={item.en}>{tx(item)}</li>
      ))}
    </ul>
  );
}

function Glossary() {
  const { t, tx, language } = useLanguage();
  const [query, setQuery] = useState('');
  const inputId = useId();
  const results = filterGlossary(GLOSSARY, query, language);

  return (
    <>
      <label htmlFor={inputId} className="mb-1 block text-sm text-parchment/80">
        {t('rules.search')}
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('rules.searchPlaceholder')}
        className="mb-3 w-full rounded-lg border border-gold-600/60 bg-ink-900 px-3 py-2 text-base text-parchment placeholder:text-parchment/40 focus:border-gold-400 focus:outline-none"
      />
      {results.length === 0 ? (
        <p className="text-sm text-parchment/70">{t('rules.noResults')}</p>
      ) : (
        <dl className="space-y-2">
          {results.map((entry) => (
            <div key={entry.term} className="rounded-lg border border-ink-700 bg-ink-900 p-3">
              <dt className="font-semibold text-gold-300">{entry.term}</dt>
              <dd className="mt-0.5 text-sm leading-snug">{tx(entry.text)}</dd>
              <VerifyNote note={entry.verify} />
            </div>
          ))}
        </dl>
      )}
    </>
  );
}

export function RulesScreen() {
  const { t, tx } = useLanguage();

  return (
    <>
      <Section title={t('rules.turnStructure')}>
        <BulletList items={BATTLE_STRUCTURE} />
        <h3 className="mb-1 mt-3 text-sm font-semibold uppercase tracking-wider text-gold-600">
          {t('rules.turnSequence')}
        </h3>
        <ol className="flex flex-wrap gap-1.5 text-sm">
          {TURN_SEQUENCE.map((step, index) => (
            <li key={step.en} className="rounded bg-ink-800 px-2 py-1">
              <span className="mr-1 text-gold-500">{index + 1}.</span>
              {tx(step)}
            </li>
          ))}
        </ol>
      </Section>

      <Section title={t('rules.commandPhase')}>
        <ol className="space-y-2">
          {COMMAND_PHASE_STEPS.map((step, index) => (
            <li key={step.title.en}>
              <Card>
                <h3 className="font-display font-bold text-gold-300">
                  <span className="mr-1 text-gold-500">{index + 1}.</span>
                  {tx(step.title)}
                </h3>
                {step.text ? <p className="mt-1 text-sm leading-snug">{tx(step.text)}</p> : null}
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={t('rules.stratagemUsage')}>
        <BulletList items={STRATAGEM_USAGE_RULES} />
      </Section>

      <Section title={t('rules.phases')}>
        <TitledList items={PHASE_NOTES} />
      </Section>

      <Section title={t('rules.keyRules')}>
        <TitledList items={KEY_RULES} />
      </Section>

      <Section title={t('rules.battleSizes')}>
        <table className="w-full table-fixed border-collapse text-sm">
          <caption className="caption-bottom pt-1 text-left text-xs text-parchment/60">
            {t('rules.table.caption')}
          </caption>
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-gold-600">
              <th className="w-[34%] py-1 pr-1">{t('rules.table.size')}</th>
              <th className="py-1 pr-1">{t('rules.table.points')}</th>
              <th className="py-1 pr-1">{t('rules.table.dp')}</th>
              <th className="py-1 pr-1">{t('rules.table.enhancements')}</th>
              <th className="py-1">{t('rules.table.copies')}</th>
            </tr>
          </thead>
          <tbody>
            {BATTLE_SIZES.map((size) => (
              <tr key={size.id} className="border-t border-ink-700">
                <td className="py-1.5 pr-1 font-semibold text-gold-300">{size.name}</td>
                <td className="py-1.5 pr-1">{size.points}</td>
                <td className="py-1.5 pr-1">{size.dp}</td>
                <td className="py-1.5 pr-1">{size.maxEnhancements}</td>
                <td className="py-1.5">{size.copiesPerDatasheet}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3">
          <BulletList items={ROSTER_RULES} />
        </div>
      </Section>

      <Section title={t('rules.glossary')}>
        <Glossary />
      </Section>

      <p className="mt-8 text-center text-xs text-parchment/50">{t('rules.disclaimer')}</p>
    </>
  );
}
