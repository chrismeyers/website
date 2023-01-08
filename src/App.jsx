import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
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

  return (
    <>
      {isMobileWidth ? <MobileNav theme={theme} /> : <FullNav />}
      {isMobileWidth ? <div /> : <Prompt theme={theme} />}
      <Outlet />
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
