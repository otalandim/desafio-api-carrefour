module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.spec.js'],
  verbose: true,
  reporters: [
    "default",
     ["jest-json-reporter", {
      "outputPath": "./reports/test-report.json"
    }],
    ["jest-html-reporter", {
      "pageTitle": "Relatório de Testes de API",
      "outputPath": "./reports/test-report.html",
      "includeFailureMsg": true,
      "includeConsoleLog": true
    }]
  ]
};