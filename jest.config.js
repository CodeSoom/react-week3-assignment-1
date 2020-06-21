module.exports = {
  setupFilesAfterEnv: [
    'jest-plugin-context/setup',
    // jest.setup.js는 test를 할 때 import jest-dom을
    // 따로 명시하지 않아도 불러와서 오류가 안남
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
