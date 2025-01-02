const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      console.log('Cypress config:', config);
      return config;
    },
    video: true,
    screenshotOnRunFailure: true
  }
});