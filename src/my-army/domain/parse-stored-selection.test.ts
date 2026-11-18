import { describe, it, expect } from 'vitest';
import { parseStoredSelection } from './selection';

describe('parseStoredSelection', () => {
  it('returns default selection for null, undefined, string, number', () => {
    expect(parseStoredSelection(null)).toEqual({ battleSizeId: 'strike-force', detachmentIds: [] });
    expect(parseStoredSelection(undefined)).toEqual({ battleSizeId: 'strike-force', detachmentIds: [] });
    expect(parseStoredSelection('')).toEqual({ battleSizeId: 'strike-force', detachmentIds: [] });
    expect(parseStoredSelection(123)).toEqual({ battleSizeId: 'strike-force', detachmentIds: [] });
  });

  it('keeps a valid object as is', () => {
    expect(parseStoredSelection({ battleSizeId: 'incursion', detachmentIds: ['dread-host'] })).toEqual({
      battleSizeId: 'incursion',
      detachmentIds: ['dread-host'],
    });
  });

  it('falls back to default battleSizeId for unknown or missing battleSizeId', () => {
    expect(parseStoredSelection({ battleSizeId: 'apocalypse', detachmentIds: ['dread-host'] })).toEqual({
      battleSizeId: 'strike-force',
      detachmentIds: ['dread-host'],
    });
    expect(parseStoredSelection({ detachmentIds: ['dread-host'] })).toEqual({
      battleSizeId: 'strike-force',
      detachmentIds: ['dread-host'],
    });
  });

  it('returns empty detachmentIds for non-array detachmentIds', () => {
    expect(parseStoredSelection({ battleSizeId: 'incursion', detachmentIds: 'not an array' })).toEqual({
      battleSizeId: 'incursion',
      detachmentIds: [],
    });
    expect(parseStoredSelection({ battleSizeId: 'incursion', detachmentIds: {} })).toEqual({
      battleSizeId: 'incursion',
      detachmentIds: [],
    });
  });

  it('drops unknown ids and non-string entries, keeps known ids in original order', () => {
    expect(parseStoredSelection({ battleSizeId: 'incursion', detachmentIds: [42, 'dread-host', null, {}, 'aquilan-shield'] })).toEqual({
      battleSizeId: 'incursion',
      detachmentIds: ['dread-host', 'aquilan-shield'],
    });
  });

  it('removes duplicate ids', () => {
    expect(parseStoredSelection({ battleSizeId: 'incursion', detachmentIds: ['dread-host', 'aquilan-shield', 'dread-host'] })).toEqual({
      battleSizeId: 'incursion',
      detachmentIds: ['dread-host', 'aquilan-shield'],
    });
  });

  it('returns default selection for array input', () => {
    expect(parseStoredSelection(['dread-host'])).toEqual({ battleSizeId: 'strike-force', detachmentIds: [] });
  });
});
