import type { BattleSize, BattleSizeId, LocalizedText } from '../../shared/types';

/** Core rules 25.03. */
export const BATTLE_SIZES: BattleSize[] = [
  {
    id: 'incursion',
    name: 'Incursion',
    points: 1000,
    dp: 2,
    maxEnhancements: 2,
    copiesPerDatasheet: 2,
    allowsSingleThreeDpDetachment: true,
  },
  {
    id: 'strike-force',
    name: 'Strike Force',
    points: 2000,
    dp: 3,
    maxEnhancements: 4,
    copiesPerDatasheet: 3,
    allowsSingleThreeDpDetachment: false,
  },
];

export const DEFAULT_BATTLE_SIZE_ID: BattleSizeId = 'strike-force';

export function getBattleSize(id: BattleSizeId): BattleSize {
  const size = BATTLE_SIZES.find((candidate) => candidate.id === id);
  if (!size) throw new Error(`Unknown battle size: ${id}`);
  return size;
}

export const ROSTER_RULES: LocalizedText[] = [
  {
    en: 'BATTLELINE and DEDICATED TRANSPORT: double the copy limit. EPIC HERO: limit 1.',
    es: 'BATTLELINE y DEDICATED TRANSPORT: el doble del límite de copias. EPIC HERO: límite 1.',
  },
  {
    en: 'Incursion exception: a 3DP detachment may be taken if it is the only detachment.',
    es: 'Excepción de Incursion: se puede llevar un detachment de 3DP si es el único detachment.',
  },
  {
    en: 'The same detachment cannot be selected twice.',
    es: 'No se puede elegir el mismo detachment dos veces.',
  },
  {
    en: 'Only one detachment tagged "Unique: Shield Host".',
    es: 'Solo un detachment con la etiqueta "Unique: Shield Host".',
  },
  {
    en: 'Enhancements: CHARACTER units only (one CHARACTER model carries it), not EPIC HEROES, no duplicates.',
    es: 'Enhancements: solo unidades CHARACTER (las lleva un modelo CHARACTER), no EPIC HEROES, sin duplicados.',
  },
  {
    en: '"Upgrade" enhancements can go on non-CHARACTER units, up to 3 copies; the 2nd and 3rd copies do not count toward the enhancement limit but cost full points.',
    es: 'Los enhancements "Upgrade" pueden ir en unidades que no sean CHARACTER, hasta 3 copias; la 2.ª y la 3.ª copia no cuentan para el límite de enhancements, pero pagan los puntos completos.',
  },
];
