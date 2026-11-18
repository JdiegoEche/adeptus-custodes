import type { GlossaryEntry, Language } from '../shared/types';

/** Lowercases and strips accents so "psiquico" finds "psíquico". */
export function normalizeForSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

/** Matches the term or the text in the current language. Empty query returns everything. */
export function filterGlossary(entries: readonly GlossaryEntry[], query: string, language: Language): GlossaryEntry[] {
  const needle = normalizeForSearch(query.trim());
  if (!needle) return [...entries];
  return entries.filter((entry) =>
    normalizeForSearch(`${entry.term} ${entry.text[language]}`).includes(needle),
  );
}
