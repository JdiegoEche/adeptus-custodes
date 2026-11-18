import type { LocalizedText, Stratagem } from './types';

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Builds a stratagem whose id is derived from its name, so equal names dedupe. */
export function defineStratagem(data: Omit<Stratagem, 'id'>): Stratagem {
  return { id: slugify(data.name), ...data };
}

export const THAT_UNIT: LocalizedText = { en: 'That unit.', es: 'Esa unidad.' };
