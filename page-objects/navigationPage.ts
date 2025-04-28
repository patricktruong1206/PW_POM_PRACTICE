import {Page} from"@playwright/test"
import { HelperBase } from "./helperBase"

export class NavigationPage extends HelperBase{


    constructor(page: Page){
        super(page)
    }

    async formRegisterPage(){
        await this.selectGroupMenuItem('forms','Forms')
        await this.page.locator('#register').click();

    }


    async formLoginPage(){
        await this.selectGroupMenuItem('forms','Forms')
        await this.page.locator('#login').click();
    }

    async formRecoverPassword(){
        await this.selectGroupMenuItem('forms','Forms')
        await this.page.locator('#recover-password').click();
    }

    private async selectGroupMenuItem(groupItemTitle:string,itemTitle:string){
        const groupMenuItem= this.page.locator(`#${groupItemTitle}`,{hasText:itemTitle})
        const expandedState= await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState=="false"){
            await groupMenuItem.click()
        }
    }
}


