// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  react.configs.flat.recommended,
  // TODO: Update to recommended shorthand once eslint-plugin-react-hooks officially supports flat config
  //   - https://github.com/facebook/react/issues/28313
  {
    plugins: {
      // @ts-expect-error: See above
      'react-hooks': reactHooks,
    },
    // @ts-expect-error: See above
    rules: reactHooks.configs.recommended.rules,
  },
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      // built in
      'no-param-reassign': ['error', { props: false }],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-console': 'warn',
      'no-alert': 'warn',
      'no-debugger': 'error',
      'no-return-await': 'off',

      // @typescript-eslint
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],

      // react
      'react/no-danger': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function' },
      ],
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.tsx', '.ts'] },
      ],
      'react/jsx-key': 'off', // too many false positives, rely on runtime errors
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['bin/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  }
);
