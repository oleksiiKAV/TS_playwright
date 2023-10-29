import { Page, Locator } from 'playwright';
import { AbstractPage } from './AbstractPage'



import path from "path";

export class LoginPage   extends AbstractPage {

    readonly logInEmail: Locator;
    readonly logInPassw: Locator;
    readonly logInBtn: Locator;

    readonly logInError: Locator;    

    constructor(page: Page) {
        super(page)        
        
        this.logInEmail = page.locator('[data-qa="login-email"]')
        this.logInPassw = page.locator('[data-qa="login-password"]')
        this.logInBtn =  page.locator('[data-qa="login-button"]')

        this.logInError = page.locator('[style="color: red;"]');       
        
    }   
}