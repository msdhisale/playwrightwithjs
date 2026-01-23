const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const TodoPage = require("../pages/TodoPage");

// Set timeout for all steps
setDefaultTimeout(30000);

// Given Steps
Given("I navigate to the TodoMVC application", async function () {
  await TodoPage.navigateToApp();
});

// When Steps
When("I add a todo with text {string}", async function (todoText) {
  await TodoPage.addTodo(todoText);
});

When("I mark the todo {string} as completed", async function (todoText) {
  await TodoPage.completeTodo(todoText);
});

When("I mark the todo {string} as uncompleted", async function (todoText) {
  await TodoPage.uncompleteTodo(todoText);
});

When("I filter todos by {string}", async function (filterName) {
  await TodoPage.filterTodos(filterName);
});

When("I delete the todo {string}", async function (todoText) {
  await TodoPage.deleteTodo(todoText);
});

When("I click the {string} button", async function (buttonName) {
  if (buttonName === "Clear completed") {
    await TodoPage.clearCompleted();
  }
});

When("I press Enter on empty todo input", async function () {
  await TodoPage.todoInput().press("Enter");
});

// Then Steps
Then("I should see the todo {string} in the list", async function (todoText) {
  const isVisible = await TodoPage.isTodoVisible(todoText);
  expect(isVisible).toBeTruthy();
});

Then(
  "I should not see the todo {string} in the list",
  async function (todoText) {
    const isVisible = await TodoPage.isTodoVisible(todoText);
    expect(isVisible).toBeFalsy();
  },
);

Then("I should see {string} text", async function (expectedText) {
  const page = TodoPage.page;
  const element = page.getByText(expectedText);
  const isVisible = await element.isVisible();
  expect(isVisible).toBeTruthy();
});

Then(
  "the todo {string} should be marked as completed",
  async function (todoText) {
    const isCompleted = await TodoPage.isTodoCompleted(todoText);
    expect(isCompleted).toBeTruthy();
  },
);

Then("the todo list should be empty", async function () {
  const count = await TodoPage.getTodoCount();
  expect(count).toBe(0);
});

Then("there should be no todos in the list", async function () {
  const count = await TodoPage.getTodoCount();
  expect(count).toBe(0);
});

Then("the {string} button should not be visible", async function (buttonName) {
  const isVisible = await TodoPage.isClearCompletedVisible();
  expect(isVisible).toBeFalsy();
});

Then(
  "the delete button for {string} should not be visible",
  async function (todoText) {
    const isVisible = await TodoPage.isDeleteButtonVisible(todoText);
    expect(isVisible).toBeFalsy();
  },
);

Then(
  "the {string} counter should not be visible",
  async function (counterType) {
    const isVisible = await TodoPage.isItemsLeftVisible();
    expect(isVisible).toBeFalsy();
  },
);

Then(
  "I should see {string} todos with text {string}",
  async function (count, todoText) {
    const page = TodoPage.page;
    const elements = await page.getByText(todoText).all();
    expect(elements.length).toBe(parseInt(count));
  },
);
