const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // The `pluginsFile` option is no longer valid in Cypress 10+
    setupNodeEvents(on, config) {
      // Event handling logic goes here (e.g., for handling specific events)
      // If you don't need any custom event handling, you can leave it empty.
      
      // Example: log the config object for debugging
      console.log('Cypress config:', config);

      return config; // return the modified config object
    },
    video: true,
    screenshotOnRunFailure: true
    /*viewportHeight: 800,
    viewportWidth: 1280*/
  },
});