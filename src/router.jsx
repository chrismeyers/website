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
    errorElement: <Page header="An Error Has Occurred" content={<Error />} />,
    children: [
      { path: '', element: <Page header="About" content={<About />} /> },
      {
        path: 'resume',
        element: <Page header="Résumé" content={<Resume />} />,
      },
      {
        path: 'projects',
        element: <Page header="Projects" content={<Projects />} />,
      },
      {
        path: 'projects/:id',
        element: (
          <Page
            header="Project Details"
            content={<Project />}
            contentStyles={projectContentStyles}
          />
        ),
      },
      {
        path: 'builds',
        element: <Page header="Builds" content={<Builds />} />,
      },
      {
        path: 'builds/:id',
        element: (
          <Page
            header="Build Details"
            content={<Build />}
            contentStyles={buildContentStyles}
          />
        ),
      },
      {
        path: '*',
        element: <Page header="Page Not Found" content={<NotFound />} />,
      },
    ],
  },
]);

export default router;
