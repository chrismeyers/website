module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
  rules: {
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/prefer-default-export': 'off',
    'testing-library/no-node-access': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
  },
  parserOptions: {
    ecmaVersion: 13,
  },
};
