import { Locator, Page } from '@playwright/test'

export class NavigationPage {
    readonly page: Page
    readonly formLayoutsMenuSubItem: Locator
    readonly datePickerMenuSubItem: Locator
    readonly smartTableMenuSubItem: Locator
    readonly tostrMenuSubItem: Locator



    constructor(page: Page){
        this.page = page
        this.formLayoutsMenuSubItem = page.getByText('Form Layouts')
        this.datePickerMenuSubItem = page.getByText('Datepicker')
        this.smartTableMenuSubItem = page.getByText('Smart Table')
        this.tostrMenuSubItem = page.getByText('Toastr')
    }

    async formLayoutsPage(){
        await this.menuItemClick('Forms');
        await this.formLayoutsMenuSubItem.click();
    }

    async datePickerPage(){
        await this.menuItemClick('Forms');                                          
        await this.datePickerMenuSubItem.click();                            
    }

    async smartTablePage(){
        await this.menuItemClick('Tables & Data');                                  
        await this.smartTableMenuSubItem.click();
    }

    async tostrPage(){
        await this.menuItemClick('Modal & Overlays');                               
        await this.tostrMenuSubItem.click();                                
    }

    private async menuItemClick(menuItem: string){
        const menuItemElement = this.page.getByTitle(menuItem);                     
        const currentState = await menuItemElement.getAttribute('aria-expanded');   

        if(currentState == 'false'){
            await menuItemElement.click();                                          
        }else{
            console.log(`${menuItem} menu already expanded`)
        }
    }
}
