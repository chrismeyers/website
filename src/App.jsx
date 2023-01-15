import { Outlet } from 'react-router-dom';
import { isMobile as isMobileDevice } from 'react-device-detect';
import './App.css';
import FullNav from './components/FullNav';
import MobileNav from './components/MobileNav';
import Prompt from './components/Prompt';
import Footer from './components/Footer';
import useTheme from './hooks/useTheme';
import useScreenResize from './hooks/useScreenResize';

const App = () => {
  const theme = useTheme();
  const { isMobileWidth } = useScreenResize();
  const isMobile = isMobileDevice || isMobileWidth;

  return (
    <>
      {isMobile ? <MobileNav theme={theme} /> : <FullNav />}
      {isMobile ? <div /> : <Prompt theme={theme} />}
      <Outlet />
      <Footer theme={theme} />
    </>
  );
};

export default App;
