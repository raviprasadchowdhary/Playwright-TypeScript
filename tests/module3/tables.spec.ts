import {expect, test} from '@playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async ({page})=> {
    await page.goto('http://localhost:4200/')
    await page.getByText('Tables & Data').click()
})

// ****************** Teardown hooks *******************

// ******************** Test cases *******************
test.describe('Smart Table', () => {
    test.beforeEach(async ({page}) => {
        page.getByText('Smart Table').click()
    })

    test('Edit a existing record', async ({page}) => {
        const Row = page.getByRole('row', {name: 'twitter@outlook.com'})
        const EditButton = Row.locator('.nb-edit')
        
        await EditButton.click()
        
        var AgeInput = page.locator('input-editor').getByPlaceholder('Age')
        await AgeInput.clear()
        await AgeInput.fill('21')
        await page.locator('.nb-checkmark').click()

        AgeInput = Row.getByPlaceholder('Age')
        // expect(await AgeInput.inputValue()).toEqual('21')

    })
})