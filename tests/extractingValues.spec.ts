import {expect, test} from '@playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// ******************** Test cases *******************
test('extract single text value', async ({page}) => {
    const BasicFormcard = page.locator('nb-card').filter({hasText: 'Basic form'})
    const BasicFormCardButtonContent = await BasicFormcard.getByRole('button').textContent()

    // console.log(`BasicFormCardButtonContent: ${BasicFormCardButtonContent}`)
    expect(BasicFormCardButtonContent).toEqual('Submit')
})

test('extract multiple text values', async ({page}) => {
    const UsingTheGridCard = page.locator('nb-card').filter({hasText: 'Using the Grid'})
    const AllRadioButtonContent = await UsingTheGridCard.locator('nb-radio').allTextContents()

    console.log(`UsingTheGridCardRadioGroupContent: ${AllRadioButtonContent}`)

    expect(AllRadioButtonContent).toContain('Option 1')
    expect(AllRadioButtonContent).toContain('Option 2')
    expect(AllRadioButtonContent).toContain('Disabled Option')
    expect(AllRadioButtonContent.length).toBe(3)
    expect(AllRadioButtonContent).not.toContainEqual('Option 1,Option 2,Disabled Option')
})

test('extract input field values', async ({page}) => {
    const BasicFormcard = page.locator('nb-card').filter({hasText: 'Basic form'})
    const EmailInput = BasicFormcard.getByPlaceholder('Email')
    const PasswordInput = BasicFormcard.getByPlaceholder('Password')

    await EmailInput.fill('Raviprasad@gmail.com')
    await PasswordInput.fill('Raviprasad@123')

    const EmailInputValue = await EmailInput.inputValue()
    const PasswordInputValue = await PasswordInput.inputValue()

    expect(EmailInput).toHaveValue('Raviprasad@gmail.com')
    expect(PasswordInput).toHaveValue('Raviprasad@123')
})

// **************** Teardown hooks *******************
test.afterEach(async ({page}) =>{
    await page.close()
})