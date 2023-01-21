import { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { THEMES } from '../utils/constants';
import { getCssVar } from '../utils/styles';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  const systemThemeDarkMediaQuery = '(prefers-color-scheme: dark)';

  useEffect(() => {
    if (!theme) {
      if (window.matchMedia) {
        const init = window.matchMedia(systemThemeDarkMediaQuery).matches
          ? THEMES.dark
          : THEMES.light;
        setTheme(init);
      } else {
        setTheme(THEMES.light);
      }
    }

    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const systemThemeChangeFn = (e) => {
      const which = e.matches ? THEMES.dark : THEMES.light;
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
          mainThemeColor: getCssVar('--main-theme-color'),
          lightModeToggleColor: getCssVar('--light-mode-toggle-bg-color'),
          toggleTheme: () => {
            setTheme(theme === THEMES.light ? THEMES.dark : THEMES.light);
          },
          applyTheme: (which) => {
            if (Object.values(THEMES).includes(which)) {
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
