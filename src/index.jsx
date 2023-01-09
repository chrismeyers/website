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
import Page from './components/Page';
import About from './pages/About';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Project, { projectContentStyles } from './pages/Project';
import Builds from './pages/Builds';
import Build, { buildContentStyles } from './pages/Build';
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
      { path: '', element: <Page title="About" content={<About />} /> },
      { path: 'resume', element: <Page title="Résumé" content={<Resume />} /> },
      {
        path: 'projects',
        element: <Page title="Projects" content={<Projects />} />,
      },
      {
        path: 'projects/:id',
        element: (
          <Page
            title="Project Details"
            content={<Project />}
            contentStyles={projectContentStyles}
          />
        ),
      },
      {
        path: 'builds',
        element: <Page title="Builds" content={<Builds />} />,
      },
      {
        path: 'builds/:id',
        element: (
          <Page
            title="Build Details"
            content={<Build />}
            contentStyles={buildContentStyles}
          />
        ),
      },
      {
        path: '*',
        element: <Page title="Page Not Found" content={<NotFound />} />,
      },
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
