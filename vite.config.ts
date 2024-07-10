/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  server: {
    port: 8080,
  },
  plugins: [react(), svgr({ include: '**/*.svg' })],
  test: {
    environment: 'jsdom',
    setupFiles: 'test/_setup.ts',
    coverage: {
      provider: 'v8',
      ignoreEmptyLines: false,
    },
    reporters: ['verbose'],
  },
});
