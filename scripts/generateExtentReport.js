const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Get profile name from command line or use default
const profile = process.argv[2] || 'default';

// Map profiles to their JSON report files
const profileReports = {
  default: 'cucumber-report.json',
  smoke: 'cucumber-report-smoke.json',
  sanity: 'cucumber-report-sanity.json',
  regression: 'cucumber-report-regression.json',
  positive: 'cucumber-report-positive.json',
  negative: 'cucumber-report-negative.json'
};

const jsonFile = profileReports[profile] || 'cucumber-report.json';
const jsonPath = path.join(__dirname, '../reports', jsonFile);
const htmlReportPath = path.join(__dirname, '../reports', `extent-report-${profile}.html`);

// Check if JSON report exists
if (!fs.existsSync(jsonPath)) {
  console.error(`JSON report not found at: ${jsonPath}`);
  console.error('Run tests first: npm test');
  process.exit(1);
}

// Options for HTML report
const options = {
  theme: 'bootstrap',
  jsonFile: jsonPath,
  output: htmlReportPath,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'Development',
    'Browser': 'Chromium',
    'Platform': process.platform,
    'Parallel Execution': 'Scenarios',
    'Executed': 'Local'
  }
};

try {
  reporter.generate(options);
  console.log(`✅ Extent Report generated successfully!`);
  console.log(`📊 Report Location: ${htmlReportPath}`);
  console.log(`📈 Open in browser: ${path.relative(process.cwd(), htmlReportPath)}`);
} catch (error) {
  console.error('❌ Error generating report:', error.message);
  process.exit(1);
}
