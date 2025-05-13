export default {
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.js'],
    setupFilesAfterEnv: ['./tests/setup.js'],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true
  };