# How npm run test Connects to Feature Files

## Configuration Chain

### Step 1: `npm run test` command

```bash
npm run test
```

### Step 2: Executes script from `package.json`

**File:** `package.json`

```json
"scripts": {
  "test": "cucumber-js"   ← This runs when you type: npm run test
}
```

**What it does:** Runs the `cucumber-js` command (Cucumber CLI)

---

### Step 3: Cucumber CLI reads `cucumber.js`

**File:** `cucumber.js`

When you run `cucumber-js` without parameters, it automatically looks for `cucumber.js` in the project root.

This file exports multiple **profiles** (configurations):

```javascript
module.exports = {
  default: {           ← This runs for "npm run test"
    require: ['support/**/*.js', 'steps/**/*.js'],
    paths: ['features/**/*.feature'],  ← ✅ THIS TELLS IT WHICH FEATURE FILES TO RUN
    format: [...],
    parallel: 2
  },
  smoke: { ... },      ← This runs for "npm run test:smoke"
  sanity: { ... },     ← This runs for "npm run test:sanity"
  regression: { ... }, ← This runs for "npm run test:regression"
  positive: { ... },   ← This runs for "npm run test:positive"
  negative: { ... }    ← This runs for "npm run test:negative"
}
```

---

## Configuration Tracing

### For: `npm run test`

```
package.json
    ↓
    "test": "cucumber-js"
    ↓
    Runs Cucumber CLI
    ↓
    Reads: cucumber.js
    ↓
    Uses Profile: "default"
    ↓
    Key Setting: paths: ['features/**/*.feature']
    ↓
    Finds: features/todomvc.feature
    ↓
    Loads Steps: steps/**/*.js → todomvc-steps.js
    ↓
    Loads Hooks: support/**/*.js → hooks.js
    ↓
    Executes: 21 scenarios (all tests)
    ↓
    Generates Report: reports/cucumber-report.html
```

### For: `npm run test:smoke`

```
package.json
    ↓
    "test:smoke": "cucumber-js --tags @smoke"
    ↓
    Runs Cucumber CLI with --tags @smoke flag
    ↓
    Reads: cucumber.js
    ↓
    Uses Profile: "smoke"
    ↓
    Key Settings:
    - paths: ['features/**/*.feature']
    - tags: '@smoke'
    ↓
    Finds: features/todomvc.feature
    ↓
    Filters: Only scenarios with @smoke tag
    ↓
    Executes: 4 scenarios (filtered)
    ↓
    Generates Report: reports/cucumber-report-smoke.html
```

---

## Key Configuration Settings

### `paths` - WHERE to find feature files

```javascript
paths: ['features/**/*.feature']

Explanation:
- features/          ← folder name
- **                 ← recursive (any subfolder)
- .feature           ← file extension

Result: Finds ALL .feature files in features/ folder and subfolders
```

### `require` - WHERE to find step definitions and hooks

```javascript
require: ['support/**/*.js', 'steps/**/*.js']

Explanation:
- support/**/*.js    ← Load hooks.js from support folder
- steps/**/*.js      ← Load step definitions from steps folder

Result: All step definitions and hooks are loaded before running tests
```

### `tags` - WHICH scenarios to run (filtering)

```javascript
tags: '@smoke'

Explanation:
In todomvc.feature, scenarios marked with @smoke tag:

@smoke
Scenario: Add single todo item
  ...

Result: Only runs scenarios tagged with @smoke
```

### `format` - HOW to generate reports

```javascript
format: [
  'progress-bar',                           ← Console output progress bar
  'html:reports/cucumber-report.html',      ← HTML report
  'json:reports/cucumber-report.json'       ← JSON report
]
```

---

## Feature File Tagging

**File:** `features/todomvc.feature`

```gherkin
@todomvc
Feature: TodoMVC Application - Complete Test Suite

  # ✅ Tagged with @smoke, @sanity, @positive, @regression
  @positive @smoke @sanity @regression
  Scenario: Add single todo item
    Given I navigate to the TodoMVC application
    When I add a todo with text "Buy groceries"
    Then I should see the todo "Buy groceries" in the list

  # ✅ Tagged with @positive, @sanity, @regression only (NOT @smoke)
  @positive @sanity @regression
  Scenario: Add multiple todo items
    Given I navigate to the TodoMVC application
    When I add a todo with text "Task 1"
    ...

  # ✅ Tagged with @negative, @sanity, @regression only
  @negative @sanity @regression
  Scenario: Empty todo item should not be added
    Given I navigate to the TodoMVC application
    When I press Enter on empty todo input
    Then the todo list should be empty
```

---

## All npm Commands and What They Run

| Command                   | Script                           | Profile      | Feature Glob            | Filter        | Count            |
| ------------------------- | -------------------------------- | ------------ | ----------------------- | ------------- | ---------------- |
| `npm test`                | `cucumber-js`                    | `default`    | `features/**/*.feature` | (none)        | **21 scenarios** |
| `npm run test:smoke`      | `cucumber-js --tags @smoke`      | `smoke`      | `features/**/*.feature` | `@smoke`      | **4 scenarios**  |
| `npm run test:sanity`     | `cucumber-js --tags @sanity`     | `sanity`     | `features/**/*.feature` | `@sanity`     | **8 scenarios**  |
| `npm run test:regression` | `cucumber-js --tags @regression` | `regression` | `features/**/*.feature` | `@regression` | **21 scenarios** |
| `npm run test:positive`   | `cucumber-js --tags @positive`   | `positive`   | `features/**/*.feature` | `@positive`   | **10 scenarios** |
| `npm run test:negative`   | `cucumber-js --tags @negative`   | `negative`   | `features/**/*.feature` | `@negative`   | **11 scenarios** |

