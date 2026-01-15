import {test} from '@playwright/test'

// ******************* Setup hooks *******************
test.beforeAll(() => {
    // This runs before all tests in the file
})

test.beforeEach(async ({page}) => {
    // This runs before each test in the file
        await page.goto('http://localhost:4200/')
})

// ******************* Test cases *******************
test('navigate to date picker page', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
})

test('navigate to form layouts page', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form layouts').click()
})

// ******************* Nested Test Suite *******************
test.describe('Modal & Overlays Suite', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Modal & Overlays').click()
    })

    test('navigate to dialog page', async ({page}) => {
        await page.getByText('Dialog').click()
    })

    test('navigate to window page', async ({page}) => {
        await page.getByText('Window').click()
    })
})

// ******************* Teardown hooks *******************
test.afterEach(async ({page}) => {
    // This runs after each test in the file
    await page.close()
})

test.afterAll(() => {
    // This runs after all tests in the file
})