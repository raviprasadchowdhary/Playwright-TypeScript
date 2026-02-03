import { test } from "@playwright/test"
import { NavigateTo } from "../../pageObjects/NavigationPage"

//******************** Setup hooks *******************
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

//******************** Test cases *******************
test('navigate to forms layout page', async ({page}) => {
    const navigateTo = new NavigateTo(page)
    await navigateTo.formLayoutsPage()
})