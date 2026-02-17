# Playwright TypeScript Setup Guide

## Prerequisites

### 1. Install Visual Studio Code
Download and install VS Code from [https://code.visualstudio.com/](https://code.visualstudio.com/)

### 2. Install Node.js
Download and install Node.js (LTS version) from [https://nodejs.org/](https://nodejs.org/)

### 3. Install Playwright Extension in VS Code
- Open VS Code
- Go to Extensions (Ctrl+Shift+X)
- Search for "Playwright Test for VSCode"
- Click Install

## Setting Up the Angular Application Under Test

This project requires a local Angular application to run tests against.

### Clone the Angular Practice Application

```bash
git clone https://github.com/bondar-artem/pw-practice-app.git
```

### Install Dependencies

Open the cloned project in VS Code and run in the terminal:

```bash
npm install --force
```

### Start the Application

Build and start the Angular application:

```bash
npm start
```

The application will be available at: **http://localhost:4200/**

**Important Notes:**
- Keep the terminal running while testing - the application needs to stay active
- If you close the terminal or press `Ctrl+C`, restart with `npm start`
- The application must be running before executing Playwright tests

## Initial Playwright Setup

### For a New Project

To create a new Playwright project with TypeScript:

```bash
npm init playwright@latest
```

This command will:
- Install Playwright and its dependencies
- Create the configuration file `playwright.config.ts`
- Set up the `tests` folder structure
- Install browsers for testing

### For This Existing Project

If you've cloned this repository, install dependencies:

```bash
npm install
```

Then install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

### Run All Tests

Execute all tests across all configured browsers:

```bash
npx playwright test
```

### Run Tests on Specific Browser

Run tests only on Chromium:

```bash
npx playwright test --project=chromium
```

### Run Tests in Headed Mode

See the browser while tests are running:

```bash
npx playwright test --project=chromium --headed
```

### Run Tests with UI Mode

Interactive UI mode for running and debugging tests:

```bash
npx playwright test --ui
```

### Run Tests with Trace

Record traces for debugging:

```bash
npx playwright test --project=chromium --trace on
```

### Debug Tests

Run tests in debug mode with Playwright Inspector:

```bash
npx playwright test --project=chromium --debug
```

### Run Specific Test File

Execute a specific test file:

```bash
npx playwright test example.spec.ts --project=chromium
```

### Run Tests by Name Pattern

Run tests matching a specific name using the `-g` flag:

```bash
npx playwright test -g "has title" --project=chromium
```

## Viewing Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## Test Control

### Skip a Specific Test

Use `test.skip()` to skip a test:

```typescript
test.skip('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
## Project Structure

```
├── playwright.config.ts           # Playwright configuration
├── pageObjects/                   # Page Object Model classes
│   ├── NavigationPage.ts          # Navigation helper methods
│   ├── FormLayoutsPage.ts         # Form layouts page actions
│   └── DatePickerPage.ts          # Datepicker page actions
├── tests/                         # Test files directory
│   ├── module1/                   # Basic locator and assertion tests
│   ├── module2/                   # UI components tests
│   ├── module3/                   # Advanced interactions tests
│   └── pageObjectTests/           # Tests using Page Object Model
│       └── usePageObjects.spec.ts
├── playwright-report/             # Generated HTML reports
└── test-results/                  # Test execution results
```

## Page Object Model

This project uses the Page Object Model (POM) design pattern to organize test code.

### What is Page Object Model?

Page Object Model is a design pattern that:
- Creates an object repository for web elements
- Separates test logic from page-specific code
- Makes tests more maintainable and reusable
- Reduces code duplication

### Example: NavigationPage

```typescript
// pageObjects/NavigationPage.ts
import { Page } from '@playwright/test'

export class NavigationPage {
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async formLayoutsPage(){
        await this.menuItemClick('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async datePickerPage(){
        await this.menuItemClick('Forms')
        await this.page.getByText('Datepicker').click()
    }

    private async menuItemClick(menuItem: string){
        const menuItemElement = this.page.getByTitle(menuItem)
        const currentState = await menuItemElement.getAttribute('aria-expanded')

        if(currentState === 'false'){
            await menuItemElement.click()
        }
    }
}
```

### Using Page Objects in Tests

```typescript
// tests/pageObjectTests/usePageObjects.spec.ts
import { test } from "@playwright/test"
import { NavigationPage } from "../../pageObjects/NavigationPage"

test('navigate to forms layout page', async ({page}) => {
    await page.goto('http://localhost:4200/')
    
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
})
```

### Benefits

- **Reusability**: Use the same page object methods across multiple tests
- **Maintainability**: Update locators in one place when UI changes
- **Readability**: Tests are more descriptive and easier to understand
- **Encapsulation**: Hide implementation details from tests

## Additional Resources
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
```

## Project Structure

```
├── playwright.config.ts      # Playwright configuration
├── tests/                    # Test files directory
│   └── example.spec.ts       # Example test file
├── playwright-report/        # Generated HTML reports
└── test-results/            # Test execution results
```

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
