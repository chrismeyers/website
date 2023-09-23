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
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
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
        devDependencies: ['test/**', '**/vite.config.js', '**/.eslintrc.js'],
        optionalDependencies: false,
      },
    ],
    'testing-library/no-node-access': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
