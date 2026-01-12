import {test, expect} from '@playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async ({page}) => {
    page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// ******************** Test cases *******************
test('', async ({page}) => {
    const UsingTheGridCard = page.locator('nb-card').filter({hasText: 'Using the Grid'})
    const EmailInput = UsingTheGridCard.getByPlaceholder('Email')
    const PasswordInput = UsingTheGridCard.getByPlaceholder('Password')

    await EmailInput.fill('Raviprasad@gmail.com')
    await PasswordInput.fill('Raviprasad@123')
    await UsingTheGridCard.getByText('Option 2').click()
    await UsingTheGridCard.getByRole('button', {name: 'Sign in'}).click()

    await expect(EmailInput).toHaveValue('Raviprasad@gmail.com')

})

// ******************* Teardown hooks *******************
test.afterEach(async ({page}) =>{
    await page.close()
})