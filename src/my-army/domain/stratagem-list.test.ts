import { describe, expect, it } from 'vitest';
import { CORE_STRATAGEMS } from '../../core-rules/data/core-stratagems';
import { GROUP_ORDER, PHASE_ORDER } from '../../shared/game-constants';
import { DETACHMENTS } from '../data/detachments';
import { resolveDetachments } from './selection';
import { groupByGroup, groupByPhase, mergeStratagems, type StratagemEntry } from './stratagem-list';

const pick = (...ids: string[]) => resolveDetachments(ids, DETACHMENTS);
const names = (entries: StratagemEntry[]) => entries.map((entry) => entry.stratagem.name);

describe('mergeStratagems', () => {
  it('without detachments returns only the 10 core stratagems, tagged as core', () => {
    const merged = mergeStratagems(CORE_STRATAGEMS, []);
    expect(merged).toHaveLength(10);
    for (const entry of merged) expect(entry.sources).toEqual([{ kind: 'core' }]);
  });

  it('adds the stratagems of a selected detachment', () => {
    const merged = mergeStratagems(CORE_STRATAGEMS, pick('guardians-of-the-throne'));
    expect(merged).toHaveLength(16);
    const fromGuardians = merged.filter((entry) =>
      entry.sources.some((source) => source.kind === 'detachment' && source.detachmentId === 'guardians-of-the-throne'),
    );
    expect(fromGuardians).toHaveLength(6);
  });

  it('removes stratagems of a detachment that is no longer selected', () => {
    const merged = mergeStratagems(CORE_STRATAGEMS, pick('solar-watch'));
    expect(names(merged)).toContain('Inexorable');
    expect(names(mergeStratagems(CORE_STRATAGEMS, []))).not.toContain('Inexorable');
  });

  it('dedupes stratagems shared by two detachments and keeps both sources', () => {
    const merged = mergeStratagems(CORE_STRATAGEMS, pick('guardians-of-the-throne', 'emperors-chosen'));
    expect(merged).toHaveLength(10 + 6 + 1);
    for (const name of ['Superhuman Focus', 'In Auramite Clad']) {
      const matches = merged.filter((entry) => entry.stratagem.name === name);
      expect(matches, name).toHaveLength(1);
      expect(matches[0]!.sources).toEqual([
        { kind: 'detachment', detachmentId: 'guardians-of-the-throne', detachmentName: 'Guardians of the Throne' },
        { kind: 'detachment', detachmentId: 'emperors-chosen', detachmentName: "Emperor's Chosen" },
      ]);
    }
  });

  it('dedupes Swift as the Eagle between Guardians of the Throne and Honoured Companions', () => {
    const merged = mergeStratagems(CORE_STRATAGEMS, pick('guardians-of-the-throne', 'honoured-companions'));
    const swift = merged.filter((entry) => entry.stratagem.name === 'Swift as the Eagle');
    expect(swift).toHaveLength(1);
    expect(swift[0]!.sources.map((s) => (s.kind === 'detachment' ? s.detachmentId : s.kind))).toEqual([
      'guardians-of-the-throne',
      'honoured-companions',
    ]);
  });

  it('with all 13 detachments yields 10 core + 38 distinct stratagems', () => {
    expect(mergeStratagems(CORE_STRATAGEMS, DETACHMENTS)).toHaveLength(48);
  });
});

describe('groupByGroup', () => {
  const all = mergeStratagems(CORE_STRATAGEMS, DETACHMENTS);

  it('returns groups in the fixed order, skipping empty ones', () => {
    const grouped = groupByGroup(all);
    expect(grouped.map((g) => g.group)).toEqual(GROUP_ORDER);
    const coreOnly = groupByGroup(mergeStratagems(CORE_STRATAGEMS, []));
    for (const group of coreOnly) expect(group.entries.length).toBeGreaterThan(0);
  });

  it('places every stratagem in each of its groups, and in at least one group', () => {
    const grouped = groupByGroup(all);
    for (const entry of all) {
      const containing = grouped.filter((g) => g.entries.includes(entry)).map((g) => g.group);
      expect(containing, entry.stratagem.name).toEqual(GROUP_ORDER.filter((g) => entry.stratagem.groups.includes(g)));
      expect(containing.length).toBeGreaterThan(0);
    }
  });

  it('matches the plan for a multi-group stratagem', () => {
    const grouped = groupByGroup(all);
    const inGroup = (group: string) => names(grouped.find((g) => g.group === group)?.entries ?? []);
    expect(inGroup('melee-defence')).toContain('Counteroffensive');
    expect(inGroup('opponent-turn-reaction')).toContain('Counteroffensive');
    expect(inGroup('melee-attack')).toContain('Crushing Impact');
    expect(inGroup('movement-charge')).toContain('Crushing Impact');
  });
});

describe('groupByPhase', () => {
  const all = mergeStratagems(CORE_STRATAGEMS, DETACHMENTS);

  it('returns phases in turn order, with turn sub-buckets', () => {
    const phases = groupByPhase(all);
    expect(phases.map((p) => p.phase)).toEqual(PHASE_ORDER);
    for (const phase of phases) {
      for (const bucket of phase.turns) expect(bucket.entries.length).toBeGreaterThan(0);
    }
  });

  it('places each stratagem exactly once in every phase it belongs to', () => {
    const phases = groupByPhase(all);
    for (const entry of all) {
      const expectedPhases = entry.stratagem.timings.map((t) => t.phase);
      for (const phase of phases) {
        const occurrences = phase.turns.flatMap((t) => t.entries).filter((e) => e === entry).length;
        expect(occurrences, `${entry.stratagem.name} in ${phase.phase}`).toBe(expectedPhases.includes(phase.phase) ? 1 : 0);
      }
    }
  });

  it("splits my turn and the opponent's turn", () => {
    const phases = groupByPhase(mergeStratagems(CORE_STRATAGEMS, []));
    const movement = phases.find((p) => p.phase === 'movement')!;
    expect(movement.turns.map((t) => t.turn)).toEqual(['opponent']);
    expect(names(movement.turns[0]!.entries)).toEqual(['Rapid Ingress', 'Fire Overwatch']);
    const fight = phases.find((p) => p.phase === 'fight')!;
    expect(fight.turns.map((t) => [t.turn, names(t.entries)])).toEqual([
      ['opponent', ['Counteroffensive']],
      ['both', ['Epic Challenge']],
    ]);
  });

  it('lists In Auramite Clad in both the Shooting and Fight phases of the opponent', () => {
    const phases = groupByPhase(mergeStratagems(CORE_STRATAGEMS, pick('guardians-of-the-throne')));
    for (const phaseId of ['shooting', 'fight'] as const) {
      const phase = phases.find((p) => p.phase === phaseId)!;
      const opponent = phase.turns.find((t) => t.turn === 'opponent')!;
      expect(names(opponent.entries)).toContain('In Auramite Clad');
    }
  });
});
