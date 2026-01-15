import {test} from '@playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// ******************** Test cases *******************
test('child elements locator', async ({page}) => {
    await page.getByLabel('Email').nth(0).fill('Raviprasad@gmail.com')
    await page.getByLabel('Password').nth(0).fill('Raviprasad@123')
    await page.locator('nb-card form nb-radio-group :text("Option 2")').click()
    await page.locator('nb-card').locator('form').locator('nb-radio-group').getByText('Option 1').click()
    await page.locator('nb-card').nth(1).getByRole('button', {name: 'Sign in'}).click()
})

// ******************* Teardown hooks *******************
test.afterEach(async ({page}) =>{
    await page.close()
})