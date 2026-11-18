import type { ReactNode } from 'react';

type Tone = 'gold' | 'muted' | 'core' | 'warning' | 'outline';

const TONES: Record<Tone, string> = {
  gold: 'bg-gold-500 text-ink-950',
  muted: 'bg-ink-700 text-parchment',
  core: 'bg-ink-700 text-gold-300 ring-1 ring-gold-600',
  warning: 'bg-amber-900/70 text-amber-100 ring-1 ring-amber-500',
  outline: 'text-gold-300 ring-1 ring-gold-600/60',
};

export function Badge({ children, tone = 'muted' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-semibold leading-tight ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}
