import {expect, test} from '@playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// ******************* Test cases *******************
test('general assertions', async ({page}) => {
    const value = 5
    // General assertions
    expect(value).toBeGreaterThan(4)
    expect(value).toBeLessThan(6)
    expect(value).toBeGreaterThanOrEqual(5)
    expect(value).toBeLessThanOrEqual(5)
    expect(value).toEqual(5)
    expect(value).not.toEqual(4)

    // hard assertions
    expect(value).toBe(5)
    expect(value).not.toBe(4)
})

test('locator assertions', async ({page}) => {
    const BasicFormcard = page.locator('nb-card').filter({hasText: 'Basic form'})
    const BasicFormCardButton = BasicFormcard.getByRole('button')
    // Locator assertions
    await expect(BasicFormCardButton).toContainText('Submit')
    await expect(BasicFormCardButton).toBeVisible()
    await expect(BasicFormCardButton).toBeEnabled()
    await expect(BasicFormCardButton).toHaveCount(1)

    // Negative locator assertions
    await expect(BasicFormCardButton).not.toHaveText('Cancel')

})

test('soft assertions', async ({page}) => {
    const value = 5
    // soft assertions
    // general soft assertions
    // expect.soft(value).toBeGreaterThan(5)
    // expect.soft(value).toBeLessThan(5)
    expect.soft(value).toEqual(5)
    // expect.soft(value).not.toEqual(5)
    expect.soft(value).toBe(5)

    // locator soft assertions
    const BasicFormcard = page.locator('nb-card').filter({hasText: 'Basic form'})
    const BasicFormCardButton = BasicFormcard.getByRole('button')
    // await expect.soft(BasicFormCardButton).toContainText('Submit1')
    await expect.soft(BasicFormCardButton).toBeVisible()
    // await expect.soft(BasicFormCardButton).toBeDisabled()
    await expect.soft(BasicFormCardButton).toHaveCount(1)
})

// ****************** Teardown hooks *******************
test.afterEach(async ({page}) => {
    await page.close()
})