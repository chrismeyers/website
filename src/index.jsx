import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import './assets/vendor/hamburgers/hamburgers.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import App from './App';
import About from './pages/About';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Project from './pages/Project';
import Builds from './pages/Builds';
import Build from './pages/Build';
import NotFound from './pages/NotFound';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'auto';
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '', element: <About /> },
      { path: 'resume', element: <Resume /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:id', element: <Project /> },
      { path: 'builds', element: <Builds /> },
      { path: 'builds/:id', element: <Build /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
