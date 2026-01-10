import {test} from '@playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

// ******************* Test cases *******************
test('user visible locators', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByRole('link', {name: 'Form Layouts'}).click()
    await page.getByPlaceholder('Email').nth(1).fill('Raviprasad@gmail.com')
    await page.getByRole('textbox', {name: 'Password'}).nth(0).fill('Raviprasad@123')
    await page.getByText('Option 2').check()
    await page.getByRole('button', {name: 'Sign in'}).first().click()
} )

// ******************* Teardown hooks *******************
test.afterEach(async ({page}) => {
    await page.close()
})