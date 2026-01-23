const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const TodoPage = require('../pages/TodoPage');

// Set timeout for all steps
setDefaultTimeout(30000);

// Hooks
Before(async function() {
  await TodoPage.launchBrowser();
});

After(async function(scenario) {
  // Only take screenshot if scenario failed
  if (scenario.result.status === 'FAILED') {
    try {
      const screenshotPath = await TodoPage.takeScreenshot(`FAILED-${scenario.pickle.name}`);
      console.log(`Failure Screenshot: ${screenshotPath}`);
      // Attach screenshot to report
      this.attach(screenshotPath, 'image/png');
    } catch (error) {
      console.error('Error taking failure screenshot:', error);
    }
  }
  
  await TodoPage.closeBrowser();
});
