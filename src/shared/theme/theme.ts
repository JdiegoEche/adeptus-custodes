export type Theme = 'dark' | 'light';

export const DEFAULT_THEME: Theme = 'dark';

/** Browser UI colour for each theme (mirrors the page background in index.css). */
export const THEME_COLORS: Record<Theme, string> = {
  dark: '#0d0c10',
  light: '#faf8f2',
};

/** Accepts only a known theme; anything else falls back to the default. */
export function parseTheme(value: unknown): Theme {
  return value === 'light' || value === 'dark' ? value : DEFAULT_THEME;
}

export function otherTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark';
}
