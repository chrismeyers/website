module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'prefer-const': 'warn',
    'no-underscore-dangle': { allowAfterThis: true },
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
};
