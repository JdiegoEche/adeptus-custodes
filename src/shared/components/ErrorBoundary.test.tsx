// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

let shouldThrow = true;

function Flaky() {
  if (shouldThrow) throw new Error('boom');
  return <p>screen content</p>;
}

function renderBoundary(resetKey: string) {
  return (
    <ErrorBoundary
      resetKey={resetKey}
      fallback={(reset) => (
        <button type="button" onClick={reset}>
          retry
        </button>
      )}
    >
      <Flaky />
    </ErrorBoundary>
  );
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    shouldThrow = true;
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('shows the fallback instead of blanking when a child throws', () => {
    render(renderBoundary('army'));
    expect(screen.getByRole('button', { name: 'retry' })).toBeTruthy();
    expect(screen.queryByText('screen content')).toBeNull();
  });

  it('renders the children again after reset once the error is gone', () => {
    render(renderBoundary('army'));
    shouldThrow = false;
    fireEvent.click(screen.getByRole('button', { name: 'retry' }));
    expect(screen.getByText('screen content')).toBeTruthy();
  });

  it('clears the error when the reset key changes', () => {
    const { rerender } = render(renderBoundary('army'));
    shouldThrow = false;
    rerender(renderBoundary('rules'));
    expect(screen.getByText('screen content')).toBeTruthy();
  });
});
