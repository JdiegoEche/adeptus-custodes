import { useId, type ReactNode } from 'react';

export function CollapsibleSection({
  title, count, open, onToggle, children,
}: { title: string; count: number; open: boolean; onToggle: () => void; children: ReactNode }) {
  const contentId = useId();

  return (
    <section aria-label={title} className="mt-3 first:mt-0">
      <div className="plate plate--compact" data-active={open}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={contentId}
          onClick={onToggle}
          className="plate-inner flex w-full items-center justify-between gap-2 text-left"
        >
          <span className="plate-title !mr-0">{title}</span>
          <span className="flex shrink-0 items-center gap-2">
            <span className="rounded-full bg-ink-800 px-2 py-0.5 text-xs font-semibold text-parchment ring-1 ring-gold-600/60">{count}</span>
            <span aria-hidden="true" className="text-gold-400">{open ? '▾' : '▸'}</span>
          </span>
        </button>
      </div>
      {open && <div id={contentId} className="mt-2">{children}</div>}
    </section>
  );
}
