/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    svgr({ include: '**/*.svg' }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: 'test/_setup.ts',
    coverage: {
      provider: 'v8',
    },
    reporters: process.env.CI ? ['verbose'] : ['tree'],
  },
});
