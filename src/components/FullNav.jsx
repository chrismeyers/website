import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/logos/v3/ccm-logo.svg';
import styles from '../styles/FullNav.module.css';
import { NAVIGATION } from '../constants';

const FullNav = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <nav>
      <div className={styles.fullMenu}>
        <Link to="/">
          <span className={styles.sideNavLogo}>
            <Logo
              alt="Chris Meyers. Developer, Tech enthusiast."
              className={styles.bannerImg}
              title="Home"
            />
          </span>
        </Link>
        <ul className={styles.sideNavItems}>
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

export default FullNav;
