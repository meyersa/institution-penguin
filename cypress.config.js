const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        // Since there are weird script artifacts
        testIsolation: 'false',
      },
})