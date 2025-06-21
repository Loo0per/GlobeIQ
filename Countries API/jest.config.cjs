module.exports = {
  setupFilesAfterEnv: ['./src/setupTests.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
};