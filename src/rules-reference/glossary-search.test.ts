import { describe, expect, it } from 'vitest';
import { GLOSSARY } from '../core-rules/data/glossary';
import { filterGlossary, normalizeForSearch } from './glossary-search';

describe('glossary search', () => {
  it('returns every entry for an empty query', () => {
    expect(filterGlossary(GLOSSARY, '   ', 'es')).toHaveLength(GLOSSARY.length);
  });

  it('matches terms case-insensitively', () => {
    expect(filterGlossary(GLOSSARY, 'lethal', 'en').map((e) => e.term)).toEqual(['[LETHAL HITS]']);
  });

  it('matches the text in the current language, ignoring accents', () => {
    const spanish = filterGlossary(GLOSSARY, 'psiquicos', 'es').map((e) => e.term);
    expect(spanish).toContain('[PSYCHIC]');
    expect(filterGlossary(GLOSSARY, 'psiquicos', 'en')).toEqual([]);
  });

  it('normalizes accents and case', () => {
    expect(normalizeForSearch('Psíquico ÁÉ')).toBe('psiquico ae');
  });
});
