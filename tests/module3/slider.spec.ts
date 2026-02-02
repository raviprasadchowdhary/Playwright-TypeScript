import {expect, test} from 'playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

// ****************** Teardown hooks *******************
// test.afterEach(async({page}) => {
//     await page.close()
// })

// ******************** Test cases *******************

test.describe('Slider tests', () => {
    test('move slider by updating co-ordinates', async ({page}) => {
        const SliderPointer = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')

        SliderPointer.evaluate(node => {
            node.setAttribute('cx', '231')
            node.setAttribute('cy', '231')
        })

        await SliderPointer.click()

        const SliderBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger [class="value temperature h1"]')
        expect(SliderBox).toContainText('30')
    })
})
