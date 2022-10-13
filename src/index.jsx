import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './assets/vendor/hamburgers/hamburgers.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import App from './App';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'auto';
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
