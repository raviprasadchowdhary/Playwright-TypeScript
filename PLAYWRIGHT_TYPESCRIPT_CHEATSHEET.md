# Playwright & TypeScript Cheatsheet

A comprehensive guide covering all Playwright and TypeScript concepts used in this project.

---

## Table of Contents
1. [Setup & Configuration](#setup--configuration)
2. [Locators](#locators)
3. [Actions](#actions)
4. [Assertions](#assertions)
5. [Extracting Values](#extracting-values)
6. [UI Components](#ui-components)
7. [Advanced Interactions](#advanced-interactions)
8. [Waits](#waits)
9. [Test Structure](#test-structure)
10. [Page Object Model](#page-object-model)
11. [TypeScript Tips](#typescript-tips)

---

## Setup & Configuration

### Initial Setup Commands
```bash
# Initialize Playwright project
npm init playwright@latest

# Run all tests
npx playwright test

# Run tests on specific browser
npx playwright test --project=chromium

# Run tests in headed mode (visible browser)
npx playwright test --project=chromium --headed

# Run specific test file
npx playwright test example.spec.ts --project=chromium

# Run tests matching a pattern
npx playwright test -g "has title" --project=chromium

# Show test report
npx playwright show-report

# Run tests with UI mode
npx playwright test --ui

# Run tests with trace
npx playwright test --project=chromium --trace on

# Debug tests
npx playwright test --project=chromium --debug
```

### Test Structure
```typescript
import {test, expect} from '@playwright/test'

// Setup hook - runs before each test
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

// Test case
test('test description', async ({page}) => {
    // test code
})

// Teardown hook - runs after each test
test.afterEach(async ({page}) => {
    await page.close()
})

// Group tests
test.describe('Group Name', () => {
    test.beforeEach(async ({page}) => {
        // nested setup
    })

    test('test 1', async ({page}) => {})
    test('test 2', async ({page}) => {})
})
```

### Test Control
```typescript
// Skip a test
test.skip('test name', async ({page}) => {
    // test code
})

// Run only this test (skip all others)
test.only('test name', async ({page}) => {
    // test code
})
```

---

## Locators

### CSS Selectors (Traditional)
```typescript
// By tag name
page.locator('input')

// By ID
page.locator('#inputEmail1')

// By class name
page.locator('.input-full-width')

// By attribute name
page.locator('[placeholder]')

// By attribute name and value
page.locator('[placeholder="Email"]')

// By multiple attributes
page.locator('[placeholder="Email"][type="email"]')

// By tag + attribute + id + class
page.locator('input[placeholder="Email"]#inputEmail1.input-full-width')

// By text content
page.locator('text=Email')

// By text with regex
page.locator('text=/^Email$/')

// By partial text match
page.locator(':text("Using")')

// By exact text match
page.locator(':text-is("Using the Grid")')

// XPath (NOT RECOMMENDED - use only for legacy apps)
page.locator('//input[@id="inputEmail1"]')
```

### User-Visible Locators (RECOMMENDED)
```typescript
// By text
page.getByText('Forms')

// By role (most reliable)
page.getByRole('link', {name: 'Form Layouts'})
page.getByRole('button', {name: 'Sign in'})
page.getByRole('textbox', {name: 'Email'})
page.getByRole('checkbox', {name: 'Remember me'})
page.getByRole('radio', {name: 'Option 1'})

// By placeholder
page.getByPlaceholder('Email')

// By label
page.getByLabel('Email')

// By title attribute
page.getByTitle('Close')

// By alt text (for images)
page.getByAltText('Profile picture')
```

### Locator Refinement
```typescript
// Select nth element (0-indexed)
page.getByRole('button').nth(0)
page.getByRole('button').first()
page.getByRole('button').last()

// Filter by text
page.locator('nb-card').filter({hasText: 'Using the Grid'})

// Filter by child element
page.locator('nb-card').filter({has: page.locator('nb-radio')})

// Filter with options object
page.locator('nb-card', {hasText: 'Basic form'})
page.locator('nb-card', {has: page.locator('nb-radio')})
```

### Navigating DOM
```typescript
// Child elements - chaining locators
page.locator('nb-card').locator('form').locator('button')
page.locator('nb-card form button')

// Parent element (using XPath)
page.getByText('Using the Grid').locator('..')

// Get all matching elements
const allButtons = await page.getByRole('button').all()
for(const button of allButtons){
    await button.click()
}
```

### Reusing Locators (Best Practice)
```typescript
// Store parent locator
const UsingTheGridCard = page.locator('nb-card').filter({hasText: 'Using the Grid'})

// Reuse for child elements
const EmailInput = UsingTheGridCard.getByPlaceholder('Email')
const PasswordInput = UsingTheGridCard.getByPlaceholder('Password')
await EmailInput.fill('test@gmail.com')
await PasswordInput.fill('password123')
```

---

## Actions

### Navigation
```typescript
// Navigate to URL
await page.goto('https://example.com')

// Go back
await page.goBack()

// Go forward
await page.goForward()

// Reload
await page.reload()
```

### Clicking
```typescript
// Standard click
await page.getByRole('button').click()

// Force click (bypass actionability checks)
await page.getByRole('button').click({force: true})

// Double click
await page.getByRole('button').dblclick()

// Right click
await page.getByRole('button').click({button: 'right'})
```

### Text Input
```typescript
// Fill input field (clears first, then types)
await page.getByPlaceholder('Email').fill('test@gmail.com')

// Type sequentially with delay
await page.getByPlaceholder('Email').pressSequentially('test@gmail.com', {delay: 50})

// Clear input field
await page.getByPlaceholder('Email').clear()

// Press specific keys
await page.getByPlaceholder('Email').press('Enter')
await page.keyboard.press('Escape')
```

### Checkboxes & Radio Buttons
```typescript
// Check checkbox/radio
await page.getByRole('checkbox').check()
await page.getByRole('checkbox').check({force: true})

// Uncheck checkbox
await page.getByRole('checkbox').uncheck()
await page.getByRole('checkbox').uncheck({force: true})

// Click radio button/checkbox
await page.getByText('Option 1').click()
```

### Dropdowns
```typescript
// Click dropdown to open
await page.locator('select').click()

// Select option by text
await page.locator('option').getByText('Option 1').click()

// Select option by value
await page.selectOption('select', 'value1')
```

### Hover
```typescript
// Hover over element
await page.getByRole('button').hover()
```

### Scrolling
```typescript
// Scroll element into view
await element.scrollIntoViewIfNeeded()

// Wait for timeout (NOT RECOMMENDED - use explicit waits)
await page.waitForTimeout(1000)
```

---

## Assertions

### General Assertions (for values)
```typescript
const value = 5

// Equality
expect(value).toEqual(5)
expect(value).toBe(5)
expect(value).not.toEqual(4)

// Comparison
expect(value).toBeGreaterThan(4)
expect(value).toBeLessThan(6)
expect(value).toBeGreaterThanOrEqual(5)
expect(value).toBeLessThanOrEqual(5)

// Boolean
expect(value).toBeTruthy()
expect(value).toBeFalsy()

// Arrays
expect(['Option 1', 'Option 2']).toContain('Option 1')
expect(['Option 1', 'Option 2']).toContainEqual('Option 1')
expect(array.length).toBe(3)
```

### Locator Assertions (auto-retry)
```typescript
const button = page.getByRole('button')

// Text assertions
await expect(button).toHaveText('Submit')           // exact match
await expect(button).toContainText('Sub')           // partial match
await expect(button).not.toHaveText('Cancel')

// Visibility
await expect(button).toBeVisible()
await expect(button).toBeHidden()

// State
await expect(button).toBeEnabled()
await expect(button).toBeDisabled()
await expect(button).toBeChecked()                  // checkbox/radio
await expect(button).not.toBeChecked()

// Count
await expect(button).toHaveCount(1)

// Input value
await expect(input).toHaveValue('test@gmail.com')

// CSS
await expect(element).toHaveCSS('background-color', 'rgb(255, 255, 255)')

// Attribute
await expect(element).toHaveAttribute('placeholder', 'Email')
```

### Soft Assertions (continue on failure)
```typescript
// General soft assertion
expect.soft(value).toEqual(5)

// Locator soft assertion
await expect.soft(button).toBeVisible()
await expect.soft(button).toContainText('Submit')
```

### Custom Timeout
```typescript
// Override default timeout (5 seconds) for specific assertion
await expect(message).toBeVisible({timeout: 20000})
await expect(message).toHaveText('Success', {timeout: 20000})
```

---

## Extracting Values

### Text Content
```typescript
// Single text value
const buttonText = await button.textContent()
console.log(buttonText)
expect(buttonText).toEqual('Submit')

// Multiple text values
const allTexts = await page.locator('nb-radio').allTextContents()
console.log(allTexts)  // ['Option 1', 'Option 2', 'Option 3']
expect(allTexts).toContain('Option 1')
```

### Input Values
```typescript
// Get input field value
const emailValue = await page.getByPlaceholder('Email').inputValue()
expect(emailValue).toEqual('test@gmail.com')

// Better approach - use locator assertion
await expect(page.getByPlaceholder('Email')).toHaveValue('test@gmail.com')
```

### Attributes
```typescript
// Get attribute value
const placeholder = await input.getAttribute('placeholder')
expect(placeholder).toEqual('Email')

// Get aria attribute
const expanded = await element.getAttribute('aria-expanded')
if(expanded === 'false'){
    await element.click()
}
```

### State Checks
```typescript
// Check if checked
const isChecked = await checkbox.isChecked()
expect(isChecked).toBeTruthy()

// Check if visible
const isVisible = await element.isVisible()

// Check if enabled
const isEnabled = await button.isEnabled()
```

---

## UI Components

### Input Fields
```typescript
const input = page.getByPlaceholder('Email')

// Fill
await input.fill('test@gmail.com')

// Clear
await input.clear()

// Type with delay
await input.pressSequentially('test@gmail.com', {delay: 50})

// Verify value
await expect(input).toHaveValue('test@gmail.com')
```

### Radio Buttons
```typescript
const radio1 = page.getByRole('radio', {name: 'Option 1'})
const radio2 = page.getByRole('radio', {name: 'Option 2'})

// Select radio button
await radio1.check({force: true})
await expect(radio1).toBeChecked()
await expect(radio2).not.toBeChecked()

// Check state
const isChecked = await radio1.isChecked()
expect(isChecked).toBeTruthy()
```

### Checkboxes
```typescript
const checkbox = page.getByRole('checkbox', {name: 'Remember me'})

// Check
await checkbox.check({force: true})
await expect(checkbox).toBeChecked()

// Uncheck
await checkbox.uncheck({force: true})
expect(await checkbox.isChecked()).toBeFalsy()

// Check all checkboxes
const allCheckboxes = await page.getByRole('checkbox').all()
for(const cb of allCheckboxes){
    await cb.check({force: true})
}
```

### Dropdowns
```typescript
const dropdown = page.locator('select')
const options = page.locator('option')

// TypeScript iteration with type safety
const colors = {
    'Light': 'rgb(255, 255, 255)',
    'Dark': 'rgb(34, 43, 69)',
    'Cosmic': 'rgb(50, 50, 89)',
    'Corporate': 'rgb(255, 255, 255)'
}

// Option 1: Object.entries (RECOMMENDED)
for(const [colorName, colorValue] of Object.entries(colors)){
    await dropdown.click()
    await options.getByText(colorName).click()
    await expect(header).toHaveCSS('background-color', colorValue)
}

// Option 2: Type assertion
for(const color in colors){
    await dropdown.click()
    await options.getByText(color).click()
    await expect(header).toHaveCSS('background-color', colors[color as keyof typeof colors])
}
```

### Tables
```typescript
// Filter row by text
const row = page.getByRole('row', {name: 'twitter@outlook.com'})
const row2 = page.locator('tbody tr').filter({hasText: 'Mark'})

// Get first/last row
const firstRow = page.locator('tbody tr').first()
const lastRow = page.locator('tbody tr').last()

// Get cell content
const cellText = await row.locator('td').nth(2).textContent()

// Edit row
await row.locator('.nb-edit').click()
await page.getByPlaceholder('Age').fill('21')
await page.locator('.nb-checkmark').click()

// Delete with dialog handling
page.on('dialog', dialog => {
    expect(dialog.message()).toEqual('Are you sure you want to delete?')
    dialog.accept()  // or dialog.dismiss()
})
await row.locator('.nb-trash').click()

// Search/Filter table
await page.getByPlaceholder('Age').fill('20')
const rows = await page.locator('tbody tr').all()
for(const row of rows){
    const age = await row.locator('td').last().textContent()
    expect(age).toEqual('20')
}

// Handle "No data found"
const noData = await page.getByRole('table')
expect(await noData.textContent()).toContain('No data found')
```

### Tooltips
```typescript
const button = page.getByRole('button', {name: 'Top'})
const tooltip = page.locator('nb-tooltip')

// Hover to show tooltip
await button.hover()
const tooltipText = await tooltip.textContent()
expect(tooltipText).toEqual('This is a tooltip')
```

### Datepicker
```typescript
const datepicker = page.getByPlaceholder('Form Picker')
await datepicker.click()

// Select specific day
await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()

// Dynamic date selection
const today = new Date()
const day = today.getDate().toString()
const month = today.toLocaleString('default', {month: 'short'})
const year = today.getFullYear()

await page.locator('.day-cell').getByText(day, {exact: true}).click()
expect(datepicker).toHaveValue(`${month} ${day}, ${year}`)
```

---

## Advanced Interactions

### Drag & Drop

#### Method 1: Using dragTo()
```typescript
const source = page.locator('#draggable')
const target = page.locator('#droppable')

await source.dragTo(target)
```

#### Method 2: Using Mouse Actions
```typescript
await source.hover()
await page.mouse.down()
await target.hover()
await page.mouse.up()
```

### Working with iFrames
```typescript
// Use frameLocator (RECOMMENDED)
const frame = page.frameLocator('iframe')
const element = frame.locator('button')
await element.click()

// More specific iframe selector
const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
const source = frame.locator('li').filter({hasText: 'Item'})
await source.dragTo(frame.locator('#target'))
```

### Slider Manipulation

#### Method 1: Update Coordinates
```typescript
const slider = page.locator('circle')

await slider.evaluate(node => {
    node.setAttribute('cx', '231')
    node.setAttribute('cy', '231')
})
await slider.click()
```

#### Method 2: Mouse Movement
```typescript
const sliderBox = page.locator('.slider')
await sliderBox.scrollIntoViewIfNeeded()

const box = await sliderBox.boundingBox()
if (!box) throw new Error('Element not visible')

const x = box.x + box.width/2
const y = box.y + box.height/2

await page.mouse.move(x, y)
await page.mouse.down()
await page.mouse.move(x - (box.width/2), y)
await page.mouse.move(x - (box.width/2), y + (box.height/2))
await page.mouse.up()
```

### Dialog Handling
```typescript
// Handle confirm/alert dialogs
page.on('dialog', dialog => {
    console.log(dialog.message())
    dialog.accept()      // Click OK/Yes
    // dialog.dismiss()  // Click Cancel/No
})

// Trigger the dialog
await button.click()
```

---

## Waits

### Auto-Waiting (RECOMMENDED)
Playwright automatically waits for elements to be actionable (visible, enabled, stable).

```typescript
// No explicit wait needed - Playwright waits automatically
await page.getByRole('button').click()
await expect(element).toBeVisible()
await expect(element).toHaveText('Success')
```

### Explicit Wait for State
```typescript
const element = page.locator('.message')

// Wait for element to be visible
await element.waitFor({state: 'visible'})

// Wait for element to be hidden
await element.waitFor({state: 'hidden'})

// Wait for element to be attached to DOM
await element.waitFor({state: 'attached'})

// Wait for element to be detached from DOM
await element.waitFor({state: 'detached'})
```

### Wait for Selector
```typescript
// Wait for selector to appear
await page.waitForSelector('.bg-success')

// Wait with timeout
await page.waitForSelector('.bg-success', {timeout: 10000})
```

### Wait for Response
```typescript
// Wait for API response
await page.waitForResponse('**/api/users')

// Wait for specific response
await page.waitForResponse(response => 
    response.url().includes('/api/users') && response.status() === 200
)
```

### Wait for Load State
```typescript
// Wait for page to load completely
await page.waitForLoadState('load')

// Wait for network to be idle
await page.waitForLoadState('networkidle')

// Wait for DOMContentLoaded
await page.waitForLoadState('domcontentloaded')
```

### Timeout (NOT RECOMMENDED - use explicit waits)
```typescript
// Hard wait - use only for debugging
await page.waitForTimeout(1000)
```

### Custom Timeout in Assertions
```typescript
// Override default 5-second timeout
await expect(element).toBeVisible({timeout: 20000})
await expect(element).toHaveText('Success', {timeout: 15000})
```

---

## Test Structure

### Hooks
```typescript
// Runs once before all tests in the file
test.beforeAll(async ({browser}) => {
    // Setup code
})

// Runs before each test
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

// Runs after each test
test.afterEach(async ({page}) => {
    await page.close()
})

// Runs once after all tests in the file
test.afterAll(async ({browser}) => {
    // Cleanup code
})
```

### Grouping Tests
```typescript
test.describe('Group Name', () => {
    test.beforeEach(async ({page}) => {
        // Nested setup for this group
    })

    test('test 1', async ({page}) => {})
    test('test 2', async ({page}) => {})
    
    test.describe('Nested Group', () => {
        test('nested test', async ({page}) => {})
    })
})
```

### Test Annotations
```typescript
// Skip test
test.skip('skip this test', async ({page}) => {})

// Skip conditionally
test.skip(condition, 'skip if condition is true', async ({page}) => {})

// Run only this test
test.only('only this test', async ({page}) => {})

// Mark as failing
test.fail('known failing test', async ({page}) => {})

// Mark as slow (3x timeout)
test.slow('slow test', async ({page}) => {})
```

---

## Page Object Model

### Creating a Page Object
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

### Using Page Objects
```typescript
// tests/usePageObjects.spec.ts
import { test } from "@playwright/test"
import { NavigationPage } from "../pageObjects/NavigationPage"

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to forms layout page', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
})
```

### Benefits of Page Object Model
- **Reusability**: Use same methods across multiple tests
- **Maintainability**: Update locators in one place
- **Readability**: Test code is more descriptive
- **Encapsulation**: Hide implementation details

---

## TypeScript Tips

### Type Safety with Objects
```typescript
// Problem: TypeScript error when iterating objects
const colors = {
    'Light': 'rgb(255, 255, 255)',
    'Dark': 'rgb(34, 43, 69)'
}

// Solution 1: Object.entries (RECOMMENDED)
for(const [colorName, colorValue] of Object.entries(colors)){
    console.log(colorName, colorValue)
}

// Solution 2: Type assertion
for(const color in colors){
    console.log(colors[color as keyof typeof colors])
}

// Solution 3: Object.keys with casting
for(const color of Object.keys(colors) as Array<keyof typeof colors>){
    console.log(colors[color])
}
```

### Async/Await
```typescript
// Always use await for async operations
await page.goto('https://example.com')
await page.getByRole('button').click()
await expect(element).toBeVisible()

// Don't forget await!
await page.waitForTimeout(1000)  // CORRECT
page.waitForTimeout(1000)         // WRONG - missing await
```

### Variable Declaration
```typescript
// const - cannot be reassigned (RECOMMENDED for most cases)
const button = page.getByRole('button')

// let - can be reassigned
let age = 20
age = 30

// var - function-scoped (avoid using)
var AgeInput = page.getByPlaceholder('Age')
AgeInput = page.getByPlaceholder('New Age')
```

### Null/Undefined Checks
```typescript
// Check if element exists
const box = await element.boundingBox()
if (!box) throw new Error('Element not visible')

// Use box safely
const x = box.x + box.width/2
```

### Arrays and Loops
```typescript
// For...of loop (values)
const items = ['item1', 'item2', 'item3']
for(const item of items){
    console.log(item)
}

// For...in loop (keys/indices)
for(const index in items){
    console.log(index, items[index])
}

// forEach
items.forEach(item => console.log(item))

// Get all elements and iterate
const allButtons = await page.getByRole('button').all()
for(const button of allButtons){
    await button.click()
}
```

### String Interpolation
```typescript
// Template literals
const name = 'John'
const age = 30
console.log(`Name: ${name}, Age: ${age}`)

// Multi-line strings
const message = `
    This is a
    multi-line
    string
`
```

---

## Common Patterns & Best Practices

### 1. Use User-Facing Locators
```typescript
// GOOD - user-facing locators
page.getByRole('button', {name: 'Submit'})
page.getByPlaceholder('Email')
page.getByLabel('Password')

// AVOID - CSS selectors
page.locator('#submit-btn')
page.locator('.email-input')
```

### 2. Reuse Locators
```typescript
// GOOD - store and reuse
const card = page.locator('nb-card').filter({hasText: 'Basic form'})
await card.getByPlaceholder('Email').fill('test@gmail.com')
await card.getByPlaceholder('Password').fill('password')
await card.getByRole('button').click()

// AVOID - repeat locator
await page.locator('nb-card').filter({hasText: 'Basic form'}).getByPlaceholder('Email').fill('test@gmail.com')
await page.locator('nb-card').filter({hasText: 'Basic form'}).getByPlaceholder('Password').fill('password')
```

### 3. Use Locator Assertions
```typescript
// GOOD - auto-retry locator assertions
await expect(button).toBeVisible()
await expect(button).toHaveText('Submit')

// AVOID - general assertions with await
expect(await button.textContent()).toEqual('Submit')
```

### 4. Avoid Hard Waits
```typescript
// GOOD - explicit wait
await element.waitFor({state: 'visible'})
await expect(element).toBeVisible({timeout: 10000})

// AVOID - hard wait
await page.waitForTimeout(5000)
```

### 5. Use Page Object Model for Reusability
```typescript
// GOOD - encapsulate in page object
const navigation = new NavigationPage(page)
await navigation.formLayoutsPage()

// AVOID - repeat navigation code
await page.getByText('Forms').click()
await page.getByText('Form Layouts').click()
```

### 6. Handle Dynamic Content
```typescript
// Use exact match for unique text
page.getByText('Submit', {exact: true})

// Use flexible locators for dynamic content
page.getByRole('button').filter({hasText: 'Submit'})
```

### 7. Clean Test Data
```typescript
// Clear inputs before filling
await input.clear()
await input.fill('new value')

// Or use fill() which clears automatically
await input.fill('new value')
```

---

## Debugging Tips

### 1. Use Headed Mode
```bash
npx playwright test --headed
```

### 2. Use Debug Mode
```bash
npx playwright test --debug
```

### 3. Use UI Mode
```bash
npx playwright test --ui
```

### 4. Console Logging
```typescript
console.log('Button text:', await button.textContent())
console.log('Is checked:', await checkbox.isChecked())
```

### 5. Take Screenshots
```typescript
await page.screenshot({path: 'screenshot.png'})
await element.screenshot({path: 'element.png'})
```

### 6. Slow Down Execution
```typescript
// In playwright.config.ts
use: {
    launchOptions: {
        slowMo: 1000  // 1 second delay between actions
    }
}
```

### 7. Pause Test
```typescript
await page.pause()  // Opens Playwright Inspector
```

---

## Quick Reference

### Most Common Locators
| Locator | Example |
|---------|---------|
| Role | `page.getByRole('button', {name: 'Submit'})` |
| Text | `page.getByText('Sign in')` |
| Placeholder | `page.getByPlaceholder('Email')` |
| Label | `page.getByLabel('Password')` |
| Test ID | `page.getByTestId('submit-button')` |

### Most Common Actions
| Action | Example |
|--------|---------|
| Click | `await element.click()` |
| Fill | `await input.fill('value')` |
| Check | `await checkbox.check()` |
| Select | `await dropdown.selectOption('value')` |
| Hover | `await element.hover()` |

### Most Common Assertions
| Assertion | Example |
|-----------|---------|
| Visible | `await expect(element).toBeVisible()` |
| Text | `await expect(element).toHaveText('text')` |
| Value | `await expect(input).toHaveValue('value')` |
| Checked | `await expect(checkbox).toBeChecked()` |
| Enabled | `await expect(button).toBeEnabled()` |

---

## Resources
- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Best Practices](https://playwright.dev/docs/best-practices)
