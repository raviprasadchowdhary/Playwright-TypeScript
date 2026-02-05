import { Page } from "@playwright/test"

export class FormLayoutsPage{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async submitusingTheGridWithEmailPassworsAndRadios(email: string, password: string, radioOption: string){
        const UsingTheGridFrom = this.page.locator('nb-card').filter({hasText: 'Using the Grid'})

        await UsingTheGridFrom.getByPlaceholder('Email').fill(email)
        await UsingTheGridFrom.getByPlaceholder('Password').fill(password)
        await UsingTheGridFrom.getByRole('radio', {name: radioOption}).click({force: true})
        await UsingTheGridFrom.getByRole('button', {name: 'Sign in'}).click()
    }

    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, checkboxStatus: boolean){
        const InlineForm = this.page.locator('nb-card').filter({hasText: 'Inline form'})
        await InlineForm.getByPlaceholder('Jane Doe').fill(name)
        await InlineForm.getByPlaceholder('Email').fill(email)
        if(checkboxStatus){
            await InlineForm.getByRole('checkbox', {name: 'Remember me'}).check({force: true})
        }else{
            await InlineForm.getByRole('checkbox', {name: 'Remember me'}).uncheck({force: true})
        }
        await InlineForm.getByRole('button', {name: 'Submit'}).click()
    }
}