# Fix for "Undefined Steps" Warning in VS Code

## Changes Applied

### 1. Updated `.vscode/settings.json`

Added comprehensive Cucumber settings for both the official Cucumber extension and the Autocomplete extension:

```json
{
  "cucumber.codeLens": true,
  "cucumber.features": ["features/**/*.feature"],
  "cucumber.glue": ["steps/**/*.js", "support/**/*.js"],
  "cucumberautocomplete.steps": ["steps/**/*.js"],
  "cucumberautocomplete.syncFeatures": "steps/**/*.js"
}
```

**Key Settings:**

- `cucumber.glue` - Points Cucumber extension to step definitions
- `cucumber.features` - Points to feature files
- `cucumberautocomplete.steps` - Enables autocomplete for steps
- `cucumberautocomplete.syncFeatures` - Syncs feature file steps with definitions

### 2. Created `.vscode/cucumber.json`

Provides explicit configuration for the Cucumber extension:

```json
{
  "features": ["features/**/*.feature"],
  "glue": ["steps/**/*.js", "support/**/*.js"]
}
```

### 3. Created `.vscode/launch.json`

Allows debugging and running tests directly from VS Code:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Run Cucumber Tests",
  "program": "${workspaceFolder}/node_modules/.bin/cucumber-js",
  "args": [
    "--require",
    "support/**/*.js",
    "--require",
    "steps/**/*.js",
    "features/**/*.feature"
  ]
}
```

### 4. Created `.cucumberrc.json`

Root-level Cucumber configuration file recognized by Cucumber CLI:

```json
{
  "default": {
    "features": ["features/**/*.feature"],
    "glue": ["steps/**/*.js", "support/**/*.js"]
  }
}
```

### 5. Created `.cucumber`

Alternative configuration format for Cucumber CLI:

```
features: features/**/*.feature
glue: steps/**/*.js,support/**/*.js
```

### 6. Fixed `steps/todomvc-steps.js`

Removed the incorrect export statement at the end:

```javascript
// ❌ REMOVED:
module.exports = { Given, When, Then };

// ✅ Reason: Cucumber functions register themselves, no export needed
```

---

## Step Definitions Verification

All feature file steps are properly defined in `steps/todomvc-steps.js`:

### Given Steps

```javascript
Given("I navigate to the TodoMVC application", async function () {
  await TodoPage.navigateToApp();
});
```

### When Steps

```javascript
When("I add a todo with text {string}", async function (todoText) {
  await TodoPage.addTodo(todoText);
});

When("I mark the todo {string} as completed", async function (todoText) {
  await TodoPage.completeTodo(todoText);
});

When("I filter todos by {string}", async function (filterName) {
  await TodoPage.filterTodos(filterName);
});
```

### Then Steps

```javascript
Then("I should see the todo {string} in the list", async function (todoText) {
  const isVisible = await TodoPage.isTodoVisible(todoText);
  expect(isVisible).toBeTruthy();
});

Then("I should see {string} text", async function (expectedText) {
  const page = TodoPage.page;
  const element = page.getByText(expectedText);
  const isVisible = await element.isVisible();
  expect(isVisible).toBeTruthy();
});
```

---

## Steps to Complete

1. **Close VS Code completely**

   ```
   Alt + F4 (or close all windows)
   ```

2. **Reopen the workspace folder**

   ```
   File → Open Folder → c:\Users\hp\PlaywrightwithJS
   ```

3. **Open the feature file**

   ```
   features/todomvc.feature
   ```

4. **Verify the steps are recognized**
   - ✅ No red underlines on steps
   - ✅ No "undefined steps" warning
   - ✅ Hover over steps shows their definition

---

## Project Structure

```
PlaywrightwithJS/
├── .vscode/
│   ├── settings.json          ✅ Updated with Cucumber settings
│   ├── extensions.json         ✅ Recommended extensions
│   ├── cucumber.json           ✅ NEW - Cucumber config
│   └── launch.json             ✅ NEW - Debug config
├── .cucumber                   ✅ NEW - CLI config
├── .cucumberrc.json            ✅ NEW - Root config
├── cucumber.js                 ✅ Existing - Cucumber profiles
├── features/
│   └── todomvc.feature         ✅ Feature file with 21 scenarios
├── steps/
│   └── todomvc-steps.js        ✅ Fixed - Removed incorrect export
├── support/
│   └── hooks.js                ✅ Hooks for browser lifecycle
├── pages/
│   └── TodoPage.js             ✅ Page Object Model
└── package.json                ✅ Dependencies
```

---

## Troubleshooting

### Still showing "Undefined Steps"?

**Try 1: Clear VS Code Cache**

```
Ctrl + Shift + P → Developer: Reload Window
```

**Try 2: Reinstall Extensions**

```
Ctrl + Shift + X → Uninstall "Cucumber Autocomplete"
Ctrl + Shift + X → Install "Cucumber Autocomplete"
Reload VS Code
```

**Try 3: Clear Extension Cache**

- Windows: Delete `%APPDATA%\Code\User\workspaceStorage`
- Close and reopen VS Code

**Try 4: Verify File Paths**
Run in terminal:

```powershell
Get-ChildItem -Path "c:\Users\hp\PlaywrightwithJS\steps" -Filter "*.js"
Get-ChildItem -Path "c:\Users\hp\PlaywrightwithJS\features" -Filter "*.feature"
```

Expected output:

```
todomvc-steps.js       ✓
todomvc.feature        ✓
```

---

## How VS Code Extension Finds Steps

1. **Reads .vscode/settings.json**
   - Looks for `cucumberautocomplete.steps` setting
   - Finds: `steps/**/*.js`

2. **Searches for files matching pattern**
   - Pattern: `steps/**/*.js`
   - Finds: `steps/todomvc-steps.js`

3. **Parses JavaScript file for step definitions**
   - Looks for: `Given(`, `When(`, `Then(`
   - Extracts: All step patterns

4. **Matches feature file steps to definitions**
   - Feature: `I add a todo with text "Buy groceries"`
   - Step def: `I add a todo with text {string}`
   - Result: ✅ Match found

---

## Verification Command

Run this to verify everything is connected:

```bash
npm run test:smoke
```

Expected output:

```
✅ 4 scenarios (4 passed)
✅ 25 steps (25 passed)
✅ 0m17.746s execution time
```

If tests pass, the step definitions are correctly wired!

---

## Configuration Files Summary

| File                     | Purpose                  | Status      |
| ------------------------ | ------------------------ | ----------- |
| `.vscode/settings.json`  | IDE configuration        | ✅ Updated  |
| `.vscode/cucumber.json`  | Explicit Cucumber config | ✅ NEW      |
| `.vscode/launch.json`    | Debug configuration      | ✅ NEW      |
| `cucumber.js`            | Test execution profiles  | ✅ Existing |
| `.cucumberrc.json`       | Root Cucumber config     | ✅ NEW      |
| `.cucumber`              | CLI config (alternative) | ✅ NEW      |
| `steps/todomvc-steps.js` | Step definitions         | ✅ Fixed    |
| `support/hooks.js`       | Browser lifecycle        | ✅ Existing |

All configuration layers now point to the same step definitions source!
