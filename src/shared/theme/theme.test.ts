import { describe, expect, it } from 'vitest';
import { DEFAULT_THEME, THEME_COLORS, otherTheme, parseTheme } from './theme';

describe('parseTheme', () => {
  it('keeps the two known themes', () => {
    expect(parseTheme('light')).toBe('light');
    expect(parseTheme('dark')).toBe('dark');
  });

  it('falls back to the default for anything else', () => {
    for (const value of [null, undefined, '', 'blue', 'LIGHT', 1, {}]) {
      expect(parseTheme(value)).toBe(DEFAULT_THEME);
    }
  });
});

describe('otherTheme', () => {
  it('switches between dark and light', () => {
    expect(otherTheme('dark')).toBe('light');
    expect(otherTheme('light')).toBe('dark');
  });
});

describe('THEME_COLORS', () => {
  it('has a browser colour for each theme', () => {
    expect(THEME_COLORS.dark).toMatch(/^#[0-9a-f]{6}$/);
    expect(THEME_COLORS.light).toMatch(/^#[0-9a-f]{6}$/);
  });
});
