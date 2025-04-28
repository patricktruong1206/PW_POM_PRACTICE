import {Page,Locator} from"@playwright/test"
import { HelperBase } from "./helperBase"

export class LoginPage extends HelperBase{
    readonly loginForm: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;




    constructor(page: Page){
        super(page)
        this.passwordInput= page.locator('#password')
        this.emailInput=page.locator('#email')
        this.submitButton= page.locator('#submitLoginBtn')
    }
    /**
     * this method will out the Inline form with user details
     * @param email - should be email
     * @param password - valid password for the test user
     */
    async submitLoginFormWithNameEmail(email:string, password:string){
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
        
    }

    async getLoginAlertText()
    {
        await this.page.waitForSelector('#loginSection #message');
        return await this.page.locator('#loginSection #message').textContent();
    }
}
