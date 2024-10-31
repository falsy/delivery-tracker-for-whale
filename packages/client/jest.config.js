const path = require("path")
const baseConfig = require("../../jest.config")

module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: [path.resolve(__dirname, "setupTests.ts")],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@domains/(.*)$": "<rootDir>/src/domains/$1",
    "^@adapters/(.*)$": "<rootDir>/src/adapters/$1",
    "^@di/(.*)$": "<rootDir>/src/frameworks/di/$1",
    "^@components/(.*)$": "<rootDir>/src/frameworks/components/$1",
    "^@services/(.*)$": "<rootDir>/src/frameworks/services/$1",
    "^@hooks/(.*)$": "<rootDir>/src/frameworks/hooks/$1"
  }
}
