module.exports = {
  preset: "ts-jest",
  moduleFileExtensions: ["js", "json", "ts", "tsx"],
  testRegex: ".*\\.spec\\.(ts|tsx)$",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironment: "jsdom"
}
