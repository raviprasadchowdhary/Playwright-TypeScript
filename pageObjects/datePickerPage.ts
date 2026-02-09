import { expect, Page } from "@playwright/test";

export class DatePickerPage{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async selectCommonDatepickerToADateFromToday(daysFromToday: number){
        const inputField = this.page.locator('nb-card').filter({hasText: 'Common Datepicker'}).locator('input')
        await inputField.click()
        await this.selectFutureDateIncalendar(daysFromToday)
        // Wait for the input field to have the expected value
        await this.page.waitForTimeout(500) // Small wait for datepicker to close and update
        const inputFiledValue = await inputField.inputValue(); console.log(`inputFiledValue: ${inputFiledValue}`)
    }

    async selectDatepickerWithRangeFromAndToADateFromToday(startDateDaysFromToday: number, endDateDaysFromToday: number){
        const inputField = this.page.locator('nb-card').filter({hasText: 'Datepicker With Range'}).locator('input')
        await inputField.click()
        await this.selectFutureDateIncalendar(startDateDaysFromToday)
        await this.selectFutureDateIncalendar(endDateDaysFromToday)
        
    }

    private async selectFutureDateIncalendar(daysFromToday: number){
        const currentDate = new Date(); console.log(`currentDate: ${currentDate}`)
        const targetDate = currentDate.setDate(currentDate.getDate() + daysFromToday); console.log(`targetDate: ${new Date(targetDate)}`)
        
        //here we need to extract month, day, year from targetDate 
        const targetMonth = new Date(targetDate).toLocaleString('default', {month: 'short'}); console.log(`targetMonth: ${targetMonth}`)
        const targetMonthFull = new Date(targetDate).toLocaleString('default', {month: 'long'}).toUpperCase(); console.log(`targetMonthFull: ${targetMonthFull}`)
        const targetDay = new Date(targetDate).getDate(); console.log(`targetDay: ${targetDay}`)
        const targetYear = new Date(targetDate).getFullYear(); console.log(`targetYear: ${targetYear}`)
        const dateToSelect = `${targetMonth} ${targetDay}, ${targetYear}`; console.log(`dateToSelect: ${dateToSelect}`)

        // navigate to target month and year
        let currentCalendarMonthYear = await this.page.locator('nb-card nb-card-header nb-calendar-view-mode button').textContent(); console.log(`currentCalendarMonthYear: ${currentCalendarMonthYear}`)
        const targetMonthYear = `${targetMonthFull} ${targetYear}`; console.log(`targetMonthYear: ${targetMonthYear}`)

        while(!currentCalendarMonthYear?.toUpperCase().includes(targetMonthYear)){
            await this.page.locator('button [ng-reflect-icon="chevron-right-outline"]').click()
            await this.page.waitForTimeout(50)
            currentCalendarMonthYear = await this.page.locator('nb-card nb-card-header nb-calendar-view-mode button').textContent(); console.log(`currentCalendarMonthYear after click: ${currentCalendarMonthYear}`)
        }
        
        console.log(`Found target month/year: ${currentCalendarMonthYear}`)

        await this.page.locator('nb-calendar-picker').getByText(targetDay.toString(), {exact: true}).click()
    }
}