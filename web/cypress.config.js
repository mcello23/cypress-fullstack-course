module.exports = {
  e2e: {
    experimentalStudio: true,
    experimentalPromptCommand: true,
    projectId: 'bv1wq1',
    enableScreenshots: true,
    enableVideo: true,
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1920,
    viewportHeight: 1080,
    experimentalRunAllSpecs: true,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
};
