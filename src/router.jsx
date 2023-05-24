import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Page from './components/Page';
import About from './pages/About';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Project from './pages/Project';
import projectStyles from './styles/Project.module.css';
import Builds from './pages/Builds';
import Build from './pages/Build';
import buildStyles from './styles/Build.module.css';
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
            contentStyles={[projectStyles.project]}
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
            contentStyles={[buildStyles.build]}
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
