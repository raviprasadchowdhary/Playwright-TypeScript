import { test } from "@playwright/test"
import { NavigationPage } from "../../pageObjects/NavigationPage"

//******************** Setup hooks *******************
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

//******************** Test cases *******************
test('navigate to forms layout page', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
})