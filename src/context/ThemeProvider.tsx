import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './contexts.ts';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  const systemThemeDarkMediaQuery = '(prefers-color-scheme: dark)';

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

  useEffect(() => {
    localStorage.setItem('theme', theme as string);
    document.documentElement.setAttribute('data-theme', theme as string);
  }, [theme]);

  useEffect(() => {
    const systemThemeChangeFn = (e: MediaQueryListEvent) => {
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
    <ThemeContext
      value={useMemo(
        () => ({
          theme,
          toggleTheme: () => {
            setTheme(theme === 'light' ? 'dark' : 'light');
          },
          applyTheme: (which: string) => {
            if (['light', 'dark'].includes(which)) {
              setTheme(which);
            }
          },
        }),
        [theme]
      )}
    >
      {children}
    </ThemeContext>
  );
};

export default ThemeProvider;
