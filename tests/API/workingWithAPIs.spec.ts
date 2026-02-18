import {expect, test} from 'playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async ({page}) => {
    await page.route('*/**/api/tags', async route => {
        const mockedApiResponse = {
            "tags": [
                "Automation",
                "Playwright",
                "Raviprasad"
            ]
        }
        console.log('Route intercepted!')
        await route.fulfill({
            body: JSON.stringify(mockedApiResponse)
        })
    })
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

    test('should display mocked tags', async ({page}) => {
        await page.waitForTimeout(1000)
        
        // Get all tags
        const tagElements = page.locator('.tag-list .tag-pill')
        const tagCount = await tagElements.count()
        console.log(`Number of tags: ${tagCount}`)
        
        const allTags = await tagElements.allTextContents()
        console.log(`All tags: ${allTags}`)
        
        // Trim spaces and verify mocked tags are present
        const allTagsTrimmed = allTags.map(tag => tag.trim())
        expect(allTagsTrimmed).toContain('Automation')
        expect(allTagsTrimmed).toContain('Playwright')
        expect(allTagsTrimmed).toContain('Raviprasad')
    })


})