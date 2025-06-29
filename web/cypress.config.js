module.exports = {
  e2e: {
    projectId: 'bv1wq1',
    enableScreenshots: true,
    enableVideo: true,
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1920,
    viewportHeight: 1080,
    experimentalRunAllSpecs: true,
    setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--force-device-scale-factor=1.5'); // 150% zoom
          // or use --zoom-factor=1.5
        }
        return launchOptions;
      });
    },
  },
};
