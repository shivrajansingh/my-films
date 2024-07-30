/* eslint-disable import/no-anonymous-default-export */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!idbkeyvalue)',
  ],
  testMatch: ['**/__tests__/**/*.(ts|tsx|js|jsx)', '**/?(*.)+(spec|test).(ts|tsx|js|jsx)'],
  setupFiles: ['./setupTests.ts', 'fake-indexeddb/auto'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text-summary"],
  reporters: [
    "default",
    ["jest-html-reporter", {
      "pageTitle": "Test Report",
      "outputPath": "./coverage/jest_html_report.html",
      "includeFailureMsg": true,
      "includeConsoleLog": true
    }]
  ],
};
