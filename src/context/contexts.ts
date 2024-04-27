import { createContext } from 'react';

export const ThemeContext = createContext<{
  theme: string | null;
  toggleTheme: () => void;
  applyTheme: (which: string) => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
  applyTheme: () => {},
});
