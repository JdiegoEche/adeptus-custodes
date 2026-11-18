// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../../App';
import { STORAGE_KEYS } from '../storage';

beforeEach(() => {
  window.localStorage.clear();
  delete document.documentElement.dataset.theme;
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('ThemeToggle', () => {
  it('starts dark and switches to light', async () => {
    render(<App />);
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(screen.getByRole('button', { name: /Cambiar a fondo claro/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Cambiar a fondo claro/i }));
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(screen.getByRole('button', { name: /Cambiar a fondo oscuro/i })).toBeInTheDocument();
    expect(window.localStorage.getItem(STORAGE_KEYS.theme)).toBe('light');
  });

  it('switches back to dark', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Cambiar a fondo claro/i }));
    fireEvent.click(screen.getByRole('button', { name: /Cambiar a fondo oscuro/i }));
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('restores the saved theme', async () => {
    window.localStorage.setItem(STORAGE_KEYS.theme, 'light');
    render(<App />);
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('ignores an invalid saved value', async () => {
    window.localStorage.setItem(STORAGE_KEYS.theme, 'blue');
    render(<App />);
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('still works when storage throws', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Cambiar a fondo claro/i }));
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});
