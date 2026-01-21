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

    })

    test('get row based on specific value in a column', async ({page}) => {
        const Pagination2 = page.locator('ng2-smart-table-pager').getByText('2')
        await Pagination2.click()
        const Row = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})
        const EditButton = Row.locator('ng2-st-tbody-edit-delete .nb-edit')
        await EditButton.click()
        const Firstname = page.locator('input-editor').getByPlaceholder('First Name')
        await Firstname.clear()
        await Firstname.fill('UpdatedName')
        const SaveButton = page.locator('.nb-checkmark')
        await SaveButton.click()
        
        expect(await Row.locator('td').nth(2).textContent()).toBe('UpdatedName')
    })

    test('search', async ({page}) => {
        const SearchAgeInput = page.locator('input-filter').getByPlaceholder('Age')
        await SearchAgeInput.fill('20')

        const rowCount = await page.getByRole('row').count()
        console.log(`rowCount: ${rowCount}`)
    })
})