/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-console': 'warn',
    'import/prefer-default-export': 'off',
    'import/order': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['test/**', '**/vite.config.js', '**/.eslintrc.js'],
        optionalDependencies: false,
      },
    ],
    'testing-library/no-node-access': 'off',
    'react/no-danger': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/extensions': ['.js', '.mjs', '.jsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.jsx', '.json'],
      },
    },
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },
};
