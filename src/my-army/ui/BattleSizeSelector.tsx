import { useLanguage } from '../../shared/i18n/LanguageContext';
import type { BattleSize, BattleSizeId } from '../../shared/types';

export function BattleSizeSelector({ sizes, activeId, onSelect }: {
  sizes: readonly BattleSize[];
  activeId: BattleSizeId;
  onSelect: (id: BattleSizeId) => void;
}) {
  const { t } = useLanguage();
  return (
    <fieldset>
      <legend className="sr-only">{t('army.battleSize')}</legend>
      <div className="grid grid-cols-2 gap-2">
        {sizes.map((size) => {
          const active = size.id === activeId;
          return (
            <button
              key={size.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(size.id)}
              className={`rounded-lg border px-2 py-2 text-left transition-colors ${
                active ? 'border-gold-500 bg-gold-500 text-ink-950' : 'border-ink-700 bg-ink-900 text-parchment'
              }`}
            >
              <span className="block font-display font-bold">{size.name}</span>
              <span className="block text-xs">
                {t('common.points', { points: size.points })} · {t('common.dp', { dp: size.dp })}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
