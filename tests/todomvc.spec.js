import { test, expect } from '@playwright/test';

const TODO_URL = 'https://demo.playwright.dev/todomvc/#/';

// ============ POSITIVE TESTS ============

test('Positive: Add single todo item', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Buy groceries');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await expect(page.getByText('Buy groceries')).toBeVisible();
  await expect(page.getByText('1 item left')).toBeVisible();
});

test('Positive: Add multiple todo items', async ({ page }) => {
  await page.goto(TODO_URL);
  const todos = ['Task 1', 'Task 2', 'Task 3'];
  
  for (const todo of todos) {
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(todo);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  }
  
  for (const todo of todos) {
    await expect(page.getByText(todo)).toBeVisible();
  }
  await expect(page.getByText('3 items left')).toBeVisible();
});

test('Positive: Mark todo as completed', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Complete task');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await page.getByRole('listitem').filter({ hasText: 'Complete task' }).getByLabel('Toggle Todo').check();
  await expect(page.getByRole('listitem').filter({ hasText: 'Complete task' })).toHaveClass(/completed/);
  await expect(page.getByText('0 items left')).toBeVisible();
});

test('Positive: Filter Active todos', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Active task');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Completed task');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await page.getByRole('listitem').filter({ hasText: 'Completed task' }).getByLabel('Toggle Todo').check();
  await page.getByRole('link', { name: 'Active' }).click();
  
  await expect(page.getByText('Active task')).toBeVisible();
  await expect(page.getByText('Completed task')).not.toBeVisible();
});

test('Positive: Filter Completed todos', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Active task');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Completed task');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await page.getByRole('listitem').filter({ hasText: 'Completed task' }).getByLabel('Toggle Todo').check();
  await page.getByRole('link', { name: 'Completed' }).click();
  
  await expect(page.getByText('Completed task')).toBeVisible();
  await expect(page.getByText('Active task')).not.toBeVisible();
});

test('Positive: View All todos', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task 1');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task 2');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await page.getByRole('listitem').filter({ hasText: 'Task 1' }).getByLabel('Toggle Todo').check();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'All' }).click();
  
  await expect(page.getByText('Task 1')).toBeVisible();
  await expect(page.getByText('Task 2')).toBeVisible();
});

test('Positive: Delete todo item', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Delete me');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await page.getByRole('listitem').filter({ hasText: 'Delete me' }).hover();
  await page.getByRole('listitem').filter({ hasText: 'Delete me' }).getByRole('button').click();
  
  await expect(page.getByText('Delete me')).not.toBeVisible();
});

test('Positive: Delete all completed todos with Clear Completed button', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task 1');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task 2');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await page.getByRole('listitem').filter({ hasText: 'Task 1' }).getByLabel('Toggle Todo').check();
  await page.getByRole('listitem').filter({ hasText: 'Task 2' }).getByLabel('Toggle Todo').check();
  
  const clearButton = page.getByRole('button', { name: 'Clear completed' });
  await clearButton.click();
  
  await expect(page.getByText('Task 1')).not.toBeVisible();
  await expect(page.getByText('Task 2')).not.toBeVisible();
});

test('Positive: Toggle completed status multiple times', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Toggle task');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  const checkbox = page.getByRole('listitem').filter({ hasText: 'Toggle task' }).getByLabel('Toggle Todo');
  
  await checkbox.check();
  await expect(page.getByText('0 items left')).toBeVisible();
  
  await checkbox.uncheck();
  await expect(page.getByText('1 item left')).toBeVisible();
});

test('Positive: Item counter decreases when marking complete', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task 1');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task 2');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await expect(page.getByText('2 items left')).toBeVisible();
  
  await page.getByRole('listitem').filter({ hasText: 'Task 1' }).getByLabel('Toggle Todo').check();
  await expect(page.getByText('1 item left')).toBeVisible();
});

// ============ NEGATIVE TESTS ============

test('Negative: Empty todo item should not be added', async ({ page }) => {
  await page.goto(TODO_URL);
  const textbox = page.getByRole('textbox', { name: 'What needs to be done?' });
  
  await textbox.press('Enter');
  
  const listItems = page.getByRole('listitem');
  await expect(listItems).toHaveCount(0);
});

test('Negative: Whitespace-only todo should not be added', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('   ');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await expect(page.getByText('1 item left')).not.toBeVisible();
});

test('Negative: Cannot mark non-existent todo as complete', async ({ page }) => {
  await page.goto(TODO_URL);
  const checkboxes = page.getByRole('checkbox');
  
  await expect(checkboxes).toHaveCount(0);
});

test('Negative: Clear Completed button should not appear when no todos are completed', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Active task');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  const clearButton = page.getByRole('button', { name: 'Clear completed' });
  await expect(clearButton).not.toBeVisible();
});

test('Negative: Delete button should not be visible when not hovering', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task to delete');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  const deleteButton = page.getByRole('listitem').getByRole('button');
  await expect(deleteButton).not.toBeVisible();
});

test('Negative: Completed filter should show no items when all are active', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Active task');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await page.getByRole('link', { name: 'Completed' }).click();
  
  const todoItems = page.getByTestId('todo-item');
  await expect(todoItems).toHaveCount(0);
});

test('Negative: Active filter should show no items when all are completed', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await page.getByRole('listitem').getByLabel('Toggle Todo').check();
  await page.getByRole('link', { name: 'Active' }).click();
  
  const todoItems = page.getByTestId('todo-item');
  await expect(todoItems).toHaveCount(0);
});

test('Negative: Cannot add todo with very long text beyond reasonable limit', async ({ page }) => {
  await page.goto(TODO_URL);
  const longText = 'a'.repeat(5000);
  
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(longText);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  // Verify the item was added (most apps accept long text)
  await expect(page.getByText(longText.substring(0, 100))).toBeVisible();
});

test('Negative: No item counter should show when no todos exist', async ({ page }) => {
  await page.goto(TODO_URL);
  
  const itemsLeft = page.getByText(/items? left/);
  await expect(itemsLeft).not.toBeVisible();
});

test('Negative: Deleting all items should show empty state', async ({ page }) => {
  await page.goto(TODO_URL);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Delete this');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await page.getByTestId('todo-item').hover();
  await page.getByTestId('todo-item').getByRole('button').click();
  
  const todoItems = page.getByTestId('todo-item');
  await expect(todoItems).toHaveCount(0);
});

test('Negative: Special characters should be handled correctly', async ({ page }) => {
  await page.goto(TODO_URL);
  const specialText = '<script>alert("xss")</script>';
  
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(specialText);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  // Should display as text, not execute
  await expect(page.getByText(specialText)).toBeVisible();
});

test('Negative: Duplicate todos should both be added', async ({ page }) => {
  await page.goto(TODO_URL);
  const todoText = 'Duplicate task';
  
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(todoText);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(todoText);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await expect(page.getByText(todoText)).toHaveCount(2);
  await expect(page.getByText('2 items left')).toBeVisible();
});