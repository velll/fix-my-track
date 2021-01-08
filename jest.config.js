module.exports = {
  preset: 'ts-jest',
  "moduleNameMapper": {
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  },
  testEnvironment: 'jsdom',
  testMatch: [ "**/spec/js/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
  testPathIgnorePatterns: ['/examples/']
};
