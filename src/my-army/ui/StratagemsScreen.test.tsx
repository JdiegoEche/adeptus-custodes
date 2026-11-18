// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../../App';

function goToStratagems() {
  fireEvent.click(within(screen.getByRole('navigation')).getByRole('button', { name: /Stratagems/ }));
}

function groupHeader(title: string) {
  return screen.getByRole('button', { name: new RegExp(`^${title}`) });
}

beforeEach(() => {
  window.localStorage.clear();
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('Stratagems group view', () => {
  beforeEach(() => {
    render(<App />);
    goToStratagems();
  });

  it('groups start collapsed', () => {
    expect(groupHeader('Ataque disparo')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('article', { name: 'Explosives' })).not.toBeInTheDocument();
  });

  it('tapping a group header expands only that group', () => {
    fireEvent.click(groupHeader('Ataque disparo'));
    expect(groupHeader('Ataque disparo')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('article', { name: 'Explosives' })).toBeInTheDocument();
    expect(screen.queryByRole('article', { name: 'Smokescreen' })).not.toBeInTheDocument();

    fireEvent.click(groupHeader('Ataque disparo'));
    expect(groupHeader('Ataque disparo')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('article', { name: 'Explosives' })).not.toBeInTheDocument();
  });

  it('expand all and collapse all', () => {
    fireEvent.click(screen.getByRole('button', { name: /Desplegar todo/ }));
    expect(screen.getByRole('article', { name: 'Explosives' })).toBeInTheDocument();
    expect(screen.getByRole('article', { name: 'Smokescreen' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Contraer todo/ }));
    expect(screen.queryByRole('article', { name: 'Explosives' })).not.toBeInTheDocument();
    expect(screen.queryByRole('article', { name: 'Smokescreen' })).not.toBeInTheDocument();
  });

  it('the phase view is not collapsible', () => {
    fireEvent.click(screen.getByRole('button', { name: /Por fase/ }));
    expect(screen.getByRole('article', { name: 'Explosives' })).toBeInTheDocument();
  });
});
