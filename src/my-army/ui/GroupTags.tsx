import { Badge } from '../../shared/components/Badge';
import { GROUP_LABELS } from '../../shared/i18n/dictionary';
import { useLanguage } from '../../shared/i18n/LanguageContext';
import type { GroupId } from '../../shared/types';

export function GroupTags({ groups }: { groups: GroupId[] }) {
  const { tx } = useLanguage();
  return (
    <span className="flex flex-wrap gap-1">
      {groups.map((group) => (
        <Badge key={group} tone="outline">
          {tx(GROUP_LABELS[group])}
        </Badge>
      ))}
    </span>
  );
}
