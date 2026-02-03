import {test} from 'playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')
})

// ****************** Teardown hooks *******************
// test.afterEach(async({page}) => {
//     await page.close()
// })

// ******************** Test cases *******************
test.describe('drag & drop', () => {
    test('drag & drop in iFrame with dragTo', async ({page}) => {
        const Frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
        const Source = Frame.locator('li').filter({hasText: 'High Tatras 2'})
        const Target = Frame.locator('#trash')

        await Source.dragTo(Target)
    })
})