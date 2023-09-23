import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import { FullNav, MobileNav } from './components/Navigation';
import Prompt from './components/Prompt';
import ThemeProvider from './context/ThemeProvider';
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
