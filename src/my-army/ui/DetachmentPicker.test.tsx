// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../../App';

function card(name: string) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return screen.getByRole('button', { name: new RegExp(`^${escaped}`) });
}

beforeEach(() => {
  window.localStorage.clear();
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('DetachmentPicker', () => {
  it('expands the detail without selecting when tapping the card', async () => {
    render(<App />);
    const dreadHostCard = card('Dread Host');
    fireEvent.click(dreadHostCard);
    expect(dreadHostCard).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('article', { name: 'Lightning Wrath' })).toBeInTheDocument();
    expect(screen.getByText('Flawless Bladework')).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox', { name: 'Dread Host' });
    expect(checkbox).not.toBeChecked();
    expect(screen.getByText('Total: 0 / 3 DP')).toBeInTheDocument();
  });

  it('collapses the detail when tapping the card again', async () => {
    render(<App />);
    const dreadHostCard = card('Dread Host');
    fireEvent.click(dreadHostCard);
    fireEvent.click(dreadHostCard);
    expect(dreadHostCard).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('article', { name: 'Lightning Wrath' })).not.toBeInTheDocument();
  });

  it('selects without expanding when tapping the checkbox', async () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox', { name: 'Dread Host' });
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(screen.getByText('Total: 1 / 3 DP')).toBeInTheDocument();
    const dreadHostCard = card('Dread Host');
    expect(dreadHostCard).toHaveAttribute('aria-expanded', 'false');
  });

  it('allows two cards to be open at once', async () => {
    render(<App />);
    const dreadHostCard = card('Dread Host');
    const solarWatchCard = card('Solar Watch');
    fireEvent.click(dreadHostCard);
    fireEvent.click(solarWatchCard);
    expect(dreadHostCard).toHaveAttribute('aria-expanded', 'true');
    expect(solarWatchCard).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('article', { name: 'Lightning Wrath' })).toBeInTheDocument();
    expect(screen.getByRole('article', { name: 'Inexorable' })).toBeInTheDocument();
  });
});
