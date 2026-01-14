import {expect, test} from '@playwright/test'

// ****************** Setup hooks *******************
test.beforeEach(async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
})

// ******************* Test cases *******************
test('auto waiting', async ({page}) => {
    const button = page.getByRole('button', {name: 'Button Triggering AJAX Request'})
    const message = page.locator('.bg-success')
    await button.click()
    
    await message.waitFor({state: 'visible'})
    expect(message).toHaveText('Data loaded with AJAX get request.')
})

test('manual waiting', async ({page}) => {
    const button = page.getByRole('button', {name: 'Button Triggering AJAX Request'})
    const message = page.locator('.bg-success')
    await button.click()
    
    await expect(message).toBeVisible({timeout: 20000})
    await expect(message).toHaveText('Data loaded with AJAX get request.')
})

test('explicit waiting', async ({page}) => {
    const button = page.getByRole('button', {name: 'Button Triggering AJAX Request'})
    const message = page.locator('.bg-success')
    await button.click()
    
    await expect(message).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternative waiting - waitForSelector', async ({page}) => {
    const button = page.getByRole('button', {name: 'Button Triggering AJAX Request'})
    const message = page.locator('.bg-success')
    await button.click()
    
    // wait for element to be visible
    await page.waitForSelector('.bg-success')
    await expect(message).toHaveText('Data loaded with AJAX get request.')
    
})

test('alternative waiting - waitForResponse', async ({page}) => {
    const button = page.getByRole('button', {name: 'Button Triggering AJAX Request'})
    const message = page.locator('.bg-success')
    await button.click()
    
    // wait for element to be visible
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
    await expect(message).toHaveText('Data loaded with AJAX get request.')
    
})

// ****************** Teardown hooks *******************
test.afterEach(async ({page}) => {
    await page.close()
})