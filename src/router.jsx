import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Page from './components/Page';
import About from './pages/About';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Project, { projectContentStyles } from './pages/Project';
import Builds from './pages/Builds';
import Build, { buildContentStyles } from './pages/Build';
import NotFound from './pages/NotFound';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page title="An Error Has Occurred" content={<Error />} />,
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

export default router;
