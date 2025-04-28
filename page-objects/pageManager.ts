import {Page, expect} from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { LoginPage } from "./loginPage";
import { RegisterPage } from "./registerPage";



export class PageManager{
    private readonly page:Page
    private readonly navigationPage:NavigationPage
    private readonly loginPage:LoginPage
    private readonly registerPage:RegisterPage

    constructor(page:Page){
        this.page=page
        this.navigationPage= new NavigationPage(this.page)
        this.loginPage= new LoginPage(this.page)
        this.registerPage= new RegisterPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLoginPage(){
        return this.loginPage
    }

    onFormRegisterPage(){
        return this.registerPage
    }


}