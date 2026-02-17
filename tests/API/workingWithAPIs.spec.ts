import {expect, test} from 'playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async ({page}) => {
    await page.goto('https://conduit.bondaracademy.com/')
})

// ****************** Teardown hooks *******************
// test.afterEach(async ({page}) => {
//     await page.close()
// })

// ******************** Test cases *******************
test.describe('working with APIs', () => {
    test('should display the correct brand logo text', async ({page}) => {
        const brandLogoText = await page.locator('.navbar-brand').textContent()
        expect(brandLogoText).toBe('conduit')
    })

    
})