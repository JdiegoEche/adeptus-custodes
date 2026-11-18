/**
 * Safe localStorage access: every read/write is wrapped so the app keeps working
 * in private mode, with blocked storage, or outside the browser.
 */
export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage unavailable: the choice simply is not remembered.
  }
}

export function readJson(key: string): unknown {
  const raw = readStorage(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export function writeJson(key: string, value: unknown): void {
  writeStorage(key, JSON.stringify(value));
}

export const STORAGE_KEYS = {
  battle: 'custodes11.battle',
  language: 'custodes11.language',
  selection: 'custodes11.selection',
  stratagemView: 'custodes11.stratagemView',
  tab: 'custodes11.tab',
  theme: 'custodes11.theme',
} as const;
