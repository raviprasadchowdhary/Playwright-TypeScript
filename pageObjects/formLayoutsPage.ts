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
}