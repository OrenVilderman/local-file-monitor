/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  maxWorkers: 1,
  testSequencer: "./__tests__/testSequencer.js",
  testPathIgnorePatterns: [
    "testSequencer.js",
  ],
  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "./jest-html-reporters",
      "filename": "test.html",
      "openReport": true
    }]
  ]
};