---

## Detailed Example: How `npm run test:smoke` Works

### 1. User Types Command

```bash
npm run test:smoke
```

### 2. npm Looks in package.json

```json
"scripts": {
  "test:smoke": "cucumber-js --tags @smoke"
}
```

Result: Runs `cucumber-js --tags @smoke`

### 3. Cucumber CLI Starts

- Looks for `cucumber.js` in project root
- Found: ✅ `cucumber.js`

### 4. Reads cucumber.js Configuration

```javascript
module.exports = {
  // ... other profiles ...
  smoke: {
    require: ['support/**/*.js', 'steps/**/*.js'],  // Load these first
    paths: ['features/**/*.feature'],                // Find these files
    tags: '@smoke',                                  // Filter by this tag
    format: [...],                                   // Generate reports
    parallel: 2                                      // Run with 2 workers
  }
}
```

### 5. Loads Support & Steps

- **support/hooks.js** - Loads browser Before/After hooks
- **steps/todomvc-steps.js** - Loads all step definitions

### 6. Finds Feature Files

Pattern: `features/**/*.feature`
Result: Finds `features/todomvc.feature`

### 7. Filters by Tag

```gherkin
# In features/todomvc.feature:

@positive @smoke @sanity @regression              ✅ MATCH - Has @smoke
Scenario: Add single todo item

@positive @smoke @sanity @regression              ✅ MATCH - Has @smoke
Scenario: Add multiple todo items

@positive @smoke @sanity @regression              ✅ MATCH - Has @smoke
Scenario: Mark todo as completed

@positive @sanity @regression                     ❌ SKIP - No @smoke
Scenario: Filter Active todos

@negative @sanity @regression                     ❌ SKIP - No @smoke
Scenario: Empty todo item should not be added
```

Result: 4 scenarios selected with @smoke tag

### 8. Executes Tests

- Runs Before hook (browser launch)
- Runs 4 scenarios in parallel (2 workers)
- Runs After hook for each (screenshots if failed, browser close)

### 9. Generates Reports

```
reports/cucumber-report-smoke.html  ✅ Created
reports/cucumber-report-smoke.json  ✅ Created
```

---

## File Relationships

```
package.json
    "test": "cucumber-js"
    └─→ cucumber.js
        ├─ default profile
        ├─ smoke profile
        ├─ sanity profile
        ├─ regression profile
        ├─ positive profile
        └─ negative profile
            ├─ require: support/**/*.js
            │  └─→ support/hooks.js
            │
            ├─ require: steps/**/*.js
            │  └─→ steps/todomvc-steps.js
            │
            └─ paths: features/**/*.feature
               └─→ features/todomvc.feature
```

---

## How to Add New Feature File

1. **Create new file** in `features/` folder

   ```
   features/new-feature.feature
   ```

2. **It will automatically run** with `npm test`
   - Why? Because `paths: ['features/**/*.feature']` matches ANY .feature file

3. **Tag your scenarios** with appropriate tags

   ```gherkin
   @positive @smoke @regression
   Scenario: Some test
   ```

4. **Run specific command** to execute
   ```bash
   npm test              # All scenarios in all features
   npm run test:smoke    # Only @smoke tagged scenarios
   ```

---

## How to Add New Step

1. **Add step definition** to `steps/todomvc-steps.js`

   ```javascript
   Then("I should see {string} text", async function (text) {
     const page = TodoPage.page;
     const element = page.getByText(text);
     const isVisible = await element.isVisible();
     expect(isVisible).toBeTruthy();
   });
   ```

2. **It will automatically be available** in feature files
   - Why? Because `require: ['steps/**/*.js']` loads all step files

3. **Use in feature file**
   ```gherkin
   Then I should see "1 item left" text
   ```

---

## Verification Commands

```bash
# See which profile runs by default
cat cucumber.js

# Check what npm scripts are available
npm run

# Dry run to see which scenarios will run (without executing)
npm run test:smoke -- --dry-run

# Run with detailed output
npm test -- --format pretty

# Run single feature file
cucumber-js features/todomvc.feature

# Run with specific tag
cucumber-js --tags "@smoke and @positive"
```

---

## Summary

| Question                                 | Answer                                                 |
| ---------------------------------------- | ------------------------------------------------------ |
| Where does `npm run test` read config?   | `cucumber.js` (default profile)                        |
| Where does it find feature files?        | `paths: ['features/**/*.feature']`                     |
| Where does it find steps?                | `require: ['steps/**/*.js']`                           |
| Where does it find hooks?                | `require: ['support/**/*.js']`                         |
| How does tagging work?                   | `@tag` in feature file + `tags: '@tag'` in cucumber.js |
| How many scenarios run for each command? | See table above                                        |
| How to run all tests?                    | `npm test` (21 scenarios)                              |
| How to run only smoke tests?             | `npm run test:smoke` (4 scenarios)                     |
