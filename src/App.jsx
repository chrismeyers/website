import { Outlet } from 'react-router-dom';
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

  // Return early if width has not been determined yet to reduce Cumulative
  // Layout Shift (https://web.dev/cls/)
  if (isMobileWidth === null) return <div />;

  return (
    <>
      {isMobileWidth ? <MobileNav theme={theme} /> : <FullNav />}
      {isMobileWidth ? <div /> : <Prompt theme={theme} />}
      <Outlet />
      <Footer theme={theme} />
    </>
  );
};

export default App;
