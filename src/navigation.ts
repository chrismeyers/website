export interface NavItem {
  name: string;
  path: string;
  hasChildren: boolean;
}

export const NAVIGATION: NavItem[] = [
  { name: 'About', path: '/', hasChildren: false },
  { name: 'Resume', path: '/resume', hasChildren: false },
  { name: 'Projects', path: '/projects', hasChildren: true },
  { name: 'Builds', path: '/builds', hasChildren: true },
];

const normalizePath = (path: string) => {
  let normalized =
    path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  normalized = normalized.replace(/\.html$/, '');
  if (normalized === '/index' || normalized === '') {
    normalized = '/';
  }
  return normalized;
};

export const isNavCurrent = (pathname: string, item: NavItem) => {
  const current = normalizePath(pathname);
  const target = normalizePath(item.path);
  return item.hasChildren ? current.startsWith(target) : current === target;
};
