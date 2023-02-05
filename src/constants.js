export const THEMES = { light: 'light', dark: 'dark' };
export const MOBILE_BREAKPOINT = 970; // px
export const GITHUB_URL = 'https://github.com/chrismeyers';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/chris-meyers';
export const EMAIL_ADDRESS = 'chris@chrismeyers.net';
export const MAILTO_MESSAGE = `mailto:${EMAIL_ADDRESS}?subject=Message%20from%20chrismeyers.net`;
export const MAILTO_RESUME = `mailto:${EMAIL_ADDRESS}?subject=Requesting%20copy%20of%20resume%20PDF`;
export const DEFAULT_DOCUMENT_TITLE =
  'Chris Meyers - Developer, Tech Enthusiast';
export const LIGHTGALLERY_LICENSE =
  import.meta.env.VITE_LIGHTGALLERY_LICENSE || '0000-0000-000-0000';
export const NAVIGATION = [
  { name: 'About', path: '/', hasChildren: false },
  { name: 'Résumé', path: '/resume', hasChildren: false },
  { name: 'Projects', path: '/projects', hasChildren: true },
  { name: 'Builds', path: '/builds', hasChildren: true },
];
