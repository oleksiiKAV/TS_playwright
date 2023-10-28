import { test, expect } from '@playwright/test';

import { HomePage } from '../page-objects/HomePage'
import { SignUpPage } from '../page-objects/SignUpPage';

import {generateRandomString} from '../helpers/generateRandomString';
  
test.describe('SignUp', () => {
  let homePage: HomePage
  let signUpPage: SignUpPage
  let context

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    const page = await context.newPage();

    homePage = new HomePage(page)
    signUpPage = new SignUpPage(page);
    await homePage.visit()
  })
  test.afterAll(async () => {
    
    await context.close();
  });

  test('SignUp. Fill valid user data. Expected the message on the page "Account Created!"',
    async ({ page }) => {
      homePage.verifyPageIsOpened()
      homePage.clickOnSignUpLoginBtn()

      const randomName = generateRandomString(10); 
      const randomEmail = generateRandomString(10) + '@example.com'; 

      await signUpPage.fillSignUlNameEmail(randomName,randomEmail)
     
      await signUpPage.signUpUser('user1'); 

      const successMessage = await signUpPage.accountCreated.textContent();
      expect(successMessage).toBe('Account Created!');

      await homePage.deleteCurrentUser()

    });

})
