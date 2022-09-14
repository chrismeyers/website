import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/logos/v3/ccm-logo.svg';
import styles from '../styles/FullNav.module.css';

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
          <li>
            <Link
              className={`nav-link ${
                location.pathname === '/' ? 'nav-selected' : ''
              }`}
              to="/"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                location.pathname === '/resume' ? 'nav-selected' : ''
              }`}
              to="/resume"
            >
              Résumé
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                location.pathname.startsWith('/projects') ? 'nav-selected' : ''
              }`}
              to="/projects"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                location.pathname.startsWith('/builds') ? 'nav-selected' : ''
              }`}
              to="/builds"
            >
              Builds
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default FullNav;
