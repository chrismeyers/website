import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './assets/vendor/hamburgers/hamburgers.min.css';
import App from './App.tsx';
import Router from './Router.tsx';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'auto';
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
    <Router />
  </StrictMode>
);
