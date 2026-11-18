import { VerifyNote } from '../../shared/components/VerifyNote';
import { useLanguage } from '../../shared/i18n/LanguageContext';
import type { Detachment } from '../../shared/types';
import { getKatah } from '../data/katahs';

/** Rule, favoured ka'tah and enhancements of one selected detachment. */
export function SelectedDetachmentCard({ detachment }: { detachment: Detachment }) {
  const { t, tx } = useLanguage();
  const favoured = detachment.favouredKatah;

  return (
    <>
    <div className="plate">
      <div className="plate-inner">
        <div className="plate-medallion" role="img" aria-label={t('common.dp', { dp: detachment.dp })}>
          <span>{detachment.dp}<small>DP</small></span>
        </div>
        <h3 className="plate-title">{detachment.name}</h3>
        <p className="plate-meta">
          {[
            detachment.shieldHost ? t('army.shieldHost') : null,
            t('army.stratagemCount', { count: detachment.stratagems.length })
          ].filter(Boolean).join(' · ')}
        </p>
        <dl>
          <dt>{t('army.detachmentRule')}</dt>
          <dd className="plate-effect">
            <span className="font-semibold text-gold-300">{detachment.rule.name}: </span>
            {tx(detachment.rule.text)}
          </dd>
          {favoured ? (
            <>
              <dt>{t('army.favouredKatah')}</dt>
              <dd>
                <span className="font-semibold text-gold-300">{getKatah(favoured.katahId).name}: </span>
                {tx(favoured.extraEffect)}
              </dd>
            </>
          ) : null}
        </dl>
      </div>
    </div>

    <h4 className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold-600">{t('army.enhancements')}</h4>
    <ul className="mt-2 space-y-3">
      {detachment.enhancements.map((enhancement) => (
        <li key={enhancement.name}>
          <div className="plate plate--compact">
            <div className="plate-inner">
              <div className="plate-points">{t('common.points', { points: enhancement.points })}</div>
              <h5 className="plate-title">{enhancement.name}</h5>
              {enhancement.upgrade ? <p className="plate-meta">{t('army.upgrade')}</p> : null}
              <dl>
                <dt>{t('army.eligibility')}</dt>
                <dd>{tx(enhancement.eligibility)}</dd>
                <dt>{t('common.effect')}</dt>
                <dd className="plate-effect">{tx(enhancement.effect)}</dd>
                {enhancement.note ? (
                  <>
                    <dt>{t('common.note')}</dt>
                    <dd>{tx(enhancement.note)}</dd>
                  </>
                ) : null}
              </dl>
              <VerifyNote note={enhancement.verify} />
            </div>
          </div>
        </li>
      ))}
    </ul>
    </>
  );
}
