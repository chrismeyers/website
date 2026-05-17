import type { ReactNode } from 'react';
import ThemeProvider from '../context/ThemeProvider.tsx';
import Footer from './Footer.tsx';
import MobileNav from './MobileNav.tsx';

interface Props {
  pathname: string;
  children: ReactNode;
}

const ThemeShell = ({ pathname, children }: Props) => (
  <ThemeProvider>
    <MobileNav pathname={pathname} />
    {children}
    <Footer />
  </ThemeProvider>
);

export default ThemeShell;
