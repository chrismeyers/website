/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@astrojs/react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr({ include: '**/*.svg?react' })],
  envDir: '.',
  envPrefix: 'PUBLIC_',
  test: {
    environment: 'jsdom',
    setupFiles: 'test/_setup.ts',
    coverage: {
      provider: 'v8',
    },
    reporters: process.env.CI ? ['verbose'] : ['tree'],
  },
});
