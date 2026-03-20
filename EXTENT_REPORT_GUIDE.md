# 📊 Extent Report Integration Guide

## Overview

Extent Reports provides rich, interactive HTML reports with advanced analytics and visualization for your Cucumber BDD tests. It offers better UI/UX compared to standard Cucumber reports and includes detailed metrics for each test scenario.

---

## ✅ Installation Complete

The following has been added to your project:

### 📦 New Dependencies

- `cucumber-html-reporter` - Generates enhanced HTML reports from Cucumber JSON output

### 📄 New Files

- `scripts/generateExtentReport.js` - Extent report generator
- `RUN_TESTS_WITH_EXTENT_REPORT.bat` - Convenient batch script for Windows

### 🔄 Updated Files

- `package.json` - New npm scripts for Extent report generation

---

## 🚀 Usage

### Option 1: Generate Report by Profile (Recommended)

**Generate Extent report for all tests:**

```bash
npm test
npm run report:extent
```

**Generate Extent report for specific profile:**

```bash
npm run test:smoke && npm run report:extent:smoke
npm run test:sanity && npm run report:extent:sanity
npm run test:positive && npm run report:extent:positive
npm run test:negative && npm run report:extent:negative
npm run test:regression && npm run report:extent:regression
```

### Option 2: One-Command Execution (Windows)

**Run entire test suite + Extent report in one command:**

```bash
RUN_TESTS_WITH_EXTENT_REPORT.bat
```

**Run specific profile + Extent report:**

```bash
RUN_TESTS_WITH_EXTENT_REPORT.bat smoke
RUN_TESTS_WITH_EXTENT_REPORT.bat sanity
RUN_TESTS_WITH_EXTENT_REPORT.bat positive
RUN_TESTS_WITH_EXTENT_REPORT.bat negative
RUN_TESTS_WITH_EXTENT_REPORT.bat regression
```

---

## 📍 Report Locations

After generating Extent reports, find them in the `reports/` directory:

```
reports/
├── extent-report.html              # All tests
├── extent-report-smoke.html        # Smoke tests
├── extent-report-sanity.html       # Sanity tests
├── extent-report-positive.html     # Positive tests
├── extent-report-negative.html     # Negative tests
├── extent-report-regression.html   # Regression tests
├── cucumber-report.html            # Original Cucumber reports (still available)
├── cucumber-report.json            # JSON format
└── screenshots/                    # Test screenshots
```

---

## 📊 Report Features

### Dashboard

- **Total Test Summary**: Pass/Fail/Skip counts and percentages
- **Test Execution Timeline**: Start time, duration, and status
- **Test Statistics**: Pie charts and bar graphs

### Scenario Details

- **Step-by-step execution**: Each Given/When/Then step with status
- **Execution time**: Duration for each step
- **Status indicators**: ✅ Pass, ❌ Fail, ⊘ Skipped
- **Error messages**: Full stack traces for failed steps

### Screenshots

- **Failure screenshots**: Auto-captured on test failure
- **Visual evidence**: Embedded in report for quick debugging
- **Test flow**: Screenshots show application state during test

### Logs & Metadata

- **Execution metadata**: Browser, platform, environment info
- **Test timestamps**: When tests started and completed
- **Execution mode**: Parallel execution information

---

## 🎬 Workflow Examples

### Daily Smoke Test Verification

```bash
# Run quick smoke tests
npm run test:smoke

# Generate interactive Extent report
npm run report:extent:smoke

# View report in browser
start reports/extent-report-smoke.html
```

### Complete Regression Testing

```bash
# Run full regression suite
npm run test:regression

# Generate comprehensive Extent report
npm run report:extent:regression

# View results
start reports/extent-report-regression.html
```

### CI/CD Integration

```bash
# In your CI/CD pipeline:
npm run test                    # Run all tests
npm run report:extent          # Generate Extent report
npm run report                  # Generate PDF report
# Upload reports as artifacts
```

---

## 🛠 Quick Commands Reference

