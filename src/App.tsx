import './App.css';
import Footer from './components/Footer.tsx';
import { FullNav, MobileNav } from './components/Navigation.tsx';
import Prompt from './components/Prompt.tsx';
import ThemeProvider from './context/ThemeProvider.tsx';
import useScreenResize from './hooks/useScreenResize.ts';

const App = () => {
  const { isMobileWidth } = useScreenResize();

  // Return early if width has not been determined yet to reduce Cumulative
  // Layout Shift (https://web.dev/cls/)
  if (isMobileWidth === null) return <div />;

  return (
    <ThemeProvider>
      {isMobileWidth ? <MobileNav /> : <FullNav />}
      {isMobileWidth ? <div /> : <Prompt />}
      <Footer />
    </ThemeProvider>
  );
};

export default App;
