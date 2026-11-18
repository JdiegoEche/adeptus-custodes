// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../../App';

function goToBattle() {
  fireEvent.click(within(screen.getByRole('navigation')).getByRole('button', { name: /Batalla/ }));
}

function katahBox(katah: string) {
  return screen.getByRole('checkbox', { name: `Elegido: ${katah}` });
}

beforeEach(() => {
  window.localStorage.clear();
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('BattleScreen', () => {
  it("Starts at turn 1 and offers the six ka'tahs", () => {
    render(<App />);
    goToBattle();
    expect(screen.getByText('Turno 1')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox', { name: /^Elegido:/ })).toHaveLength(6);
    expect(screen.queryByRole('checkbox', { name: /^Usada:/ })).not.toBeInTheDocument();
  });

  it("A new turn clears the chosen ka'tahs", () => {
    render(<App />);
    goToBattle();
    fireEvent.click(katahBox('Calistus'));
    expect(katahBox('Calistus')).toBeChecked();
    fireEvent.click(screen.getByRole('button', { name: 'Nuevo turno' }));
    expect(screen.getByText('Turno 2')).toBeInTheDocument();
    expect(katahBox('Calistus')).not.toBeChecked();
  });

  it('Resetting the battle needs a second tap', () => {
    render(<App />);
    goToBattle();
    fireEvent.click(screen.getByRole('button', { name: 'Nuevo turno' }));
    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar batalla' }));
    expect(screen.getByText('Turno 2')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '¿Seguro? Toca otra vez' }));
    expect(screen.getByText('Turno 1')).toBeInTheDocument();
  });

  it('Remembers the turn after reopening', () => {
    render(<App />);
    goToBattle();
    fireEvent.click(screen.getByRole('button', { name: 'Nuevo turno' }));
    cleanup();
    render(<App />);
    goToBattle();
    expect(screen.getByText('Turno 2')).toBeInTheDocument();
  });
});
