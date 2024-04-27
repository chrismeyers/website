import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import About from './pages/About.tsx';
import Build from './pages/Build.tsx';
import Builds from './pages/Builds.tsx';
import Error from './pages/Error.tsx';
import NotFound from './pages/NotFound.tsx';
import Project from './pages/Project.tsx';
import Projects from './pages/Projects.tsx';
import Resume from './pages/Resume.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
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

export default router;
