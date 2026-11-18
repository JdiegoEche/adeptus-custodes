// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { readStorage, writeStorage, readJson, writeJson } from './storage';

describe('storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('writeJson then readJson returns an equal object', () => {
    const key = 'testKey';
    const value = { test: 'data' };
    writeJson(key, value);
    expect(readJson(key)).toEqual(value);
  });

  it('readJson on a missing key returns null', () => {
    expect(readJson('missingKey')).toBeNull();
  });

  it('readJson on corrupted JSON returns null and does not throw', () => {
    window.localStorage.setItem('corruptedKey', '{not json');
    expect(readJson('corruptedKey')).toBeNull();
  });

  it('readStorage returns null when getItem throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(readStorage('testKey')).toBeNull();
  });

  it('writeStorage does not throw when setItem throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });
    expect(() => writeStorage('testKey', 'testValue')).not.toThrow();
  });
});
