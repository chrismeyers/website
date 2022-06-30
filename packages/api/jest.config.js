module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/__fixtures__/*',
  ],
  setupFilesAfterEnv: ['jest-extended/all'],
};
