import type { UiKey } from '../i18n/dictionary';
import { useLanguage } from '../i18n/LanguageContext';
import { TAB_IDS, useNavigation, type TabId } from '../navigation';

const TAB_LABELS: Record<TabId, UiKey> = {
  army: 'nav.army',
  battle: 'nav.battle',
  stratagems: 'nav.stratagems',
  rules: 'nav.rules',
};

/** Simple inline icons (no external artwork). */
function TabIcon({ tab }: { tab: TabId }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  if (tab === 'army') {
    return (
      <svg {...common}>
        <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" />
      </svg>
    );
  }
  if (tab === 'battle') {
    return (
      <svg {...common}>
        <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
        <line x1="13" x2="19" y1="19" y2="13" />
        <line x1="16" x2="20" y1="16" y2="20" />
        <line x1="19" x2="21" y1="21" y2="19" />
        <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
        <line x1="5" x2="9" y1="14" y2="18" />
        <line x1="7" x2="4" y1="17" y2="20" />
        <line x1="3" x2="5" y1="19" y2="21" />
      </svg>
    );
  }
  if (tab === 'stratagems') {
    return (
      <svg {...common}>
        <rect x="4" y="3" width="12" height="16" rx="2" />
        <path d="M8 21h10a2 2 0 0 0 2-2V7" />
        <path d="M8 8h4M8 12h4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" />
      <path d="M4 19a2 2 0 0 1 2-2h13" />
    </svg>
  );
}

export function TabBar() {
  const { t } = useLanguage();
  const { tab: activeTab, goTo } = useNavigation();
  return (
    <nav
      aria-label={t('nav.label')}
      className="fixed inset-x-0 bottom-0 z-20 border-t border-gold-600/50 bg-ink-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <ul className="mx-auto grid max-w-2xl grid-cols-4">
        {TAB_IDS.map((tab) => {
          const active = tab === activeTab;
          return (
            <li key={tab}>
              <button
                type="button"
                aria-current={active ? 'page' : undefined}
                onClick={() => goTo(tab)}
                className={`flex w-full flex-col items-center gap-0.5 py-2 text-xs font-semibold transition-colors ${
                  active ? 'text-gold-400' : 'text-parchment/60'
                }`}
              >
                <TabIcon tab={tab} />
                {t(TAB_LABELS[tab])}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
