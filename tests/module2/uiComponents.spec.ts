import {test} from '@playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

// ****************** Teardown hooks *******************
test.afterEach(async ({page}) => {
    await page.close()
})

// ******************** Test cases *******************
test.describe('Form Layouts page', () => {
    // Test case for basic form layout
    test('', async ({page}) => {
    // Test case implementation goes here
    })
})
