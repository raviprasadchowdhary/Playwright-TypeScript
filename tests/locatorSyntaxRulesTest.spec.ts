import {test} from '@playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// ******************* Test cases *******************
test('locator syntax rules', async ({page}) => {
    
    // by tag name
    page.locator('input')
    
    // by id
    page.locator('#inputEmail1')
    
    // by class name
    page.locator('.input-full-width')
    
    // by attribute name
    page.locator('[placeholder]')
    
    // by attribute name and value
    page.locator('[placeholder="Email"]')
    
    // by multiple attributes
    page.locator('[placeholder="Email"][type="email"]')
    
    // by class value
    page.locator('[class="input-full-width size-medium shape-rectangle"]')
    
    // by tag name and attribute with value
    page.locator('input[placeholder="Email"]')
    
    // by tag name, attribute with value, id and class name
    page.locator('input[placeholder="Email"]#inputEmail1.input-full-width')
    
    // by text content
    page.locator('text=Email')
    
    // by text content using regular expression
    page.locator('text=/^Email$/')

    // by xpath (NOT RECOMMENDED, because it is brittle and less readable, but still possible, if needed, e.g. for legacy apps, etc.)
    page.locator('//input[@id="inputEmail1"]')
})

// ******************* Teardown hooks *******************
test.afterEach(async ({page}) => {
    await page.close()
})