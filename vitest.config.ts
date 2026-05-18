/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  envDir: '.',
  envPrefix: 'PUBLIC_',
  test: {
    environment: 'node',
    setupFiles: 'test/_setup.ts',
    coverage: {
      provider: 'v8',
    },
    reporters: process.env.CI ? ['verbose'] : ['tree'],
  },
});