| Command                          | Purpose                | Time     |
| -------------------------------- | ---------------------- | -------- |
| `npm run test:smoke`             | Quick smoke tests      | ~20-30s  |
| `npm run report:extent:smoke`    | Smoke Extent report    | ~5s      |
| `npm run test:sanity`            | Sanity tests           | ~1 min   |
| `npm run report:extent:sanity`   | Sanity Extent report   | ~5s      |
| `npm test`                       | Full regression suite  | ~2-3 min |
| `npm run report:extent`          | Full Extent report     | ~5s      |
| `npm run test:positive`          | Positive tests only    | ~1.5 min |
| `npm run report:extent:positive` | Positive Extent report | ~5s      |
| `npm run test:negative`          | Negative tests only    | ~1.5 min |
| `npm run report:extent:negative` | Negative Extent report | ~5s      |

---

## 📈 Report Data Captured

Each Extent report includes:

```
✓ Test Execution Summary
  - Total scenarios and steps
  - Pass/Fail/Skip percentages
  - Total execution time

✓ Scenario Metrics
  - Scenario name and tags
  - Start and end time
  - Execution duration
  - Status (Pass/Fail)

✓ Step Details
  - Step type (Given/When/Then)
  - Step description
  - Execution time
  - Status

✓ Environmental Data
  - App Version
  - Test Environment
  - Browser Used
  - Platform (Windows/Mac/Linux)
  - Execution Mode

✓ Failure Information
  - Error messages
  - Stack traces
  - Screenshots at failure point
```

---

## 🔍 Viewing Reports

### Open in Browser

**Windows PowerShell:**

```powershell
Start-Process "reports/extent-report-smoke.html"
```

**Windows Command Prompt:**

```cmd
start reports\extent-report-smoke.html
```

**Git Bash / Mac / Linux:**

```bash
open reports/extent-report-smoke.html
# or
xdg-open reports/extent-report-smoke.html
```

---

## 📝 Script Configuration

The extent report generator (`generateExtentReport.js`) is configured with:

```javascript
{
  theme: 'bootstrap',           // Clean, modern UI
  reportSuiteAsScenarios: true, // Shows each scenario separately
  scenarioTimestamp: true,      // Timestamps for each scenario
  metadata: {                   // Test environment info
    'App Version': '1.0.0',
    'Test Environment': 'Development',
    'Browser': 'Chromium',
    'Platform': process.platform,
    'Parallel Execution': 'Scenarios',
    'Executed': 'Local'
  }
}
```

---

## ✨ Benefits Over Standard Cucumber Reports

| Feature           | Standard Report | Extent Report       |
| ----------------- | --------------- | ------------------- |
| UI/UX             | Basic           | Modern, Interactive |
| Dashboard         | Limited         | Comprehensive       |
| Charts & Graphs   | ❌              | ✅                  |
| Search Filter     | ❌              | ✅                  |
| Export Options    | JSON/HTML       | HTML, Excel, etc    |
| Mobile Friendly   | No              | Yes                 |
| Timeline View     | No              | Yes                 |
| Screenshot Viewer | Basic           | Advanced            |

---

## 🐛 Troubleshooting

### Report Not Generated

**Error:** `JSON report not found`
**Solution:** Run tests first before generating report

```bash
npm run test:smoke
npm run report:extent:smoke
```

### Blank or Incomplete Report

**Cause:** Tests failed or no JSON data
**Solution:** Check `reports/cucumber-report-smoke.json` exists with data

```bash
cat reports/cucumber-report-smoke.json | more
```

### Script Not Found

**Error:** `generateExtentReport not found`
**Solution:** Ensure you're in project root directory

```bash
cd C:\Users\hp\PlaywrightwithJS
npm run report:extent:smoke
```

### Multiple Report Files

**Keep latest reports:** Previous reports are preserved
**Clean old reports:** Delete `.html` files in `reports/` before running tests

---

## 📚 Additional Resources

- [Cucumber HTML Reporter](https://github.com/cucumber/cucumber-js)
- [Playwright Documentation](https://playwright.dev)
- [Cucumber BDD Guide](https://cucumber.io/docs/gherkin/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

---

## 🎯 Next Steps

1. ✅ Run your first Extent report: `npm run test:smoke && npm run report:extent:smoke`
2. ✅ Open the report in your browser: `reports/extent-report-smoke.html`
3. ✅ Explore the dashboard and metrics
4. ✅ Integrate into your CI/CD pipeline
5. ✅ Share reports with your team

---

Happy Testing! 🚀
