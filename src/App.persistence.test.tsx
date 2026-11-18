// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { STORAGE_KEYS } from './shared/storage';

function goToTab(name: RegExp) {
  fireEvent.click(within(screen.getByRole('navigation')).getByRole('button', { name }));
}

function toggleDetachment(name: string) {
  fireEvent.click(screen.getByRole('checkbox', { name }));
}

function detachmentCheckbox(name: string) {
  return screen.getByRole('checkbox', { name });
}

function battleSizeButton(name: 'Incursion' | 'Strike Force') {
  return screen.getByRole('button', { name: new RegExp(`^${name}`) });
}

beforeEach(() => {
  window.localStorage.clear();
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('App persistence and selection changes', () => {
  it('Deselecting a detachment', () => {
    render(<App />);
    toggleDetachment('Dread Host');
    expect(screen.getByText('Total: 1 / 3 DP')).toBeInTheDocument();
    expect(detachmentCheckbox('Dread Host')).toBeChecked();
    toggleDetachment('Dread Host');
    expect(screen.getByText('Total: 0 / 3 DP')).toBeInTheDocument();
    expect(detachmentCheckbox('Dread Host')).not.toBeChecked();
    goToTab(/Stratagems/);
    expect(screen.getByText('10 stratagems disponibles')).toBeInTheDocument();
  });

  it('Changing battle size in the UI', () => {
    render(<App />);
    fireEvent.click(battleSizeButton('Incursion'));
    expect(battleSizeButton('Incursion')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Total: 0 / 2 DP')).toBeInTheDocument();
  });

  it('Incursion exception from the UI', () => {
    render(<App />);
    fireEvent.click(battleSizeButton('Incursion'));
    toggleDetachment('Guardians of the Throne');
    expect(screen.getByText('Total: 3 / 2 DP')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    toggleDetachment('Dread Host');
    expect(screen.getByText('Total: 4 / 2 DP')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Se supera el límite de DP');
  });

  it('The selection is written to storage after changes', () => {
    render(<App />);
    fireEvent.click(battleSizeButton('Incursion'));
    toggleDetachment('Dread Host');
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEYS.selection)!)).toEqual({
      battleSizeId: 'incursion',
      detachmentIds: ['dread-host'],
    });
    cleanup();
    render(<App />);
    expect(screen.getByText('Total: 1 / 2 DP')).toBeInTheDocument();
    expect(detachmentCheckbox('Dread Host')).toBeChecked();
  });

  it('The open tab is remembered', () => {
    render(<App />);
    goToTab(/Stratagems/);
    expect(window.localStorage.getItem(STORAGE_KEYS.tab)).toBe('stratagems');
    cleanup();
    render(<App />);
    expect(screen.getByText('10 stratagems disponibles')).toBeInTheDocument();
  });

  it('An unknown stored tab falls back to the army screen', () => {
    window.localStorage.setItem(STORAGE_KEYS.tab, 'bogus');
    render(<App />);
    expect(screen.getByText('Total: 0 / 3 DP')).toBeInTheDocument();
  });

  it('The stratagem view is remembered', () => {
    render(<App />);
    goToTab(/Stratagems/);
    fireEvent.click(screen.getByRole('button', { name: 'Por fase' }));
    expect(window.localStorage.getItem(STORAGE_KEYS.stratagemView)).toBe('phase');
    cleanup();
    render(<App />);
    goToTab(/Stratagems/);
    expect(screen.getByRole('button', { name: 'Por fase' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('An unknown stored view falls back to group', () => {
    window.localStorage.setItem(STORAGE_KEYS.stratagemView, 'grid');
    render(<App />);
    goToTab(/Stratagems/);
    expect(screen.getByRole('button', { name: 'Por grupo' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('An unknown stored language falls back to Spanish', () => {
    window.localStorage.setItem(STORAGE_KEYS.language, 'fr');
    render(<App />);
    expect(screen.getByRole('button', { name: 'Español' })).toHaveAttribute('aria-pressed', 'true');
  });
});
