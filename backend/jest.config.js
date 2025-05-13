export default {
    testEnvironment: 'node',
    testMatch: ['**/tests/features/**/*.js'], 
    setupFilesAfterEnv: ['./tests/setup.js'],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    testTimeout: 30000,
    detectOpenHandles: true,
    transform: {},
    moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', 
  },

  };