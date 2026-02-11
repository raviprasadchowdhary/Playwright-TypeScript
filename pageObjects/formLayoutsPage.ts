import { Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class FormLayoutsPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }

    async submitusingTheGridWithEmailPassworsAndRadios(email: string, password: string, radioOption: string){
        const UsingTheGridFrom = this.page.locator('nb-card').filter({hasText: 'Using the Grid'})

        await UsingTheGridFrom.getByPlaceholder('Email').fill(email)
        await UsingTheGridFrom.getByPlaceholder('Password').fill(password)
        await UsingTheGridFrom.getByRole('radio', {name: radioOption}).click({force: true})
        await UsingTheGridFrom.getByRole('button', {name: 'Sign in'}).click()
    }

    /**
     * This method fills the inline form with the provided name, email and checkbox statusm and submits the form
     * @param name -> Name to be filled in the form, it can be Firstname Lastname or Fullname
     * @param email -> Email to be filled in the form, it can be any valid email address
     * @param checkboxStatus -> Status of the checkbox, it can be true or false
     */
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