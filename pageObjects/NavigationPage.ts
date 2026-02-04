import { Page } from '@playwright/test'

export class NavigationPage {
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async formLayoutsPage(){
        await this.menuItemClick('Forms')
        console.log('Navigating to Form Layouts page')
        await this.page.getByText('Form Layouts').click()
        console.log('Navigated to Form Layouts page')
    }

    async datePickerPage(){
        await this.menuItemClick('Forms')
        console.log('Navigating to Datepicker page')
        await this.page.getByText('Datepicker').click()
        console.log('Navigated to Datepicker page')
    }

    async smartTablePage(){
        await this.menuItemClick('Tables & Data')
        console.log('Navigating to Smart Table page')
        await this.page.getByText('Smart Table').click()
        console.log('Navigated to Smart Table page')
    }

    async tostrPage(){
        await this.menuItemClick('Modal & Overlays')
        console.log('Navigating to Toastr page')
        await this.page.getByText('Toastr').click()
        console.log('Navigated to Toastr page')
    }

    private async menuItemClick(menuItem: string){
        const menuItemElement = this.page.getByTitle(menuItem)
        console.log(`menuItem: ${menuItem}`)
        const currentState = await menuItemElement.getAttribute('aria-expanded') 
        console.log(`currentState: ${currentState}`)

        if(currentState == 'false'){
            await menuItemElement.click()
            console.log(`${menuItem} menu expanded`)
        }else{
            console.log(`${menuItem} menu already expanded`)
        }
    }
}
