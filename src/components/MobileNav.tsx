import { useEffect, useRef, useState } from 'react';
import Logo from '../assets/images/logos/v3/ccm-logo.svg?react';
import useClickOutside from '../hooks/useClickOutside.ts';
import { isNavCurrent, NAVIGATION } from '../navigation.ts';
import mobileStyles from '../styles/MobileNav.module.css';
import Footer from './Footer.tsx';

const setBodyScrollable = (enabled: boolean) =>
  enabled
    ? document.body.classList.remove('prevent-scroll')
    : document.body.classList.add('prevent-scroll');

interface Props {
  pathname: string;
}

const MobileNav = ({ pathname }: Props) => {
  const [menuDisplayed, setMenuDisplayed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setMenuDisplayed(false), [menuIconRef]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setBodyScrollable(!menuDisplayed);
  }, [menuDisplayed]);

  useEffect(() => () => setBodyScrollable(true), []);

  return (
    <nav className={`nav-mobile ${mobileStyles.mobile}`} key={pathname}>
      <div className={mobileStyles.mobileMenu}>
        <div className={mobileStyles.header}>
          <div className={mobileStyles.smallNavLogo}>
            <a href="/" title="Home">
              <Logo className={mobileStyles.bannerImgSmall} />
            </a>
          </div>
          <div className={mobileStyles.menuIcon} ref={menuIconRef}>
            <div>
              <button
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
                {NAVIGATION.map((item) => (
                  <a
                    className={`nav-link ${isNavCurrent(pathname, item) ? 'nav-selected' : ''}`}
                    href={item.path}
                    key={item.name}
                  >
                    <div className={mobileStyles.menuItem}>{item.name}</div>
                  </a>
                ))}
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