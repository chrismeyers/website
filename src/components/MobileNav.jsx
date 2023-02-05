import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/logos/v3/ccm-logo.svg';
import Footer from './Footer';
import useClickOutside from '../hooks/useClickOutside';
import styles from '../styles/MobileNav.module.css';
import { NAVIGATION } from '../constants';

const setBodyScrollable = (enabled) =>
  enabled
    ? document.body.classList.remove('prevent-scroll')
    : document.body.classList.add('prevent-scroll');

const MobileNav = () => {
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
                {NAVIGATION.map((item) => {
                  const current = item.hasChildren
                    ? location.pathname.startsWith(item.path)
                    : location.pathname === item.path;

                  return (
                    <Link
                      className={`nav-link ${current ? 'nav-selected' : ''}`}
                      to={item.path}
                      key={item.name}
                    >
                      <div className={styles.menuItem}>{item.name}</div>
                    </Link>
                  );
                })}
                <Footer inMenu />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
