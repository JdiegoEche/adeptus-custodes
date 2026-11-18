import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ErrorBoundary } from './shared/components/ErrorBoundary';
import { AppErrorFallback } from './shared/components/ScreenErrorFallback';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary fallback={() => <AppErrorFallback />}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
