export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const SYSTEM_THEME_DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

export const THEME_CHANGE_EVENT = 'themechange';

export const getStoredTheme = (): Theme | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return null;
};

export const getSystemTheme = (): Theme =>
  window.matchMedia(SYSTEM_THEME_DARK_MEDIA_QUERY).matches ? 'dark' : 'light';

export const getTheme = (): Theme => getStoredTheme() ?? getSystemTheme();

export const setTheme = (theme: Theme): void => {
  localStorage.setItem(STORAGE_KEY, theme);
  document.documentElement.setAttribute('data-theme', theme);
  window.dispatchEvent(
    new CustomEvent<{ theme: Theme }>(THEME_CHANGE_EVENT, { detail: { theme } })
  );
};

export const toggleTheme = (): void => {
  setTheme(getTheme() === 'light' ? 'dark' : 'light');
};

export const syncThemeToggle = (toggle: HTMLElement): void => {
  const theme = getTheme();
  toggle.setAttribute('aria-checked', String(theme === 'dark'));
  toggle.dataset.theme = theme;
};

export const initTheme = (): void => {
  setTheme(getTheme());

  const mediaQuery = window.matchMedia(SYSTEM_THEME_DARK_MEDIA_QUERY);
  mediaQuery.addEventListener('change', (event) => {
    setTheme(event.matches ? 'dark' : 'light');
  });
};

export const bindThemeToggle = (toggle: HTMLElement): void => {
  syncThemeToggle(toggle);

  toggle.addEventListener('click', () => {
    toggleTheme();
  });

  window.addEventListener(THEME_CHANGE_EVENT, () => {
    syncThemeToggle(toggle);
  });
};
