import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Root from './components/Root';
import About from './pages/About';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Project from './pages/Project';
import Builds from './pages/Builds';
import Build from './pages/Build';
import NotFound from './pages/NotFound';
import useTheme from './hooks/useTheme';
import useScreenResize from './hooks/useScreenResize';

const App = () => {
  const theme = useTheme();
  const { isMobileWidth } = useScreenResize();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root isMobileWidth={isMobileWidth} theme={theme} />,
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

  return <RouterProvider router={router} />;
};

export default App;
