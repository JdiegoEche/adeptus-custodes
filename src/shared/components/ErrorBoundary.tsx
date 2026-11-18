import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  /** Rendered instead of the children after a render error. `reset` clears the error and retries. */
  fallback: (reset: () => void) => ReactNode;
  /** When this value changes, a caught error is cleared (for example on tab change). */
  resetKey?: unknown;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render errors in its subtree so one broken screen does not blank the whole app.
 * React only supports error boundaries as class components.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Render error caught by ErrorBoundary', error, info.componentStack);
  }

  componentDidUpdate(previous: ErrorBoundaryProps): void {
    if (this.state.hasError && previous.resetKey !== this.props.resetKey) this.reset();
  }

  reset = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    return this.state.hasError ? this.props.fallback(this.reset) : this.props.children;
  }
}
