import { Page } from "@playwright/test";
import { NavigationPage } from "./NavigationPage";
import { DatePickerPage } from "./datePickerPage";
import { FormLayoutsPage } from "./formLayoutsPage";

export class PageManager{
    readonly page: Page
    readonly navigationPage: NavigationPage
    readonly datePickerPage: DatePickerPage
    readonly formLayoutsPage: FormLayoutsPage

    constructor(page: Page){
        this.page=page
        this.navigationPage = new NavigationPage(page)
        this.datePickerPage = new DatePickerPage(page)
        this.formLayoutsPage = new FormLayoutsPage(page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage
    }

    onDatePickerPage(){
        return this.datePickerPage
    }

}