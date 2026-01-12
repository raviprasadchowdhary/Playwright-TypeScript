import {expect, test} from '@playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// ******************** Test cases *******************
test('single test value', async ({page}) => {
    const BasicFormcard = page.locator('nb-card').filter({hasText: 'Basic form'})
    const BasicFormCardButtonContent = await BasicFormcard.getByRole('button').textContent()

    // console.log(`BasicFormCardButtonContent: ${BasicFormCardButtonContent}`)
    expect(BasicFormCardButtonContent).toEqual('Submit')
})

// **************** Teardown hooks *******************
test.afterEach(async ({page}) =>{
    await page.close()
})