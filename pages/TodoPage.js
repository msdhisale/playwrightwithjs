const { chromium } = require('playwright');

class TodoPage {
  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = 'https://demo.playwright.dev/todomvc/#/';
  }

  // Locators
  todoInput() {
    return this.page.getByRole('textbox', { name: 'What needs to be done?' });
  }

  todoItems() {
    return this.page.getByTestId('todo-item');
  }

  todoByText(text) {
    return this.page.getByRole('listitem').filter({ hasText: text });
  }

  toggleCheckbox(text) {
    return this.todoByText(text).getByLabel('Toggle Todo');
  }

  deleteButton(text) {
    return this.todoByText(text).getByRole('button');
  }

  filterLink(name) {
    return this.page.getByRole('link', { name });
  }

  clearCompletedButton() {
    return this.page.getByRole('button', { name: 'Clear completed' });
  }

  itemsLeftText() {
    return this.page.getByText(/items? left/);
  }

  // Browser Actions
  async launchBrowser() {
    this.browser = await chromium.launch({
      headless: false,
      slowMo: 500
    });
    this.page = await this.browser.newPage();
    await this.page.setViewportSize({ width: 1280, height: 720 });
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async navigateToApp() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(screenshotName) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    // Sanitize screenshot name to remove invalid characters
    const sanitizedName = screenshotName.replace(/[<>:"/\\|?*]/g, '_');
    const screenshotPath = `reports/screenshots/${sanitizedName}-${timestamp}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    return screenshotPath;
  }

  // Todo Actions
  async addTodo(todoText) {
    await this.todoInput().fill(todoText);
    await this.todoInput().press('Enter');
  }

  async completeTodo(todoText) {
    await this.toggleCheckbox(todoText).check();
  }

  async uncompleteTodo(todoText) {
    await this.toggleCheckbox(todoText).uncheck();
  }

  async deleteTodo(todoText) {
    await this.todoByText(todoText).hover();
    await this.deleteButton(todoText).click();
  }

  async filterTodos(filterName) {
    await this.filterLink(filterName).click();
  }

  async clearCompleted() {
    await this.clearCompletedButton().click();
  }

  // Assertions
  async isTodoVisible(todoText) {
    return await this.page.getByText(todoText).isVisible();
  }

  async getTodoCount() {
    const items = await this.todoItems().count();
    return items;
  }

  async isItemsLeftVisible() {
    return await this.itemsLeftText().isVisible();
  }

  async getItemsLeftText() {
    return await this.itemsLeftText().textContent();
  }

  async isClearCompletedVisible() {
    return await this.clearCompletedButton().isVisible();
  }

  async isDeleteButtonVisible(todoText) {
    return await this.deleteButton(todoText).isVisible();
  }

  async isTodoCompleted(todoText) {
    const element = await this.todoByText(todoText).evaluate(el => 
      el.className.includes('completed')
    );
    return element;
  }
}

module.exports = new TodoPage();
