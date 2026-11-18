import { describe, expect, it } from 'vitest';
import { getBattleSize } from '../../core-rules/data/battle-sizes';
import { DETACHMENTS } from '../data/detachments';
import {
  isWithinDpLimit,
  resolveDetachments,
  selectedShieldHosts,
  toggleDetachmentId,
  totalDp,
  validateSelection,
} from './selection';

const pick = (...ids: string[]) => resolveDetachments(ids, DETACHMENTS);
const strikeForce = getBattleSize('strike-force');
const incursion = getBattleSize('incursion');

describe('resolveDetachments', () => {
  it('returns detachments in catalogue order, ignoring unknown and repeated ids', () => {
    const result = pick('solar-watch', 'unknown', 'guardians-of-the-throne', 'solar-watch');
    expect(result.map((d) => d.id)).toEqual(['guardians-of-the-throne', 'solar-watch']);
  });
});

describe('toggleDetachmentId', () => {
  it('adds a missing id and removes a present one, never duplicating', () => {
    expect(toggleDetachmentId([], 'dread-host')).toEqual(['dread-host']);
    expect(toggleDetachmentId(['dread-host', 'solar-watch'], 'dread-host')).toEqual(['solar-watch']);
    expect(toggleDetachmentId(toggleDetachmentId(['a'], 'b'), 'b')).toEqual(['a']);
  });
});

describe('DP total and limit', () => {
  it('sums DP of the selected detachments', () => {
    expect(totalDp([])).toBe(0);
    expect(totalDp(pick('guardians-of-the-throne'))).toBe(3);
    expect(totalDp(pick('guardians-of-the-throne', 'emperors-chosen'))).toBe(4);
    expect(totalDp(pick('aquilan-shield', 'honoured-companions', 'auric-champions'))).toBe(3);
  });

  it('Strike Force allows up to 3DP', () => {
    expect(isWithinDpLimit(pick('guardians-of-the-throne'), strikeForce)).toBe(true);
    expect(isWithinDpLimit(pick('aquilan-shield', 'honoured-companions', 'auric-champions'), strikeForce)).toBe(true);
    expect(isWithinDpLimit(pick('guardians-of-the-throne', 'emperors-chosen'), strikeForce)).toBe(false);
    expect(
      isWithinDpLimit(pick('aquilan-shield', 'honoured-companions', 'auric-champions', 'null-maiden-vigil'), strikeForce),
    ).toBe(false);
  });

  it('Incursion allows up to 2DP', () => {
    expect(isWithinDpLimit(pick('aquilan-shield', 'honoured-companions'), incursion)).toBe(true);
    expect(isWithinDpLimit(pick('aquilan-shield', 'honoured-companions', 'auric-champions'), incursion)).toBe(false);
  });

  it('Incursion allows a single 3DP detachment only when it is the only one', () => {
    expect(isWithinDpLimit(pick('guardians-of-the-throne'), incursion)).toBe(true);
    expect(isWithinDpLimit(pick('guardians-of-the-throne', 'honoured-companions'), incursion)).toBe(false);
  });
});

describe('Shield Host uniqueness', () => {
  it('lists the selected Shield Host detachments', () => {
    expect(selectedShieldHosts(pick('guardians-of-the-throne', 'solar-watch')).map((d) => d.id)).toEqual(['solar-watch']);
  });
});

describe('validateSelection', () => {
  it('returns no warnings for a legal selection', () => {
    expect(validateSelection([], strikeForce)).toEqual([]);
    expect(validateSelection(pick('guardians-of-the-throne'), incursion)).toEqual([]);
    expect(validateSelection(pick('aquilan-shield', 'honoured-companions'), strikeForce)).toEqual([]);
  });

  it('warns when the DP limit is exceeded', () => {
    expect(validateSelection(pick('guardians-of-the-throne', 'emperors-chosen'), strikeForce)).toEqual([
      { kind: 'dp-over-limit', total: 4, limit: 3 },
    ]);
  });

  it('warns when more than one Shield Host is selected', () => {
    expect(validateSelection(pick('aquilan-shield', 'dread-host'), strikeForce)).toEqual([
      { kind: 'multiple-shield-hosts', detachmentNames: ['Aquilan Shield', 'Dread Host'] },
    ]);
  });

  it('can report both warnings at once', () => {
    const warnings = validateSelection(pick('aquilan-shield', 'dread-host', 'solar-watch'), incursion);
    expect(warnings.map((w) => w.kind)).toEqual(['dp-over-limit', 'multiple-shield-hosts']);
  });
});
