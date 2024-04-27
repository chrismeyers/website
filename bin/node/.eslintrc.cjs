/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: false,
  },
  rules: {
    'import/extensions': ['error', { mjs: 'always', js: 'always' }],
  },
};
