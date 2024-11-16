import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './assets/vendor/hamburgers/hamburgers.min.css';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import App from './App.tsx';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'auto';
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
