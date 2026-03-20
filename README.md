# Playwright TypeScript Setup Guide

## Prerequisites

### 1. Install Visual Studio Code
Download and install VS Code from [https://code.visualstudio.com/](https://code.visualstudio.com/)

### 2. Install Node.js
Download and install Node.js (LTS version) from [https://nodejs.org/](https://nodejs.org/)

### 3. Install Playwright Extension in VS Code
- Open VS Code
- Go to Extensions (`Ctrl+Shift+X`)
- Search for **"Playwright Test for VSCode"**
- Click Install

---

## Setting Up the Angular Application Under Test

This project runs tests against a local Angular application.

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

```bash
npm start
```

The application will be available at: **http://localhost:4200/**

> ⚠️ **Important:** Keep the terminal running while testing. If you close the terminal or press `Ctrl+C`, restart with `npm start`.

---

## Setting Up This Playwright Project

### For a New Project

```bash
npm init playwright@latest
```

This command will:
- Install Playwright and its dependencies
- Create the configuration file `playwright.config.ts`
- Set up the `tests` folder structure
- Install browsers for testing

### For This Existing Project (after cloning)

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Tests on Specific Browser
```bash
npx playwright test --project=chromium
```

### Run Tests in Headed Mode
```bash
npx playwright test --project=chromium --headed
```

### Run Tests with UI Mode
```bash
npx playwright test --ui
```

### Run Tests with Trace
```bash
npx playwright test --project=chromium --trace on
```

### Debug Tests
```bash
npx playwright test --project=chromium --debug
```

### Run Specific Test File
```bash
npx playwright test example.spec.ts --project=chromium
```

### Run Tests by Name Pattern
```bash
npx playwright test -g "has title" --project=chromium
```

---

## Viewing Test Reports

```bash
npx playwright show-report
```

---

## Test Control

### Skip a Specific Test

```typescript
test.skip('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
```

### Run Only One Test

```typescript
test.only('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
```

### Override Timeout for a Test

```typescript
test('slow test', async ({ page }) => {
  test.setTimeout(60000) // 60 seconds
  // test code
})
```

---

## Project Structure

```
├── playwright.config.ts              # Playwright configuration
├── pageObjects/                      # Page Object Model classes
│   ├── navigationPage.ts             # Navigation helper methods
│   ├── formLayoutsPage.ts            # Form layouts page actions
│   ├── datePickerPage.ts             # Datepicker page actions
│   ├── helperBase.ts                 # Base class for page objects
│   └── pageManager.ts               # Manages all page objects
├── tests/                            # Test files directory
│   ├── module1/                      # Basic locators and assertions
│   │   ├── locatorSyntaxRulesTest.spec.ts
│   │   ├── userVisibleLocators.spec.ts
│   │   ├── childElements.spec.ts
│   │   ├── parentElements.spec.ts
│   │   ├── reusingLocators.spec.ts
│   │   ├── extractingValues.spec.ts
│   │   ├── assertions.spec.ts
│   │   └── waits.spec.ts
│   ├── module2/                      # UI components tests
│   │   └── uiComponents.spec.ts
│   ├── module3/                      # Advanced interactions tests
│   │   ├── tables.spec.ts
│   │   ├── datepicker.spec.ts
│   │   ├── dragAndDrop.spec.ts
│   │   └── slider.spec.ts
│   ├── pageObjectTests/              # Tests using Page Object Model
│   │   └── usePageObjects.spec.ts
│   └── API/                          # API testing
│       ├── workingWithAPIs.spec.ts   # API mocking tests
│       ├── performApiRequest.spec.ts # Direct API request tests
│       ├── helperFunctions.ts        # Reusable API helper functions
│       └── apiData.ts                # Test data for API tests
├── testdata/                         # Test data files
│   └── mockedApiResponse.json        # Mocked API response data
├── playwright-report/                # Generated HTML reports
└── test-results/                     # Test execution results
```

---

## Page Object Model

This project uses the Page Object Model (POM) design pattern to organize test code.

### What is Page Object Model?

- Creates an object repository for web elements
- Separates test logic from page-specific code
- Makes tests more maintainable and reusable
- Reduces code duplication

### Example: NavigationPage

```typescript
// pageObjects/navigationPage.ts
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
import { test } from "@playwright/test"
import { NavigationPage } from "../../pageObjects/navigationPage"

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to forms layout page', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
})
```

### Benefits

- **Reusability**: Use the same page object methods across multiple tests
- **Maintainability**: Update locators in one place when UI changes
- **Readability**: Tests are more descriptive and easier to understand
- **Encapsulation**: Hide implementation details from tests

---

## API Testing

This project includes API tests using Playwright's `request` fixture.

### API Mocking

Intercept and mock API responses using `page.route()`:

```typescript
// Mock a GET request - return custom response
await page.route('*/**/api/tags', async route => {
    await route.fulfill({
        body: JSON.stringify({ tags: ['Automation', 'Playwright'] })
    })
})

// Modify an actual API response
await page.route('*/**/articles*', async route => {
    const response = await route.fetch()
    let json = await response.json()
    json.articles[0].title = "Modified Title"
    await route.fulfill({ body: JSON.stringify(json) })
})
```

### Direct API Requests

Use the `request` fixture to make API calls directly:

```typescript
test('API test', async ({request}) => {
    const response = await request.post('/api/users/login', {
        data: { user: { email: 'test@test.com', password: 'password' } }
    })
    const body = await response.json()
    expect(response.status()).toBe(200)
})
```

---

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Testing](https://playwright.dev/docs/api-testing)
