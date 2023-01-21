import { Outlet } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import FullNav from './components/FullNav';
import MobileNav from './components/MobileNav';
import Prompt from './components/Prompt';
import Footer from './components/Footer';
import useScreenResize from './hooks/useScreenResize';

const App = () => {
  const { isMobileWidth } = useScreenResize();

  // Return early if width has not been determined yet to reduce Cumulative
  // Layout Shift (https://web.dev/cls/)
  if (isMobileWidth === null) return <div />;

  return (
    <ThemeProvider>
      {isMobileWidth ? <MobileNav /> : <FullNav />}
      {isMobileWidth ? <div /> : <Prompt />}
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
