import { useContext } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { ReactComponent as GithubIcon } from '../assets/images/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../assets/images/icons/linkedin.svg';
import { ReactComponent as MailIcon } from '../assets/images/icons/mail.svg';
import { ReactComponent as SunIcon } from '../assets/images/icons/sun.svg';
import { ReactComponent as MoonIcon } from '../assets/images/icons/moon.svg';
import { GITHUB_URL, LINKEDIN_URL, MAILTO_MESSAGE } from '../constants';
import styles from '../styles/Footer.module.css';
import { ThemeContext } from '../context/contexts';

const Footer = ({ inMenu }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <footer className={inMenu ? styles.inMenu : ''}>
      <div className={styles.links}>
        <div className={styles.social}>
          <a href={GITHUB_URL} className="no-decoration">
            <GithubIcon
              className="link-image large"
              title="GitHub"
              alt="Find me on GitHub"
            />
          </a>
        </div>

        <div className={styles.bullets}>&bull;</div>

        <div className={styles.social}>
          <a href={LINKEDIN_URL} className="no-decoration">
            <LinkedInIcon
              className="link-image large"
              title="LinkedIn"
              alt="Connect with me on LinkedIn"
            />
          </a>
        </div>

        <div className={styles.bullets}>&bull;</div>

        <div className={styles.social}>
          <a
            href={MAILTO_MESSAGE}
            title="Send Message"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MailIcon className="link-image large" alt="Send Message" />
          </a>
        </div>

        <div className={styles.bullets}>&bull;</div>

        <div className={styles.theme}>
          <Switch
            onChange={toggleTheme}
            checked={theme === 'dark'}
            onColor="#5bb75b"
            offColor="#bbbbbb"
            aria-label="Toggle website theme"
            height={20}
            width={48}
            checkedIcon={<MoonIcon className="link-image small theme on" />}
            uncheckedIcon={<SunIcon className="link-image small theme off" />}
          />
        </div>
      </div>

      <span className={styles.years}>
        Designed and Developed by Chris Meyers, 2013-{new Date().getFullYear()}
      </span>
    </footer>
  );
};

Footer.defaultProps = {
  inMenu: false,
};

Footer.propTypes = {
  inMenu: PropTypes.bool,
};

export default Footer;
