module.exports = {
  preset: "ts-jest",
  moduleFileExtensions: ["js", "json", "ts", "tsx"],
  testRegex: ".*\\.spec\\.(ts|tsx)$",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testEnvironment: "jsdom",
  rootDir: "src",
  moduleNameMapper: {
    "^@core/(.*)$": "<rootDir>/core/$1",
    "^@constants/(.*)$": "<rootDir>/constants/$1",
    "^@di/(.*)$": "<rootDir>/frameworks/di/$1",
    "^@components/(.*)$": "<rootDir>/frameworks/components/$1",
    "^@services/(.*)$": "<rootDir>/frameworks/services/$1",
    "^@hooks/(.*)$": "<rootDir>/frameworks/hooks/$1"
  }
}
