# 🔧 VS Code Setup Guide - Fix "Undefined Steps" Warning

## Problem
When opening feature files in VS Code, steps show as "undefined" even though they are properly defined in `steps/todomvc-steps.js`.

## Solution

### Step 1: Install Required Extensions

Open VS Code and install these extensions:

```
1. Cucumber (Gherkin) Full Support
   ID: cucumber.cucumber-official
   
2. Cucumber Autocomplete
   ID: alexkrechik.cucumberautocomplete
   
3. Playwright Inspector
   ID: ms-playwright.playwright
   
4. Prettier
   ID: esbenp.prettier-vscode
```

**Quick Install:** Paste in VS Code Extensions search, install each one.

### Step 2: Configuration Already Set Up ✅

The project includes `.vscode/settings.json` with proper configuration:

```json
{
  "cucumberautocomplete.steps": [
    "steps/**/*.js"
  ],
  "cucumberautocomplete.syncFeatures": "support/**/*.js",
  "cucumberautocomplete.strictGherkinCompletion": false
}
```

This tells VS Code where to find your step definitions.

### Step 3: Reload VS Code

After installing extensions:
1. Press `Ctrl + Shift + P` (or `Cmd + Shift + P` on Mac)
2. Type: `Developer: Reload Window`
3. Press Enter

### Step 4: Verify Setup

1. Open `features/todomvc.feature`
2. Steps should no longer show as "undefined"
3. You should see autocomplete suggestions when typing

---

## How Step Mapping Works

### Feature File Step
```gherkin
When I add a todo with text "Buy groceries"
```

### Step Definition
```javascript
When('I add a todo with text {string}', async function(todoText) {
  await TodoPage.addTodo(todoText);
});
```

**Mapping:**
- `{string}` in step definition = `"Buy groceries"` in feature file
- The text in quotes is automatically captured as `todoText`
- Both must match exactly

---

## Common Issues & Fixes

### Issue: Steps Still Show as Undefined

**Fix 1:** Restart VS Code
```
Ctrl + Shift + P → Developer: Reload Window
```

**Fix 2:** Check file paths in settings.json
```json
"cucumberautocomplete.steps": [
  "steps/**/*.js"  // Path must be correct
]
```

**Fix 3:** Ensure Cucumber extension is installed
```
View → Extensions → Search "Cucumber Official" → Install
```

### Issue: Autocomplete Not Working

**Fix 1:** Verify extensions installed
```
Ctrl + Shift + X → Search "Cucumber" → Install both extensions
```

**Fix 2:** Check that steps are in `steps/` folder
```
Project structure must have:
steps/
  └─ todomvc-steps.js
```

### Issue: Wrong Step Suggestions

**Fix 1:** Clear VS Code cache
```
Ctrl + Shift + P → "Developer: Reload Window"
```

**Fix 2:** Check step definition syntax
```javascript
// ✅ Correct
When('I add a todo with text {string}', async (text) => {});

// ❌ Wrong
When('I add a todo with text', async () => {});
```

---

## Step Definition Pattern Matching

### String Parameter
```gherkin
When I add a todo with text "Buy groceries"
       ↓
When('I add a todo with text {string}', async (text) => {
  // text = "Buy groceries"
});
```

### Number Parameter
```gherkin
Then I should see "3" items
       ↓
Then('I should see {int} items', async (number) => {
  // number = 3
});
```

### Multiple Parameters
```gherkin
When I perform action "delete" on item "Task 1"
       ↓
When('I perform action {string} on item {string}', async (action, item) => {
  // action = "delete", item = "Task 1"
});
```

---

## Screenshots: Only on Failures ✅

### Configuration
Screenshots are now captured **only when tests fail**, not on every step.

**Before:**
```javascript
Then('I should see the todo {string}', async (text) => {
  expect(isVisible).toBeTruthy();
  const screenshot = await page.screenshot();  // ❌ Always taken
});
```

**After:**
```javascript
// support/hooks.js - After hook runs ONLY on failure
After(async function(scenario) {
  if (scenario.result.status === 'FAILED') {
    const screenshot = await TodoPage.takeScreenshot(`FAILED-${scenario.pickle.name}`);
  }
});
```

### Benefits
✅ Faster test runs (no unnecessary screenshots)  
✅ Smaller storage (only failures captured)  
✅ Cleaner reports (failure focused)  

---

## File Structure

```
PlaywrightwithJS/
├── .vscode/
│   ├── settings.json      ← Step mapping config
│   └── extensions.json    ← Recommended extensions
├── features/
│   └── todomvc.feature    ← Feature files (should not show warnings)
├── steps/
│   └── todomvc-steps.js   ← Step definitions (mapped to features)
└── support/
    └── hooks.js           ← Browser lifecycle + failure screenshots
```

---

## Verification Checklist

- [ ] Installed `cucumber.cucumber-official` extension
- [ ] Installed `alexkrechik.cucumberautocomplete` extension
- [ ] Reloaded VS Code (`Ctrl + Shift + P` → Reload Window)
- [ ] Opened `features/todomvc.feature`
- [ ] Steps no longer show as "undefined"
- [ ] Autocomplete works (type a new step to test)

---

## Running Tests

```bash
# All tests
npm test

# Smoke tests (4 scenarios)
npm run test:smoke

# Sanity tests (8 scenarios)
npm run test:sanity

# Positive tests (10 scenarios)
npm run test:positive

# Negative tests (11 scenarios)
npm run test:negative
```

**Note:** Screenshots are only captured on test failures, not on every step.

---

## Resources

- [Cucumber.js Docs](https://cucumber.io/docs/cucumber/)
- [VS Code Gherkin Extension](https://marketplace.visualstudio.com/items?itemName=cucumber.cucumber-official)
- [Cucumber Autocomplete Extension](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)

---

**Status: ✅ IDE Integration Complete**

All step definitions are now properly mapped and should work seamlessly in VS Code.
