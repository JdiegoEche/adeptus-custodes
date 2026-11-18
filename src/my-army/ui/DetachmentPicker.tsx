import { useState } from 'react';
import { Badge } from '../../shared/components/Badge';
import { useLanguage } from '../../shared/i18n/LanguageContext';
import type { Detachment } from '../../shared/types';
import { GroupTags } from './GroupTags';
import { DetachmentDetail } from './DetachmentDetail';

export function DetachmentPicker({ detachments, isSelected, onToggle }: {
  detachments: readonly Detachment[];
  isSelected: (id: string) => boolean;
  onToggle: (id: string) => void;
}) {
  const { t } = useLanguage();
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<string>>(new Set());

  const toggleExpansion = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <>
      <p className="mb-2 text-sm text-parchment/70">{t('army.detachmentsHint')}</p>
      <ul className="space-y-2">
        {detachments.map((detachment) => {
          const selected = isSelected(detachment.id);
          const expanded = expandedIds.has(detachment.id);
          const panelId = `detachment-detail-${detachment.id}`;
          return (
            <li key={detachment.id}>
              <div className="plate plate--compact" data-active={selected}>
                <div className="plate-inner flex items-start gap-3">
                  <input
                    type="checkbox"
                    aria-label={detachment.name}
                    checked={selected}
                    onChange={() => onToggle(detachment.id)}
                    className="h-5 w-5 shrink-0 accent-[var(--color-gold-500)] mt-0.5"
                  />
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => toggleExpansion(detachment.id)}
                    className="flex min-w-0 flex-1 items-start gap-2 text-left"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-display text-[0.9375rem] font-bold uppercase tracking-[0.06em] text-gold-300">{detachment.name}</span>
                        <Badge tone={selected ? 'gold' : 'muted'}>{t('common.dp', { dp: detachment.dp })}</Badge>
                        {detachment.shieldHost ? <Badge tone="core">{t('army.shieldHost')}</Badge> : null}
                      </span>
                      <span className="mt-1.5 block">
                        <GroupTags groups={detachment.styleTags} />
                      </span>
                    </span>
                    <span aria-hidden="true" className="shrink-0 text-gold-400">{expanded ? '▾' : '▸'}</span>
                  </button>
                </div>
              </div>
              {expanded && (
                <div id={panelId} className="mt-2">
                  <DetachmentDetail detachment={detachment} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
