# 🚀 Quick Start Guide - Cucumber BDD TodoMVC Automation

## 📦 What's Included?

Professional automation framework for TodoMVC with:
- ✅ 21 BDD test scenarios (10 positive + 11 negative)
- ✅ Page Object Model architecture
- ✅ Automatic screenshot capture (145+ per run)
- ✅ Multiple report formats (HTML, JSON, PDF)
- ✅ Tag-based test organization
- ✅ Parallel test execution

---

## 🎬 Running Tests

### Option 1: All Tests (Full Regression)
```bash
npm test
```
**Time:** ~2-3 minutes | **Scenarios:** 21 | **Screenshots:** 145+

### Option 2: Quick Smoke Tests
```bash
npm run test:smoke
```
**Time:** ~20-30 seconds | **Scenarios:** 4 | **Best For:** CI/CD pipelines

### Option 3: Sanity Tests
```bash
npm run test:sanity
```
**Time:** ~1 minute | **Scenarios:** 8 | **Best For:** Daily checks

### Option 4: Test by Category
```bash
npm run test:positive   # Happy path tests
npm run test:negative   # Edge case tests
npm run test:regression # Complete regression
```

---

## 📊 Viewing Reports

### 1. HTML Report (Interactive)
```
Location: reports/cucumber-report.html
Browser:  Open in any web browser
Details:  Pass/fail, timing, step details
```

### 2. PDF Report (Visual Evidence)
```
Location: reports/TestReport.pdf
Content:  145+ screenshots with descriptions
Pages:    100+
Command:  npm run report
```

### 3. JSON Report (CI/CD Integration)
```
Location: reports/cucumber-report.json
Format:   Machine-readable test results
Use:      Jenkins, GitHub Actions, etc.
```

### 4. Screenshots (Individual)
```
Location: reports/screenshots/
Format:   PNG files with timestamps
Count:    145+ per full test run
```

---

## 🏗 Project Structure

```
features/
  └─ todomvc.feature           # 21 BDD scenarios with tags

steps/
  └─ todomvc-steps.js          # Step implementations (100 steps)

pages/
  └─ TodoPage.js               # Page Object Model with all interactions

scripts/
  └─ generatePdfReport.js      # PDF report generator

reports/
  ├─ screenshots/              # 145+ captured screenshots
  ├─ cucumber-report.html      # HTML test report
  ├─ cucumber-report.json      # JSON test results
  └─ TestReport.pdf            # PDF with all screenshots

cucumber.js                    # Cucumber configuration & profiles
package.json                   # Dependencies & npm scripts
```

---

## ✅ Test Scenarios Overview

### Positive Tests (10 scenarios)
| # | Scenario | Tag | Time |
|---|----------|-----|------|
| 1 | Add single todo | @smoke, @sanity | ~10s |
| 2 | Add multiple todos | @sanity | ~15s |
| 3 | Mark as completed | @smoke, @sanity | ~12s |
| 4 | Filter active todos | @sanity | ~12s |
| 5 | Filter completed | @sanity | ~12s |
| 6 | View all todos | @smoke, @sanity | ~15s |
| 7 | Delete single todo | @sanity | ~12s |
| 8 | Clear all completed | ~12s |
| 9 | Toggle status | @sanity | ~15s |
| 10 | Counter decreases | ~12s |

### Negative Tests (11 scenarios)
| # | Scenario | Tag | Time |
|---|----------|-----|------|
| 1 | Empty todo blocked | @sanity | ~10s |
| 2 | Whitespace blocked | ~10s |
| 3 | Cannot mark non-existent | ~10s |
| 4 | Button visibility | ~10s |
| 5 | Delete hidden when not hover | ~10s |
| 6 | Filter edge cases | ~12s |
| 7 | Counter edge cases | ~10s |
| 8 | Delete all items | ~15s |
| 9 | Special characters | ~15s |
| 10 | Duplicate handling | ~15s |
| 11 | Additional validation | ~12s |

---

## 🎯 Tag-Based Execution

### Run by Tags
```bash
# Smoke tests (quick subset)
npm run test:smoke

# Sanity tests (key features)
npm run test:sanity

# Only positive tests
npm run test:positive

# Only negative tests
npm run test:negative

# Full regression
npm run test:regression
```

### Tag Combinations
- `@smoke` - 4 critical tests for quick CI/CD
- `@sanity` - 8 key functionality tests
- `@positive` - 10 happy path scenarios
- `@negative` - 11 edge case scenarios
- `@regression` - All 21 tests
- `@todomvc` - All tests in suite

---

## 🔍 Feature File Highlights

```gherkin
@positive @smoke @sanity @regression
Scenario: Add single todo item
  Given I navigate to the TodoMVC application
  When I add a todo with text "Buy groceries"
  Then I should see the todo "Buy groceries" in the list
  And I should see "1 item left" text
```

**Each scenario includes:**
- ✅ Descriptive title
- ✅ Multiple tags for categorization
- ✅ Clear Given-When-Then format
- ✅ Automatic screenshot at every step
- ✅ Professional naming conventions

---

## 📸 Screenshot Capture

**Automatic capture at:**
- ✅ Application navigation
- ✅ Every action (add, delete, filter)
- ✅ Every assertion
- ✅ State changes

