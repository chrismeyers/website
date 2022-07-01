import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/logos/v3/ccm-logo.svg';
import Footer from './Footer';
import useClickOutside from '../hooks/useClickOutside';
import { setBodyScrollable } from '../utils/styles';
import styles from '../styles/MobileNav.module.css';

const MobileNav = ({ themeProps }) => {
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
      <div className={styles['mobile-menu']}>
        <div className={styles.header}>
          <div className={styles['small-nav-logo']}>
            <Link to="/">
              <Logo
                alt="Chris Meyers. Developer, Tech enthusiast."
                className={styles['banner-img-small']}
                title="Home"
              />
            </Link>
          </div>
          <div className={styles['menu-icon']} ref={menuIconRef}>
            <div>
              <button
                style={{ outline: 'none' }}
                className={`hamburger hamburger--spin ${
                  menuDisplayed ? 'is-active' : ''
                }`}
                type="button"
                onClick={() => setMenuDisplayed((prev) => !prev)}
                aria-label="Menu"
                aria-controls="navigation"
              >
                <span className="hamburger-box" style={{ height: 26 }}>
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {menuDisplayed && (
          <div>
            <div className={styles['menu-overlay']}></div>
            <div className={styles.menu} ref={menuRef}>
              <Link
                className={`nav-link ${
                  location.pathname === '/' ? 'nav-selected' : ''
                }`}
                to="/"
              >
                <div className={styles['menu-item']}>About</div>
              </Link>
              <Link
                className={`nav-link ${
                  location.pathname === '/resume' ? 'nav-selected' : ''
                }`}
                to="/resume"
              >
                <div className={styles['menu-item']}>Résumé</div>
              </Link>
              <Link
                className={`nav-link ${
                  location.pathname.startsWith('/projects')
                    ? 'nav-selected'
                    : ''
                }`}
                to="/projects"
              >
                <div className={styles['menu-item']}>Projects</div>
              </Link>
              <Link
                className={`nav-link ${
                  location.pathname.startsWith('/builds') ? 'nav-selected' : ''
                }`}
                to="/builds"
              >
                <div className={styles['menu-item']}>Builds</div>
              </Link>

              <Footer themeProps={themeProps} inMenu={true} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MobileNav;
