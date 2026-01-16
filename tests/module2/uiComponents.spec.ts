import {expect, test} from '@playwright/test'

// ******************* Setup hooks *******************
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

// ****************** Teardown hooks *******************
test.afterEach(async ({page}) => {
    await page.close()
})

// ******************** Test cases *******************
test.describe('Form Layouts page', () => {
    
    test.beforeEach(async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    })
    
        test('input field', async ({page}) => {
        const EmailInput = 'raviprasad@gmail.com'
        const EmailUsingTheGrid = page.locator('nb-card').filter({hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})
        
        await EmailUsingTheGrid.fill(EmailInput)    // filling input field
        expect(await EmailUsingTheGrid.inputValue()).toEqual(EmailInput)  // general assertion

        await EmailUsingTheGrid.clear() // clearing input field
        expect(await EmailUsingTheGrid.inputValue()).toEqual('')  // general assertion

        await EmailUsingTheGrid.pressSequentially(EmailInput, {delay: 50})  // typing with delay
        await expect(EmailUsingTheGrid).toHaveValue(EmailInput)    // locator assertion
        })

    test('radio button', async ({page}) => {
        const UsingTheGridCard = page.locator('nb-card').filter({hasText: 'Using the Grid'})
        const RadioOption1 = UsingTheGridCard.getByRole('radio', {name: 'Option 1'})
        const RadioOption2 = UsingTheGridCard.getByRole('radio', {name: 'Option 2'})

        await RadioOption1.check({force: true})
        await expect(RadioOption1).toBeChecked()    // locator assertion; toBeChecked
        await expect(RadioOption2).not.toBeChecked()    // locator assertion; not.toBeChecked
        
        await RadioOption2.check({force: true})
        const RadioOption2Status = await RadioOption2.isChecked()
        const RadioOption1Status = await RadioOption1.isChecked()
        await expect(RadioOption2Status).toBeTruthy()   // general assertion; toBeTruthy
        await expect(RadioOption1Status).toBeFalsy()    // general assertion; toBeFalsy
    })
})

test.describe('Modal & Overlays - Toastr', () => {
    test.beforeEach(async ({page}) => {
        page.getByText('Modal & Overlays').click()
        page.getByText('Toastr').click()        
    })

    test('checkboxes', async ({page}) => {
        const CheckBox1 = page.getByRole('checkbox', {name: 'Hide on click'})
        const CheckBox2 = page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'})
        const CheckBox3 = page.getByRole('checkbox', {name: 'Show toast with icon'})

        await CheckBox1.check({force: true})
        await CheckBox2.check({force: true})
        await CheckBox3.check({force: true})
        await expect(CheckBox1).toBeChecked()   // locator assertion; toBeChecked
        await expect(CheckBox2).toBeChecked()   // locator assertion; toBeChecked
        await expect(CheckBox3).toBeChecked()   // locator assertion; toBeChecked

        await CheckBox1.uncheck({force: true})
        await CheckBox2.uncheck({force: true})
        await CheckBox3.uncheck({force: true})
        expect(await CheckBox1.isChecked()).toBeFalsy() // general assertion; toBeFalsy
        expect(await CheckBox2.isChecked()).toBeFalsy() // general assertion; toBeFalsy
        expect(await CheckBox3.isChecked()).toBeFalsy() // general assertion; toBeFalsy

        const AllCheckBoxes = page.getByRole('checkbox')
        const AllCheckBoxesList = await AllCheckBoxes.all()
        for(const checkbox of AllCheckBoxesList){
            await checkbox.check({force: true})
        }
        for(const checkbox of AllCheckBoxesList){
            await expect(checkbox).toBeChecked()   // locator assertion; toBeChecked
        }
    })
})

test('list & dropdown', async ({page}) => {
        const Header = page.locator('nb-layout-header')
        const Dropdown = page.locator('ngx-header nb-select')
        const DropdownOptions = page.locator('nb-option-list nb-option')
        const DropdownOptionsList = await DropdownOptions.all()

        const colors = {
            'Light': 'rgb(255, 255, 255)',
            'Dark': 'rgb(34, 43, 69)',
            'Cosmic': 'rgb(50, 50, 89)',
            'Corporate': 'rgb(255, 255, 255)'
        }

        for(const color in colors){
            await Dropdown.click()
            await DropdownOptions.getByText(color).click()
            await page.waitForTimeout(1000)
            await expect(Header).toHaveCSS('background-color', colors[color as keyof typeof colors])  // locator assertion
        }
    })
