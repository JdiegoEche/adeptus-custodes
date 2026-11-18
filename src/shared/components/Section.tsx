import type { ReactNode } from 'react';

export function Section({
  title,
  id,
  children,
  aside,
}: {
  title: string;
  id?: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section id={id} aria-label={title} className="mt-6 first:mt-0">
      <div className="mb-3 flex items-center justify-between gap-2 border-b border-gold-600/40 pb-1">
        <h2 className="font-display text-lg font-bold tracking-wide text-gold-400">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function Card({ children, highlighted = false }: { children: ReactNode; highlighted?: boolean }) {
  return (
    <div className="plate plate--compact" data-active={highlighted}>
      <div className="plate-inner">{children}</div>
    </div>
  );
}

/** Label + text pair used for "When / Target / Effect" style fields. */
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-1.5">
      <dt className="text-xs font-semibold uppercase tracking-wider text-gold-600">{label}</dt>
      <dd className="text-sm leading-snug text-parchment">{children}</dd>
    </div>
  );
}
