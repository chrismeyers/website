import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Root from './components/Root';
import AboutPage from './components/AboutPage';
import ResumePage from './components/ResumePage';
import ProjectsPage from './components/ProjectsPage';
import ProjectPage from './components/ProjectPage';
import BuildsPage from './components/BuildsPage';
import BuildPage from './components/BuildPage';
import NotFoundPage from './components/NotFoundPage';
import useTheme from './hooks/useTheme';
import useScreenResize from './hooks/useScreenResize';

const App = () => {
  const theme = useTheme();
  const { isMobileWidth } = useScreenResize();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root isMobileWidth={isMobileWidth} theme={theme} />,
      errorElement: <NotFoundPage />,
      children: [
        { path: '', element: <AboutPage /> },
        { path: 'resume', element: <ResumePage /> },
        { path: 'projects', element: <ProjectsPage /> },
        { path: 'projects/:id', element: <ProjectPage /> },
        { path: 'builds', element: <BuildsPage /> },
        { path: 'builds/:id', element: <BuildPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
