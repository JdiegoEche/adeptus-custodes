import { Card } from '../../shared/components/Section';
import { useLanguage } from '../../shared/i18n/LanguageContext';
import type { ArmyRule } from '../../shared/types';

export function ArmyRulesList({ rules, martialKatahRuleId, superhumanFocus }: {
  rules: readonly ArmyRule[];
  martialKatahRuleId: string;
  /** Present only when Superhuman Focus is available in the selected detachments. */
  superhumanFocus?: { onGo: () => void };
}) {
  const { t, tx } = useLanguage();

  return (
    <ul className="space-y-2">
      {rules.map((rule) => (
        <li key={rule.id}>
          <Card>
            <h3 className="font-display font-bold text-gold-300">{rule.name}</h3>
            <p className="mt-1 text-sm leading-snug">{tx(rule.text)}</p>
            {rule.id === martialKatahRuleId && superhumanFocus ? (
              <div className="mt-2 rounded border border-gold-600/60 bg-ink-800 p-2 text-sm">
                <p>{t('army.superhumanFocusHint')}</p>
                <button
                  type="button"
                  onClick={superhumanFocus.onGo}
                  className="mt-1 font-semibold text-gold-400 underline underline-offset-2"
                >
                  {t('army.superhumanFocusLink')} →
                </button>
              </div>
            ) : null}
          </Card>
        </li>
      ))}
    </ul>
  );
}
