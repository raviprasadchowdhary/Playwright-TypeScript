import {expect, test} from '@playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// ****************** Teardown hooks *******************
test.afterEach(async ({page}) => {
    await page.close()
})

// ******************** Test cases *******************
test.describe('Form Layouts page', () => {
    test('input field', async ({page}) => {
        const EmailInput = 'raviprasad@gmail.com'
        const EmailUsingTheGrid = page.locator('nb-card').filter({hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})
        
        await EmailUsingTheGrid.fill(EmailInput)    // filling input field
        expect(await EmailUsingTheGrid.inputValue()).toEqual(EmailInput)  // general assertion

        await EmailUsingTheGrid.clear() // clearing input field
        expect(await EmailUsingTheGrid.inputValue()).toEqual('')  // general assertion
        
        await EmailUsingTheGrid.pressSequentially(EmailInput, {delay: 50})  // typing with delay
        await expect(EmailUsingTheGrid).toHaveValue(EmailInput)    // locator assertion
        })
})
