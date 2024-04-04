const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Since there are weird script artifacts
    testIsolation: false,
    supportFile: false,
    // baseUrl: "http://localhost:3000"
  },
})