module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  rules: {
    'no-console': 'warn',
    'prefer-const': 'warn',
    'import/no-anonymous-default-export': 'off',
    'testing-library/no-node-access': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
};
