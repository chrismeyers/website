module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended'],
  rules: {
    'no-console': 'warn',
    'prefer-const': 'warn',
    'import/no-anonymous-default-export': 'off',
    'testing-library/no-node-access': 'off',
  },
};
