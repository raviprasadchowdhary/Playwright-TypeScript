import { test } from "@playwright/test"
import { NavigationPage } from "../../pageObjects/NavigationPage"
import { FormLayoutsPage } from "../../pageObjects/formLayoutsPage"
import { DatePickerPage } from "../../pageObjects/datePickerPage"
import { PageManager } from "../../pageObjects/pageManager"

//******************** Setup hooks *******************
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

//******************* Teardown hooks *******************
// test.afterEach(async ({ page }) => {
//     await page.close()
// })

//******************** Test cases *******************
test('navigate to forms layout page', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await page.waitForTimeout(1000)
    await navigateTo.datePickerPage()
    await page.waitForTimeout(1000)
    await navigateTo.tostrPage()
    await page.waitForTimeout(1000)
    await navigateTo.smartTablePage()
})

test('parameterized test - using the grid', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFromLayoutsPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFromLayoutsPage.submitusingTheGridWithEmailPassworsAndRadios('tset@test.com', 'password123', 'Option 2')
})

test('parameterized test - inline form', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFromLayoutsPage = new FormLayoutsPage(page)
    await navigateTo.formLayoutsPage()
    await onFromLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('Raviprasad Chowdhary', 'Test@gmail.com', true)
})

test('parameterized test - Common Datepicker', async ({page}) => {
    test.setTimeout(60000)
    const navigateTo = new NavigationPage(page)
    const onDatePickerPage = new DatePickerPage(page)

    await navigateTo.datePickerPage()
    await onDatePickerPage.selectCommonDatepickerToADateFromToday(105)
})

test('parameterized test - Datepicker With Range', async ({page}) => {
    test.setTimeout(60000)
    const navigateTo = new NavigationPage(page)
    const onDatePickerPage = new DatePickerPage(page)

    await navigateTo.datePickerPage()
    await onDatePickerPage.selectDatepickerWithRangeFromAndToADateFromToday(101, 121)
})

test('navigate to forms layout page - using page manager', async ({page}) => {
    const pageManager = new PageManager(page)
    await pageManager.navigateTo().formLayoutsPage(); await pageManager.onFormLayoutsPage().waitForNumberofSeconds(1)
    await pageManager.navigateTo().datePickerPage(); await page.waitForTimeout(1000)
    await pageManager.navigateTo().tostrPage(); await page.waitForTimeout(1000)
    await pageManager.navigateTo().smartTablePage(); await page.waitForTimeout(1000)
})

test('parameterized test - using the grid - using page manager', async ({page}) => {
    const pageManager = new PageManager(page)
    await pageManager.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutsPage().submitusingTheGridWithEmailPassworsAndRadios('tset@test.com', 'password123', 'Option 2')
})

test('parameterized test - inline form - using page manager', async ({page}) => {
    const pageManager = new PageManager(page)
    await pageManager.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('Raviprasad Chowdhary', 'Test@gmail.com', true)
})