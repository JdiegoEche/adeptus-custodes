import { describe, expect, it } from 'vitest';
import { BATTLE_SIZES, ROSTER_RULES } from '../../core-rules/data/battle-sizes';
import { CORE_STRATAGEMS } from '../../core-rules/data/core-stratagems';
import { GLOSSARY } from '../../core-rules/data/glossary';
import * as turnStructure from '../../core-rules/data/turn-structure';
import { GROUP_ORDER, PHASE_ORDER, TURN_ORDER } from '../../shared/game-constants';
import type { Stratagem } from '../../shared/types';
import { ARMY_RULES } from './army-rules';
import { DETACHMENTS } from './detachments';
import { KATAHS } from './katahs';

/** Expected counts from the approved plan's control table. */
const EXPECTED: Record<string, { dp: number; shieldHost: boolean; favoured?: string; stratagems: number; enhancements: number }> = {
  'Guardians of the Throne': { dp: 3, shieldHost: false, stratagems: 6, enhancements: 4 },
  'Aquilan Shield': { dp: 1, shieldHost: true, favoured: 'salvus', stratagems: 3, enhancements: 2 },
  'Dread Host': { dp: 1, shieldHost: true, favoured: 'dacatarai', stratagems: 3, enhancements: 2 },
  "Emperor's Chosen": { dp: 1, shieldHost: true, favoured: 'rendax', stratagems: 3, enhancements: 2 },
  'Emissaries Imperatus': { dp: 1, shieldHost: true, favoured: 'conservai', stratagems: 3, enhancements: 2 },
  Shadowkeepers: { dp: 1, shieldHost: true, favoured: 'kaptaris', stratagems: 3, enhancements: 2 },
  'Solar Watch': { dp: 1, shieldHost: true, favoured: 'calistus', stratagems: 3, enhancements: 2 },
  'Honoured Companions': { dp: 1, shieldHost: false, stratagems: 3, enhancements: 2 },
  'Auric Champions': { dp: 1, shieldHost: false, stratagems: 2, enhancements: 3 },
  'Lions of the Emperor': { dp: 1, shieldHost: false, stratagems: 3, enhancements: 2 },
  'Might of the Moritoi': { dp: 1, shieldHost: false, stratagems: 3, enhancements: 2 },
  'Grav-Assault Force': { dp: 1, shieldHost: false, stratagems: 3, enhancements: 2 },
  'Null Maiden Vigil': { dp: 1, shieldHost: false, stratagems: 3, enhancements: 2 },
};

const allDetachmentStratagems = DETACHMENTS.flatMap((detachment) => detachment.stratagems);
const allStratagems: Stratagem[] = [...CORE_STRATAGEMS, ...allDetachmentStratagems];

/** Walks any value and yields every object shaped like a LocalizedText. */
function collectLocalizedTexts(value: unknown, path: string, found: Array<{ path: string; es: unknown; en: unknown }>) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectLocalizedTexts(item, `${path}[${index}]`, found));
    return;
  }
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    if ('es' in record || 'en' in record) {
      found.push({ path, es: record.es, en: record.en });
      return;
    }
    for (const [key, child] of Object.entries(record)) collectLocalizedTexts(child, `${path}.${key}`, found);
  }
}

const ALL_DATA = {
  CORE_STRATAGEMS,
  DETACHMENTS,
  ARMY_RULES,
  KATAHS,
  GLOSSARY,
  BATTLE_SIZES,
  ROSTER_RULES,
  turnStructure,
};

describe('detachment catalogue', () => {
  it('has 13 detachments with unique ids and names', () => {
    expect(DETACHMENTS).toHaveLength(13);
    expect(new Set(DETACHMENTS.map((d) => d.id)).size).toBe(13);
    expect(new Set(DETACHMENTS.map((d) => d.name)).size).toBe(13);
  });

  it.each(Object.entries(EXPECTED))('%s matches the control table', (name, expected) => {
    const detachment = DETACHMENTS.find((d) => d.name === name);
    expect(detachment, name).toBeDefined();
    expect(detachment!.dp).toBe(expected.dp);
    expect(detachment!.shieldHost).toBe(expected.shieldHost);
    expect(detachment!.favouredKatah?.katahId).toBe(expected.favoured);
    expect(detachment!.stratagems).toHaveLength(expected.stratagems);
    expect(detachment!.enhancements).toHaveLength(expected.enhancements);
  });

  it('has 41 detachment stratagems with 38 distinct names', () => {
    expect(allDetachmentStratagems).toHaveLength(41);
    expect(new Set(allDetachmentStratagems.map((s) => s.name)).size).toBe(38);
  });

  it('has 29 enhancements', () => {
    expect(DETACHMENTS.flatMap((d) => d.enhancements)).toHaveLength(29);
  });

  it('has exactly 6 Shield Host detachments, each with a favoured ka\'tah, all different', () => {
    const shieldHosts = DETACHMENTS.filter((d) => d.shieldHost);
    expect(shieldHosts).toHaveLength(6);
    for (const detachment of shieldHosts) expect(detachment.favouredKatah, detachment.name).toBeDefined();
    expect(new Set(shieldHosts.map((d) => d.favouredKatah!.katahId)).size).toBe(6);
    for (const detachment of DETACHMENTS.filter((d) => !d.shieldHost)) {
      expect(detachment.favouredKatah, detachment.name).toBeUndefined();
    }
  });

  it('only duplicates Superhuman Focus, In Auramite Clad and Swift as the Eagle, with identical content', () => {
    const byName = new Map<string, Stratagem[]>();
    for (const stratagem of allDetachmentStratagems) {
      byName.set(stratagem.name, [...(byName.get(stratagem.name) ?? []), stratagem]);
    }
    const duplicated = [...byName.entries()].filter(([, list]) => list.length > 1);
    expect(duplicated.map(([name]) => name).sort()).toEqual(
      ['In Auramite Clad', 'Superhuman Focus', 'Swift as the Eagle'].sort(),
    );
    for (const [, list] of duplicated) {
      for (const copy of list) expect(copy).toEqual(list[0]);
    }
  });

  it('has non-empty enhancement data', () => {
    for (const enhancement of DETACHMENTS.flatMap((d) => d.enhancements)) {
      expect(enhancement.name.trim(), enhancement.name).not.toBe('');
      expect(enhancement.points).toBeGreaterThan(0);
    }
  });
});

