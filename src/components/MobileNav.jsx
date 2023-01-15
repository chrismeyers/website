import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/logos/v3/ccm-logo.svg';
import Footer from './Footer';
import useClickOutside from '../hooks/useClickOutside';
import { themePropTypes } from '../hooks/useTheme';
import { setBodyScrollable } from '../utils/styles';
import styles from '../styles/MobileNav.module.css';

const MobileNav = ({ theme }) => {
  const [menuDisplayed, setMenuDisplayed] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const menuIconRef = useRef(null);

  useClickOutside(menuRef, () => setMenuDisplayed(false), [menuIconRef]);

  useEffect(() => {
    setMenuDisplayed(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setBodyScrollable(!menuDisplayed);
  }, [menuDisplayed]);

  useEffect(() => {
    return () => setBodyScrollable(true);
  }, []);

  return (
    <nav className={styles.mobile}>
      <div className={styles.mobileMenu}>
        <div className={styles.header}>
          <div className={styles.smallNavLogo}>
            <Link to="/">
              <Logo
                alt="Chris Meyers. Developer, Tech enthusiast."
                className={styles.bannerImgSmall}
                title="Home"
              />
            </Link>
          </div>
          <div className={styles.menuIcon} ref={menuIconRef}>
            <div>
              <button
                style={{ outline: 'none' }}
                className={`hamburger hamburger--spin ${
                  menuDisplayed ? 'is-active' : ''
                }`}
                type="button"
                onClick={() => setMenuDisplayed((prev) => !prev)}
                aria-label="Menu"
                aria-controls="mobile-menu"
              >
                <span className="hamburger-box" style={{ height: 26 }}>
                  <span className="hamburger-inner" />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div id="mobile-menu">
          {menuDisplayed && (
            <>
              <div className={styles.menuOverlay} />
              <div className={styles.menu} ref={menuRef}>
                <Link
                  className={`nav-link ${
                    location.pathname === '/' ? 'nav-selected' : ''
                  }`}
                  to="/"
                >
                  <div className={styles.menuItem}>About</div>
                </Link>
                <Link
                  className={`nav-link ${
                    location.pathname === '/resume' ? 'nav-selected' : ''
                  }`}
                  to="/resume"
                >
                  <div className={styles.menuItem}>Résumé</div>
                </Link>
                <Link
                  className={`nav-link ${
                    location.pathname.startsWith('/projects')
                      ? 'nav-selected'
                      : ''
                  }`}
                  to="/projects"
                >
                  <div className={styles.menuItem}>Projects</div>
                </Link>
                <Link
                  className={`nav-link ${
                    location.pathname.startsWith('/builds')
                      ? 'nav-selected'
                      : ''
                  }`}
                  to="/builds"
                >
                  <div className={styles.menuItem}>Builds</div>
                </Link>

                <Footer theme={theme} inMenu />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

MobileNav.propTypes = {
  theme: themePropTypes.isRequired,
};

export default MobileNav;
