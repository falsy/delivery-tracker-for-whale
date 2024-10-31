const baseConfig = require("../../jest.config")

module.exports = {
  ...baseConfig,
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "^@domains/(.*)$": "<rootDir>/src/domains/$1",
    "^@frameworks/(.*)$": "<rootDir>/src/frameworks/$1"
  }
}
