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
    

    test('move slider by mouse movement', async ({page}) => {
        const SliderBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
        await SliderBox.scrollIntoViewIfNeeded()

        const Box = await SliderBox.boundingBox()
        if (!Box) throw new Error('Element not visible')
        const x = Box.x + Box.width/2
        const y = Box.y + Box.height/2

        await page.mouse.move(x, y)
        await page.mouse.down()
        await page.mouse.move(x - (Box.width/2), y)
        await page.mouse.move(x - (Box.width/2), y+(Box.height/2))
        await page.mouse.up()

        expect(SliderBox).toContainText('12')
    })
})
