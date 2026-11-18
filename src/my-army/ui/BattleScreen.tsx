import { useState } from 'react';
import { Card } from '../../shared/components/Section';
import { useLanguage } from '../../shared/i18n/LanguageContext';
import { useBattleState } from './BattleStateContext';
import { KatahChooserContainer } from './KatahChooserContainer';

export function BattleScreen() {
  const { t } = useLanguage();
  const { state, newTurn, reset } = useBattleState();
  const [confirmingReset, setConfirmingReset] = useState(false);
  return (
    <>
      <Card>
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-gold-300">
          {t('battle.turn', { turn: state.turn })}
        </h2>
        <p className="mt-1 text-sm text-parchment/70">{t('battle.hint')}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={newTurn}
            className="rounded-md bg-gold-500 px-4 py-2 text-sm font-bold text-ink-950"
          >
            {t('battle.newTurn')}
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirmingReset) {
                reset();
                setConfirmingReset(false);
              } else {
                setConfirmingReset(true);
              }
            }}
            onBlur={() => setConfirmingReset(false)}
            className="rounded-md border border-gold-600 px-4 py-2 text-sm font-semibold text-gold-300"
          >
            {confirmingReset ? t('battle.resetConfirm') : t('battle.reset')}
          </button>
        </div>
      </Card>
      <div className="mt-4">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold-600">
          {t('battle.katahsTitle')}
        </h2>
        <KatahChooserContainer />
      </div>
    </>
  );
}
