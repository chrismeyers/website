import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Project from './pages/Project';
import Builds from './pages/Builds';
import Build from './pages/Build';
import NotFound from './pages/NotFound';
import Error from './pages/Error';

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
