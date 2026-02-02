import {expect, test} from 'playwright/test';

// ******************* Setup hooks *******************
test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
})

// ****************** Teardown hooks *******************

// ******************** Test cases *******************
test.describe('Datepicker tests', () => {
    test('click on datepicker and select a date', async({page}) => {
        const DatepickerInput = page.getByPlaceholder('Form Picker')
        await DatepickerInput.click()

        const Activeday = page.locator('[class="day-cell ng-star-inserted"]')
        await Activeday.getByText('1', {exact: true}).click()

        const CurrentDate = new Date()
        const CurrentYear = CurrentDate.getFullYear()
        const CurrentMonth = CurrentDate.toLocaleString('default', {month: 'short'})
        expect(DatepickerInput).toHaveValue('' + CurrentMonth + ' 1, ' + CurrentYear)
    })

    test('', async ({page}) => {
        const DatepickerInput = page.getByPlaceholder('Form Picker')
        await DatepickerInput.click()

        let date = new Date()
        const ExpectedDate = date.getDate().toString()

        await page.locator('[class="day-cell ng-star-inserted"]').getByText(ExpectedDate, {exact: true}).click()
        expect(DatepickerInput).toHaveValue(ExpectedDate)
    })

})
