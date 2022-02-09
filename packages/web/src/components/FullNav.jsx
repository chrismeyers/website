import { Link, useLocation } from 'react-router-dom';
import './css/full-nav.css';
import { ReactComponent as Logo } from '../assets/images/logos/v3/ccm-logo.svg';

const FullNav = () => {
  const location = useLocation();

  return (
    <nav>
      <div id="full-menu">
        <Link to="/">
          <span className="side-nav-logo">
            <Logo
              alt="Chris Meyers. Developer, Tech enthusiast."
              className="banner-img"
              title="Home"
            />
          </span>
        </Link>
        <ul className="side-nav-items">
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
