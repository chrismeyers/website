import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ThemeContext } from './contexts.ts';

const SYSTEM_THEME_DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const fromStorage = localStorage.getItem('theme');
    if (fromStorage === 'light' || fromStorage === 'dark') {
      return fromStorage;
    }

    if (window.matchMedia?.(SYSTEM_THEME_DARK_MEDIA_QUERY).matches) {
      return 'dark';
    }

    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.(SYSTEM_THEME_DARK_MEDIA_QUERY);
    if (!mediaQuery) {
      return undefined;
    }

    const systemThemeChangeFn = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', systemThemeChangeFn);

      return () => {
        mediaQuery.removeEventListener('change', systemThemeChangeFn);
      };
    }

    mediaQuery.addListener(systemThemeChangeFn);

    return () => {
      mediaQuery.removeListener(systemThemeChangeFn);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const applyTheme = useCallback((which: string) => {
    if (which === 'light' || which === 'dark') {
      setTheme(which);
    }
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme, applyTheme }),
    [theme, toggleTheme, applyTheme]
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
};

export default ThemeProvider;