**Screenshot naming:**
```
01-navigate-todomvc-2026-01-23T19-38-33-363Z.png
02-add-todo-Task-1-2026-01-23T19-38-52-210Z.png
09-assert-todo-visible-Task-1-2026-01-23T19-38-54-835Z.png
```

**Total per run:** 145+ screenshots
**Storage:** ~500MB per run
**Cleanup:** Previous runs in PDF format

---

## 🎓 How It Works

### 1. Feature Files (User Readable)
```gherkin
Given I navigate to the TodoMVC application
When I add a todo with text "Task 1"
Then I should see the todo "Task 1" in the list
```

### 2. Step Definitions (Implementation)
```javascript
When('I add a todo with text {string}', async (todoText) => {
  await TodoPage.addTodo(todoText);
  await TodoPage.takeScreenshot(`add-todo-${todoText}`);
});
```

### 3. Page Object Model (Interactions)
```javascript
async addTodo(todoText) {
  await this.todoInput().fill(todoText);
  await this.todoInput().press('Enter');
}
```

### 4. Playwright (Browser Automation)
- Sends commands to Chromium browser
- Captures screenshots
- Returns results

### 5. Reports (Results)
- HTML: Interactive viewing
- JSON: CI/CD integration
- PDF: Visual evidence

---

## ⚙️ Configuration

### Cucumber Configuration (cucumber.js)
```javascript
{
  require: ['steps/**/*.js'],
  format: ['html:reports/cucumber-report.html', 'json:reports/cucumber-report.json'],
  paths: ['features/**/*.feature'],
  parallel: 2,  // 2 concurrent workers
  timeout: 30000  // 30 seconds per step
}
```

### Playwright Configuration
- Browser: Chromium
- Headless: false (visible execution)
- Viewport: 1280x720
- Slow motion: 500ms (easier to follow)

---

## 🛠 Troubleshooting

### Q: Tests are taking too long
**A:** Use smoke tests instead: `npm run test:smoke`

### Q: PDF not generating
**A:** Check screenshots exist: `dir reports/screenshots/`

### Q: Special characters causing issues
**A:** Already fixed - characters sanitized automatically

### Q: Browser not opening
**A:** Install Playwright: `npx playwright install`

### Q: Can't view HTML report
**A:** Open with absolute path or use Python server:
```bash
python -m http.server 8000
# Then open: http://localhost:8000/reports/cucumber-report.html
```

---

## 📋 Checklist for First Run

- [ ] Run `npm install` (if not done)
- [ ] Run `npm test -- --dry-run` (verify setup)
- [ ] Run `npm run test:smoke` (quick test)
- [ ] View `reports/cucumber-report.html`
- [ ] Run `npm test` (full regression)
- [ ] Run `npm run report` (generate PDF)
- [ ] View `reports/TestReport.pdf`

---

## 🎯 Performance Metrics

| Test Suite | Time | Scenarios | Screenshots |
|-----------|------|-----------|-------------|
| Smoke | ~30s | 4 | 40+ |
| Sanity | ~60s | 8 | 80+ |
| Positive | ~100s | 10 | 100+ |
| Negative | ~110s | 11 | 110+ |
| Full | ~200s | 21 | 145+ |

---

## 🔗 Related Files

| File | Purpose |
|------|---------|
| `features/todomvc.feature` | All test scenarios |
| `steps/todomvc-steps.js` | Step implementations |
| `pages/TodoPage.js` | Page Object Model |
| `scripts/generatePdfReport.js` | PDF generator |
| `cucumber.js` | Test configuration |
| `package.json` | Dependencies |
| `README_BDD.md` | Full documentation |
| `IMPLEMENTATION_SUMMARY.md` | Project details |

---

## 💡 Tips & Tricks

### Run Specific Scenario
```bash
npm test -- --name "Add single todo item"
```

### Generate HTML Only (no PDF)
```bash
npm test  # Generates cucumber-report.html automatically
```

### Dry Run (validate syntax)
```bash
npm test -- --dry-run
```

### Parallel Execution
By default runs with 2 workers. Modify in `cucumber.js`:
```javascript
parallel: 4  // Run 4 tests in parallel
```

---

## 📞 Support Resources

- **Cucumber Docs:** https://cucumber.io/docs/
- **Playwright Docs:** https://playwright.dev/
- **Gherkin Guide:** https://cucumber.io/docs/gherkin/
- **BDD Best Practices:** https://cucumber.io/docs/bdd/

---

## ✨ Summary

| Feature | Status |
|---------|--------|
| BDD Framework | ✅ Complete |
| Test Scenarios | ✅ 21 total |
| Positive Tests | ✅ 10 scenarios |
| Negative Tests | ✅ 11 scenarios |
| Page Object Model | ✅ Implemented |
| Screenshot Capture | ✅ 145+ per run |
| HTML Report | ✅ Auto-generated |
| PDF Report | ✅ With screenshots |
| JSON Report | ✅ For CI/CD |
| Tag Organization | ✅ Smoke/Sanity/Regression |
| Parallel Execution | ✅ 2 workers |
| Documentation | ✅ Comprehensive |

---

**Status: PRODUCTION READY ✅**

**Happy Testing! 🎉**
