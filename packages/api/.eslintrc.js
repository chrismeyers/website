module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
  parserOptions: {
    ecmaVersion: 13,
  },
};
