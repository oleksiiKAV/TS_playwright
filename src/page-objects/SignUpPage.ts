import { Page, Locator } from 'playwright';
import { AbstractPage } from './AbstractPage'

import * as fs from 'fs/promises';

import {generateRandomString} from '../helpers/generateRandomString';

import path from "path";

export class SignUpPage   extends AbstractPage {

    readonly signUpName: Locator;
    readonly signUpEmail: Locator
    readonly signUpBtn: Locator

    readonly title: Locator;
    readonly name: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly day: Locator;
    readonly month: Locator;
    readonly year: Locator;
    readonly newsletter: Locator;
    readonly optin: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly address1: Locator;
    readonly address2: Locator;
    readonly country: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zipcode: Locator;
    readonly mobileNumber: Locator;
    readonly createAccountButton: Locator;
    readonly accountCreated: Locator;
    readonly continueBtn: Locator;
    readonly logOutBtn: Locator;

    constructor(page: Page) {
        super(page)
        
        this.signUpName = page.locator('[data-qa="signup-name"]')
        this.signUpEmail = page.locator('[data-qa="signup-email"]')
        this.signUpBtn =  page.locator('[data-qa="signup-button"]')

        this.name = page.locator('[data-qa="name"]');
        this.email = page.locator('[data-qa="email"]');
        this.password = page.locator('[data-qa="password"]');
        this.day = page.locator('[data-qa="days"]');
        this.month = page.locator('[data-qa="months"]');
        this.year = page.locator('[data-qa="years"]');
        this.newsletter = page.locator('[data-qa="newsletter"]');
        this.optin = page.locator('[data-qa="optin"]');
        this.firstName = page.locator('[data-qa="first_name"]');
        this.lastName = page.locator('[data-qa="last_name"]');
        this.company = page.locator('[data-qa="company"]');
        this.address1 = page.locator('[data-qa="address"]');
        this.address2 = page.locator('[data-qa="address2"]');
        this.country = page.locator('[data-qa="country"]');
        this.state = page.locator('[data-qa="state"]');
        this.city = page.locator('[data-qa="city"]');
        this.zipcode = page.locator('[data-qa="zipcode"]');
        this.mobileNumber = page.locator('[data-qa="mobile_number"]');

        this.createAccountButton = page.locator('[data-qa="create-account"]');

        this.accountCreated = page.locator('[data-qa="account-created"]');

        this.continueBtn = page.locator('[data-qa="continue-button"]');
        this.logOutBtn =  page.locator('[href="/logout"]');
    }

    async fillSignUpNameEmail(name: string, email: string) {
        await this.signUpName.fill(name);
      await this.signUpEmail.fill(email);
      await this.signUpBtn.click()
    }

    async signUpUser(userKey: string): Promise<void> {
        const userData = await this.readUserData(userKey);

        if (userData) {
            // await this.title.fill(userData.title);
            // await this.name.fill(userData.name);
            // await this.email.fill(userData.email);
            await this.password.fill(userData.password);
            // await this.day.selectOption({ label: userData.day });
            // await this.month.selectOption({ label: userData.month });
            // await this.year.selectOption({ label: userData.year });
            // if (userData.newsletter) {
            //     await this.newsletter.check();
            // }
            // if (userData.optin) {
            //     await this.optin.check();
            // }
            await this.firstName.fill(userData.firstName);
            await this.lastName.fill(userData.lastName);
            await this.company.fill(userData.company);
            await this.address1.fill(userData.address1);
            // await this.address2.fill(userData.address2);
            await this.country.selectOption(userData.country);
            await this.state.fill(userData.state);
            await this.city.fill(userData.city);
            await this.zipcode.fill(userData.zipcode);
            await this.mobileNumber.fill(userData.mobileNumber);

            await this.createAccountButton.click();
        } else {
            console.error(`User data not found for key: ${userKey}`);
        }
    }

    async signUpAndLogout(userKey: string): Promise<{ randomName: string, randomEmail: string, password: string }>{
      const randomName = generateRandomString(10); 
      const randomEmail = generateRandomString(10) + '@example.com'; 
      const userData = await this.readUserData(userKey); 

      await this.fillSignUpNameEmail(randomName,randomEmail)     
      await this.signUpUser(userKey); 
      await this.accountCreated.waitFor()
      await this.continueBtn.click()
      await this.logOutBtn.waitFor()
      await this.logOutBtn.click()
      
      return { randomName, randomEmail, password: userData.password };
    }

    private async readUserData(userKey: string): Promise<any> {
        const userDataPath = path.join(__dirname, "../test-data/", "signUp.json"
          );
        try {
            const data = await fs.readFile(userDataPath, 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData[userKey];
        } catch (error) {
            console.error('Error reading JSON file:', error);
            return null;
        }
    }
}
