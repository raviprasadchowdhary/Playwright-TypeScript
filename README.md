# Playwright TypeScript Setup Guide

## Initial Setup

To create a new Playwright project with TypeScript:

```bash
npm init playwright@latest
```

This command will:
- Install Playwright and its dependencies
- Create the configuration file `playwright.config.ts`
- Set up the `tests` folder structure
- Install browsers for testing

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
});
```

### Run Only One Test

Use `test.only()` to run a single test and skip all others:

```typescript
test.only('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

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
