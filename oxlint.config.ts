import { defineConfig } from 'oxlint';

export default defineConfig({
  options: {
    typeAware: true,
  },
  env: {
    builtin: true,
  },
  ignorePatterns: ['dist', 'coverage', 'node_modules', '.astro'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      plugins: ['typescript'],
      env: {
        browser: true,
      },
      rules: {
        'no-param-reassign': ['error', { props: false }],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-console': 'warn',
        'no-alert': 'warn',
        'no-debugger': 'error',
        'typescript/no-explicit-any': 'off',
        'typescript/return-await': ['error', 'in-try-catch'],
      },
    },
    {
      files: ['test/**/*'],
      plugins: ['typescript'],
      rules: {
        'typescript/no-unsafe-argument': 'off',
        'typescript/no-unsafe-assignment': 'off',
        'typescript/no-unsafe-call': 'off',
        'typescript/no-unsafe-member-access': 'off',
      },
    },
    {
      files: ['bin/**/*.js', 'bin/**/*.ts'],
      env: {
        node: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['astro.config.js', 'vitest.config.ts'],
      plugins: [],
      env: {
        node: true,
      },
    },
    {
      files: ['**/*.js'],
      plugins: [],
    },
  ],
});
