import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/images/logos/v3/ccm-logo.svg';
import { SLOGAN } from '../constants.ts';
import useClickOutside from '../hooks/useClickOutside.ts';
import fullStyles from '../styles/FullNav.module.css';
import mobileStyles from '../styles/MobileNav.module.css';
import Footer from './Footer.tsx';

const NAVIGATION = [
  { name: 'About', path: '/', hasChildren: false },
  { name: 'Résumé', path: '/resume', hasChildren: false },
  { name: 'Projects', path: '/projects', hasChildren: true },
  { name: 'Builds', path: '/builds', hasChildren: true },
];

const setBodyScrollable = (enabled: boolean) =>
  enabled
    ? document.body.classList.remove('prevent-scroll')
    : document.body.classList.add('prevent-scroll');

export const FullNav = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <nav>
      <div className={fullStyles.fullMenu}>
        <Link to="/">
          <span className={fullStyles.sideNavLogo}>
            <Logo
              // @ts-expect-error It exists, trust me
              alt={SLOGAN}
              className={fullStyles.bannerImg}
              title="Home"
            />
          </span>
        </Link>
        <ul className={fullStyles.sideNavItems}>
          {NAVIGATION.map((item) => {
            const current = item.hasChildren
              ? location.pathname.startsWith(item.path)
              : location.pathname === item.path;

            return (
              <li key={item.name}>
                <Link
                  className={`nav-link ${current ? 'nav-selected' : ''}`}
                  to={item.path}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export const MobileNav = () => {
  const [menuDisplayed, setMenuDisplayed] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setMenuDisplayed(false), [menuIconRef]);

  useEffect(() => {
    setMenuDisplayed(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setBodyScrollable(!menuDisplayed);
  }, [menuDisplayed]);

  useEffect(() => () => setBodyScrollable(true), []);

  return (
    <nav className={mobileStyles.mobile}>
      <div className={mobileStyles.mobileMenu}>
        <div className={mobileStyles.header}>
          <div className={mobileStyles.smallNavLogo}>
            <Link to="/">
              <Logo
                // @ts-expect-error It exists, trust me
                alt={SLOGAN}
                className={mobileStyles.bannerImgSmall}
                title="Home"
              />
            </Link>
          </div>
          <div className={mobileStyles.menuIcon} ref={menuIconRef}>
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
              <div className={mobileStyles.menuOverlay} />
              <div className={mobileStyles.menu} ref={menuRef}>
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
                      <div className={mobileStyles.menuItem}>{item.name}</div>
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
