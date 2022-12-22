import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { isMobile as isMobileDevice } from 'react-device-detect';
import './App.css';
import FullNav from './components/FullNav';
import MobileNav from './components/MobileNav';
import Prompt from './components/Prompt';
import Footer from './components/Footer';
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
  const isMobile = (isMobileDevice || isMobileWidth) ?? true;

  return (
    <>
      <Router>
        {isMobile ? <MobileNav theme={theme} /> : <FullNav />}
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/builds" element={<BuildsPage />} />
          <Route path="/builds/:id" element={<BuildPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {isMobile === true ? <div /> : <Prompt theme={theme} />}
      </Router>
      <Footer theme={theme} />
      <ToastContainer
        theme={theme.theme}
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;