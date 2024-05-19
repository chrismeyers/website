/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    // built in
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-console': 'warn',
    'no-alert': 'warn',
    'no-debugger': 'error',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],

    // import
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: { order: 'asc' },
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['test/**', '**/vite.config.ts', '**/.eslintrc.cjs'],
        optionalDependencies: false,
      },
    ],

    // react
    'react/no-danger': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.ts'] }],
    'react/jsx-key': 'off', // too many false positives, rely on runtime errors
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },
};
