import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import svgr from 'vite-plugin-svgr';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  server: {
    port: 8080,
  },
  integrations: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
  vite: {
    plugins: [svgr({ include: '**/*.svg?react' })],
  },
});
