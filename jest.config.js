module.exports = {
  setupFilesAfterEnv: [
    'jest-plugin-context/setup',
    // 파일들을 잡아주는것
    './jest.setup',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
