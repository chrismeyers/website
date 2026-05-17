import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import svgr from 'vite-plugin-svgr';

// https://astro.build/config
export default defineConfig({
  site: 'https://chrismeyers.net',
  output: 'static',
  server: {
    port: 8080,
  },
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  vite: {
    plugins: [svgr({ include: '**/*.svg?react' })],
  },
});
