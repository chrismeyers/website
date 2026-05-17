export interface NavItem {
  name: string;
  path: string;
  hasChildren: boolean;
}

export const NAVIGATION: NavItem[] = [
  { name: 'About', path: '/', hasChildren: false },
  { name: 'Résumé', path: '/resume', hasChildren: false },
  { name: 'Projects', path: '/projects', hasChildren: true },
  { name: 'Builds', path: '/builds', hasChildren: true },
];

export const isNavCurrent = (pathname: string, item: NavItem) =>
  item.hasChildren ? pathname.startsWith(item.path) : pathname === item.path;
