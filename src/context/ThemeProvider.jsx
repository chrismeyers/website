import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './contexts';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  const systemThemeDarkMediaQuery = '(prefers-color-scheme: dark)';

  useEffect(() => {
    if (!theme) {
      if (window.matchMedia) {
        const init = window.matchMedia(systemThemeDarkMediaQuery).matches
          ? 'dark'
          : 'light';
        setTheme(init);
      } else {
        setTheme('light');
      }
    }

    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const systemThemeChangeFn = (e) => {
      const which = e.matches ? 'dark' : 'light';
      setTheme(which);
    };

    const systemThemeAvailable =
      window.matchMedia &&
      typeof window.matchMedia(systemThemeDarkMediaQuery).addEventListener ===
        'function' &&
      typeof window.matchMedia(systemThemeDarkMediaQuery)
        .removeEventListener === 'function';

    if (systemThemeAvailable) {
      window
        .matchMedia(systemThemeDarkMediaQuery)
        .addEventListener('change', systemThemeChangeFn);
    }

    return () => {
      if (systemThemeAvailable) {
        window
          .matchMedia(systemThemeDarkMediaQuery)
          .removeEventListener('change', systemThemeChangeFn);
      }
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={useMemo(
        () => ({
          theme,
          toggleTheme: () => {
            setTheme(theme === 'light' ? 'dark' : 'light');
          },
          applyTheme: (which) => {
            if (['light', 'dark'].includes(which)) {
              setTheme(which);
            }
          },
        }),
        [theme]
      )}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
