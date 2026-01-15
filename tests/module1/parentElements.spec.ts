import {test} from '@playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// ****************** Test cases *********************
test('Using the Grid Scenario1', async ({page}) => {
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByPlaceholder('Email').fill('Raviprasad@gmail.com')
    await page.locator('nb-card', {has: page.locator('nb-radio')}).getByRole('textbox', {name: 'Password'}).fill('Ravi@123')
    
    await page.locator('nb-card').filter({hasText: 'Using the Grid'}).getByText('Option 1').click()
    await page.locator('nb-card').filter({has: page.locator('nb-radio')}).getByRole('button', {name: 'Sign in'}).click()

    await page.getByText('Using the Grid').locator('..').getByRole('textbox', {name: 'Email'}).clear()
})

// ******************* Teardown hooks *******************
test.afterEach(async ({page}) => {
    await page.close()
})