import {expect, test} from 'playwright/test'
import mockedApiResponse from '../../testdata/mockedApiResponse.json'

// ******************* Setup hooks *******************
test.beforeEach(async ({page}) => {
    await page.route('*/**/api/tags', async route => {

        console.log('Route intercepted!')
        await route.fulfill({
            body: JSON.stringify(mockedApiResponse)
        })
    })

    await page.route('*/**/articles*', async route => {
        const response = await route.fetch()
        let responseJson = await response.json()
        responseJson.articles[0].title = "This is test title"
        responseJson.articles[0].description = "This is test description"

        await route.fulfill({
            body: JSON.stringify(responseJson)
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

    test('modify article title and description', async ({page}) => {
        await page.waitForLoadState('networkidle')
        
        // Verify the first article has the modified title and description
        const firstArticleTitle = await page.locator('app-article-list app-article-preview').nth(0).locator('h1').textContent()
        const firstArticleDescription = await page.locator('app-article-list app-article-preview').nth(0).locator('p').textContent()
        expect(firstArticleTitle).toBe('This is test title')
        expect(firstArticleDescription).toBe('This is test description')
        
    })

})