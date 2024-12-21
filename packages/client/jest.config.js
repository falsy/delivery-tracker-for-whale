const path = require("path")
const baseConfig = require("../../jest.config")

module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: [path.resolve(__dirname, "setupTests.ts")],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest"
  },
  moduleNameMapper: {
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@domains/(.*)$": "<rootDir>/src/domains/$1",
    "^@adapters/(.*)$": "<rootDir>/src/adapters/$1",
    "^@di/(.*)$": "<rootDir>/src/di/$1",
    "^@pages/(.*)$": "<rootDir>/src/frameworks/pages/$1",
    "^@providers/(.*)$": "<rootDir>/src/frameworks/providers/$1",
    "^@containers/(.*)$": "<rootDir>/src/frameworks/containers/$1",
    "^@components/(.*)$": "<rootDir>/src/frameworks/components/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@hooks/(.*)$": "<rootDir>/src/frameworks/hooks/$1",
    "^@styled-system/(.*)$": "<rootDir>/styled-system/$1"
  }
}
