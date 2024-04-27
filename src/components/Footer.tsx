import { useContext } from 'react';
import Switch from 'react-switch';
import GithubIcon from '../assets/images/icons/github.svg';
import LinkedInIcon from '../assets/images/icons/linkedin.svg';
import MailIcon from '../assets/images/icons/mail.svg';
import MoonIcon from '../assets/images/icons/moon.svg';
import SunIcon from '../assets/images/icons/sun.svg';
import { GITHUB_URL, LINKEDIN_URL, MAILTO_MESSAGE } from '../constants.ts';
import { ThemeContext } from '../context/contexts.ts';
import styles from '../styles/Footer.module.css';

interface Props {
  inMenu?: boolean;
}

const Footer = ({ inMenu = false }: Props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <footer className={inMenu ? styles.inMenu : ''}>
      <div className={styles.links}>
        <div className={styles.social}>
          <a href={GITHUB_URL} title="GitHub" className="no-decoration">
            <GithubIcon className="link-image large" alt="Find me on GitHub" />
          </a>
        </div>

        <div className={styles.bullets}>&bull;</div>

        <div className={styles.social}>
          <a href={LINKEDIN_URL} title="LinkedIn" className="no-decoration">
            <LinkedInIcon
              className="link-image large"
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

export default Footer;
