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

function stratagemCards(name: string) {
  return screen.queryAllByRole('article', { name });
}

beforeEach(() => {
  window.localStorage.clear();
  // jsdom does not implement scrolling.
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('App', () => {
  it('starts in Spanish with Strike Force and no detachments', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: 'Español' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Total: 0 / 3 DP')).toBeInTheDocument();
  });

  it('shows only the 10 core stratagems when nothing is selected', () => {
    render(<App />);
    goToTab(/Stratagems/);
    expect(screen.getByText('10 stratagems disponibles')).toBeInTheDocument();
  });

  it('dedupes shared stratagems and warns about DP over the limit', () => {
    render(<App />);
    toggleDetachment('Guardians of the Throne');
    toggleDetachment("Emperor's Chosen");
    expect(screen.getByText('Total: 4 / 3 DP')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Se supera el límite de DP');

    goToTab(/Stratagems/);
    fireEvent.click(screen.getByRole('button', { name: 'Desplegar todo' }));
    expect(screen.getByText('17 stratagems disponibles')).toBeInTheDocument();
    const focus = stratagemCards('Superhuman Focus');
    expect(focus).toHaveLength(1);
    expect(focus[0]).toHaveTextContent('Guardians of the Throne');
    expect(focus[0]).toHaveTextContent("Emperor's Chosen");
  });

  it('warns when two Shield Host detachments are selected', () => {
    render(<App />);
    toggleDetachment('Aquilan Shield');
    toggleDetachment('Dread Host');
    expect(screen.getByRole('alert')).toHaveTextContent('Solo se permite un detachment Shield Host');
  });

  it("highlights the favoured ka'tah of a selected Shield Host", () => {
    const { container } = render(<App />);
    toggleDetachment('Solar Watch');
    const calistus = container.querySelector('[data-katah="calistus"]');
    expect(calistus).toHaveAttribute('data-favoured', 'true');
    expect(calistus).toHaveTextContent('Tu unidad tiene +2" de M.');
    expect(container.querySelector('[data-katah="salvus"]')).not.toHaveAttribute('data-favoured');
  });

  it('keeps every stratagem visible when switching between group and phase views', () => {
    render(<App />);
    toggleDetachment('Guardians of the Throne');
    goToTab(/Stratagems/);
    fireEvent.click(screen.getByRole('button', { name: 'Por fase' }));
    expect(stratagemCards('In Auramite Clad')).toHaveLength(2); // opponent's Shooting and Fight
    expect(stratagemCards('Prime Target')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Por grupo' }));
    fireEvent.click(screen.getByRole('button', { name: 'Desplegar todo' }));
    expect(stratagemCards('In Auramite Clad')).toHaveLength(2); // two groups
  });

  it('switches language, keeps proper names, and remembers the choice', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'English' }));
    expect(within(screen.getByRole('navigation')).getByRole('button', { name: /Detachments/ })).toBeInTheDocument();
    expect(screen.getAllByText("Martial Ka'tah").length).toBeGreaterThan(0);
    expect(window.localStorage.getItem(STORAGE_KEYS.language)).toBe('en');
    cleanup();
    render(<App />);
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('restores the saved detachments and battle size', () => {
    window.localStorage.setItem(
      STORAGE_KEYS.selection,
      JSON.stringify({ battleSizeId: 'incursion', detachmentIds: ['guardians-of-the-throne', 'bogus'] }),
    );
    render(<App />);
    expect(screen.getByText('Total: 3 / 2 DP')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument(); // Incursion single 3DP exception
  });

  it('still works when storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    render(<App />);
    toggleDetachment('Dread Host');
    expect(screen.getByText('Total: 1 / 3 DP')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'English' }));
    expect(screen.getByText('Valid selection.')).toBeInTheDocument();
  });

  it('filters the glossary', () => {
    render(<App />);
    goToTab(/Reglas/);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'lethal' } });
    expect(screen.getByText('[LETHAL HITS]')).toBeInTheDocument();
    expect(screen.queryByText('[TORRENT]')).not.toBeInTheDocument();
  });
});
