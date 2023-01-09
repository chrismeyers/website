import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import './assets/vendor/hamburgers/hamburgers.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import router from './router';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'auto';
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
