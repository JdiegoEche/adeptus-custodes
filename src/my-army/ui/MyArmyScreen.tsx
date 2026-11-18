import { Section } from '../../shared/components/Section';
import { useLanguage } from '../../shared/i18n/LanguageContext';
import { useArmySelection } from './ArmySelectionContext';
import { ArmyRulesListContainer } from './ArmyRulesListContainer';
import { BattleSizeSelectorContainer } from './BattleSizeSelectorContainer';
import { DetachmentPickerContainer } from './DetachmentPickerContainer';
import { DpSummaryContainer } from './DpSummaryContainer';
import { KatahListContainer } from './KatahListContainer';
import { SelectedDetachmentCard } from './SelectedDetachmentCard';

export function MyArmyScreen() {
  const { t } = useLanguage();
  const { detachments } = useArmySelection();

  return (
    <>
      <Section title={t('army.battleSize')}>
        <BattleSizeSelectorContainer />
        <DpSummaryContainer />
      </Section>

      <Section title={t('army.detachments')}>
        <DetachmentPickerContainer />
      </Section>

      {detachments.length > 0 ? (
        <Section title={t('army.selected')}>
          <ul className="space-y-3">
            {detachments.map((detachment) => (
              <li key={detachment.id}>
                <SelectedDetachmentCard detachment={detachment} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section title={t('army.armyRules')}>
        <ArmyRulesListContainer />
      </Section>

      <Section title={t('army.katahs')}>
        <KatahListContainer />
      </Section>
    </>
  );
}
