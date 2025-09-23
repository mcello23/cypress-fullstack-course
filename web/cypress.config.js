module.exports = {
  viewportHeight: 1080,
  viewportWidth: 1920,
  retries: {
    experimentalStrategy: 'detect-flake-and-pass-on-threshold',
    experimentalOptions: {
      maxRetries: 2,
      passesRequired: 1,
    },
    runMode: true,
    openMode: false,
  },
  video: true,
  waitForAnimations: true,
  chromeWebSecurity: false,
  e2e: {
    experimentalStudio: true,
    experimentalPromptCommand: true,
    projectId: 'bv1wq1',
    enableScreenshots: true,
    enableVideo: true,
    baseUrl: 'http://localhost:3000',
    experimentalRunAllSpecs: true,
    setupNodeEvents() {},
  },
};
