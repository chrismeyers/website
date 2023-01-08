import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import FullNav from './FullNav';
import MobileNav from './MobileNav';
import Prompt from './Prompt';
import Footer from './Footer';
import { themePropTypes } from '../hooks/useTheme';

const Root = ({ isMobileWidth, theme }) => {
  return (
    <>
      {isMobileWidth ? <MobileNav theme={theme} /> : <FullNav />}{' '}
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

Root.propTypes = {
  isMobileWidth: PropTypes.bool.isRequired,
  theme: themePropTypes.isRequired,
};

export default Root;
