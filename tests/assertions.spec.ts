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

// ****************** Teardown hooks *******************
test.afterEach(async ({page}) => {
    await page.close()
})