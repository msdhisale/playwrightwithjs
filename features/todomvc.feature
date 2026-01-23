@todomvc
Feature: TodoMVC Application - Complete Test Suite
  As a user
  I want to manage my todo items
  So that I can organize my tasks

  # ============ POSITIVE TESTS - SMOKE ============
  @positive @smoke @sanity @regression
  Scenario: Add single todo item
    Given I navigate to the TodoMVC application
    When I add a todo with text "Buy groceries"
    Then I should see the todo "Buy groceries" in the list
    And I should see "1 item left" text

  @positive @smoke @sanity @regression
  Scenario: Add multiple todo items
    Given I navigate to the TodoMVC application
    When I add a todo with text "Task 1"
    And I add a todo with text "Task 2"
    And I add a todo with text "Task 3"
    Then I should see the todo "Task 1" in the list
    And I should see the todo "Task 2" in the list
    And I should see the todo "Task 3" in the list
    And I should see "3 items left" text

  @positive @smoke @sanity @regression
  Scenario: Mark todo as completed
    Given I navigate to the TodoMVC application
    When I add a todo with text "Complete task"
    And I mark the todo "Complete task" as completed
    Then the todo "Complete task" should be marked as completed
    And I should see "0 items left" text

  @positive @sanity @regression
  Scenario: Filter Active todos
    Given I navigate to the TodoMVC application
    When I add a todo with text "Active task"
    And I add a todo with text "Completed task"
    And I mark the todo "Completed task" as completed
    And I filter todos by "Active"
    Then I should see the todo "Active task" in the list
    And I should not see the todo "Completed task" in the list

  @positive @sanity @regression
  Scenario: Filter Completed todos
    Given I navigate to the TodoMVC application
    When I add a todo with text "Active task"
    And I add a todo with text "Completed task"
    And I mark the todo "Completed task" as completed
    And I filter todos by "Completed"
    Then I should see the todo "Completed task" in the list
    And I should not see the todo "Active task" in the list

  @positive @smoke @sanity @regression
  Scenario: View All todos
    Given I navigate to the TodoMVC application
    When I add a todo with text "Task 1"
    And I add a todo with text "Task 2"
    And I mark the todo "Task 1" as completed
    And I filter todos by "Active"
    And I filter todos by "All"
    Then I should see the todo "Task 1" in the list
    And I should see the todo "Task 2" in the list

  @positive @sanity @regression
  Scenario: Delete single todo item
    Given I navigate to the TodoMVC application
    When I add a todo with text "Delete me"
    And I delete the todo "Delete me"
    Then I should not see the todo "Delete me" in the list

  @positive @regression
  Scenario: Delete all completed todos with Clear Completed button
    Given I navigate to the TodoMVC application
    When I add a todo with text "Task 1"
    And I add a todo with text "Task 2"
    And I mark the todo "Task 1" as completed
    And I mark the todo "Task 2" as completed
    And I click the "Clear completed" button
    Then I should not see the todo "Task 1" in the list
    And I should not see the todo "Task 2" in the list

  @positive @sanity @regression
  Scenario: Toggle completed status multiple times
    Given I navigate to the TodoMVC application
    When I add a todo with text "Toggle task"
    And I mark the todo "Toggle task" as completed
    Then I should see "0 items left" text
    When I mark the todo "Toggle task" as uncompleted
    Then I should see "1 item left" text

  @positive @regression
  Scenario: Item counter decreases when marking complete
    Given I navigate to the TodoMVC application
    When I add a todo with text "Task 1"
    And I add a todo with text "Task 2"
    Then I should see "2 items left" text
    When I mark the todo "Task 1" as completed
    Then I should see "1 item left" text

  # ============ NEGATIVE TESTS ============
  @negative @sanity @regression
  Scenario: Empty todo item should not be added
    Given I navigate to the TodoMVC application
    When I press Enter on empty todo input
    Then the todo list should be empty

  @negative @regression
  Scenario: Whitespace-only todo should not be added
    Given I navigate to the TodoMVC application
    When I add a todo with text "   "
    Then the todo list should be empty

  @negative @regression
  Scenario: Cannot mark non-existent todo as complete
    Given I navigate to the TodoMVC application
    Then there should be no todos in the list

  @negative @regression
  Scenario: Clear Completed button should not appear when no todos are completed
    Given I navigate to the TodoMVC application
    When I add a todo with text "Active task"
    Then the "Clear completed" button should not be visible

  @negative @regression
  Scenario: Delete button should not be visible when not hovering
    Given I navigate to the TodoMVC application
    When I add a todo with text "Task to delete"
    Then the delete button for "Task to delete" should not be visible

  @negative @regression
  Scenario: Completed filter should show no items when all are active
    Given I navigate to the TodoMVC application
    When I add a todo with text "Active task"
    And I filter todos by "Completed"
    Then the todo list should be empty

  @negative @regression
  Scenario: Active filter should show no items when all are completed
    Given I navigate to the TodoMVC application
    When I add a todo with text "Task"
    And I mark the todo "Task" as completed
    And I filter todos by "Active"
    Then the todo list should be empty

  @negative @regression
  Scenario: No item counter should show when no todos exist
    Given I navigate to the TodoMVC application
    Then the "items left" counter should not be visible

  @negative @regression
  Scenario: Deleting all items should show empty state
    Given I navigate to the TodoMVC application
    When I add a todo with text "Delete this"
    And I delete the todo "Delete this"
    Then the todo list should be empty

  @negative @regression
  Scenario: Special characters should be handled correctly
    Given I navigate to the TodoMVC application
    When I add a todo with text "<script>alert('xss')</script>"
    Then I should see the todo "<script>alert('xss')</script>" in the list

  @negative @regression
  Scenario: Duplicate todos should both be added
    Given I navigate to the TodoMVC application
    When I add a todo with text "Duplicate task"
    And I add a todo with text "Duplicate task"
    Then I should see "2" todos with text "Duplicate task"
    And I should see "2 items left" text