describe('core rules data', () => {
  it('has 10 core stratagems with unique names', () => {
    expect(CORE_STRATAGEMS).toHaveLength(10);
    expect(new Set(CORE_STRATAGEMS.map((s) => s.name)).size).toBe(10);
  });

  it('does not treat Snap Shooting, Grenades, Tank Shock or Gone to Ground as stratagems', () => {
    const names = allStratagems.map((s) => s.name);
    for (const excluded of ['Snap Shooting', 'Grenades', 'Tank Shock', 'Gone to Ground']) {
      expect(names).not.toContain(excluded);
    }
    expect(GLOSSARY.map((g) => g.term)).toContain('Gone to Ground');
  });

  it('core stratagem names never collide with detachment stratagem names', () => {
    const coreNames = new Set(CORE_STRATAGEMS.map((s) => s.name));
    for (const stratagem of allDetachmentStratagems) expect(coreNames.has(stratagem.name)).toBe(false);
  });

  it('has battle sizes Incursion (2DP) and Strike Force (3DP)', () => {
    expect(BATTLE_SIZES.map((b) => [b.id, b.dp])).toEqual([
      ['incursion', 2],
      ['strike-force', 3],
    ]);
  });
});

describe('army rules and ka\'tahs', () => {
  it('has the 6 army rules', () => {
    expect(ARMY_RULES.map((r) => r.name)).toEqual([
      "Martial Ka'tah",
      'Aegis of the Emperor',
      'Aquila Commander',
      'Daughters of the Abyss',
      'Anathema Psykana',
      'Shock Disembark',
    ]);
  });

  it('has the 6 ka\'tahs, each with a group and a valid phase', () => {
    expect(KATAHS.map((k) => k.id).sort()).toEqual(
      ['calistus', 'conservai', 'dacatarai', 'kaptaris', 'rendax', 'salvus'].sort(),
    );
    for (const katah of KATAHS) {
      expect(katah.groups.length).toBeGreaterThan(0);
      expect(PHASE_ORDER).toContain(katah.timing.phase);
    }
  });
});

describe('every stratagem', () => {
  it.each(allStratagems.map((s) => [s.name, s] as const))('%s is complete and classified', (_name, stratagem) => {
    expect(stratagem.id).toMatch(/^[a-z0-9-]+$/);
    expect(stratagem.name.trim()).not.toBe('');
    expect(stratagem.cp).toBeGreaterThanOrEqual(0);
    expect(stratagem.groups.length).toBeGreaterThan(0);
    for (const group of stratagem.groups) expect(GROUP_ORDER).toContain(group);
    expect(new Set(stratagem.groups).size).toBe(stratagem.groups.length);
    expect(stratagem.timings.length).toBeGreaterThan(0);
    for (const timing of stratagem.timings) {
      expect(PHASE_ORDER).toContain(timing.phase);
      expect(TURN_ORDER).toContain(timing.turn);
      if (timing.phase === 'any') expect(timing.turn).toBe('both');
    }
    // One timing per phase, so a stratagem appears exactly once per phase bucket.
    expect(new Set(stratagem.timings.map((t) => t.phase)).size).toBe(stratagem.timings.length);
  });
});

describe('localized texts', () => {
  it('every LocalizedText has non-empty es and en', () => {
    const found: Array<{ path: string; es: unknown; en: unknown }> = [];
    collectLocalizedTexts(ALL_DATA, 'data', found);
    expect(found.length).toBeGreaterThan(300);
    const broken = found.filter(
      (text) => typeof text.es !== 'string' || typeof text.en !== 'string' || !text.es.trim() || !text.en.trim(),
    );
    expect(broken).toEqual([]);
  });

  it('marks the two [VERIFY] enhancements with a verify note', () => {
    const verified = DETACHMENTS.flatMap((d) => d.enhancements)
      .filter((e) => e.verify)
      .map((e) => e.name)
      .sort();
    expect(verified).toEqual(['Celeritous Sentries', 'Leonine Ferocity']);
  });

  it('contains no links to external sites', () => {
    expect(JSON.stringify(ALL_DATA).toLowerCase()).not.toMatch(/wahapedia|https?:\/\//);
  });
});
