import { test, expect, BrowserContext } from '@playwright/test';

import { HomePage } from '../page-objects/HomePage'
import { SignUpPage } from '../page-objects/SignUpPage';
import { LoginPage } from '../page-objects/LoginPage';
import { ProductsPage } from '../page-objects/ProductsPage';
import { CartPage } from '../page-objects/CartPage';

import {generateRandomString} from '../helpers/generateRandomString';
  
test.describe.parallel('UI Tests', () => {
  let homePage: HomePage
  let signUpPage: SignUpPage
  let logInPage: LoginPage
  let productPage: ProductsPage
  let cartPage: CartPage
  let context: BrowserContext

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    const page = await context.newPage();

    homePage = new HomePage(page);
    signUpPage = new SignUpPage(page);
    logInPage = new LoginPage(page);
    productPage = new ProductsPage(page);
    cartPage = new CartPage(page)
    await homePage.visit()
  })
  
  test.afterAll(async () => {    
    await context.close();
  });

  test('UI Test1 - Register user. Fill valid user data. Expected the message on the page "Account Created!"',
    async ({}) => {
      homePage.verifyPageIsOpened()
      homePage.clickOnSignUpLoginBtn()

      const randomName = generateRandomString(10); 
      const randomEmail = generateRandomString(10) + '@example.com'; 

      await signUpPage.fillSignUpNameEmail(randomName,randomEmail)
     
      await signUpPage.signUpUser('user1'); 

      const successMessage = await signUpPage.accountCreated.textContent();
      expect(successMessage).toBe('Account Created!');

      await homePage.deleteCurrentUser()

    });

    test('UI Test2 - Login user. 1) Invalid scenario. Enter an invalid password and assert login is not successful. 2) Valid scenario. Enter a valid password and assert login is successful.',
    async ({}) => {
      homePage.verifyPageIsOpened()
      homePage.clickOnSignUpLoginBtn()

      let {randomName, randomEmail, password} =  await signUpPage.signUpAndLogout('user1')
     
      // console.log(randomName, randomEmail, password)
      
      await logInPage.logInEmail.fill(randomEmail)
      
      await logInPage.logInPassw.fill(password+randomName)
      await logInPage.logInBtn.click()

      expect(logInPage.logInError).toBeVisible()
      
      await logInPage.logInPassw.fill(password)
      await logInPage.logInBtn.click()

      expect (homePage.page.getByText(' Logged in as '+randomName)).toBeVisible()

      await homePage.deleteCurrentUser()

    });

    test("UI Test3 - Add to Cart. Add all products from the External file to the Cart. 1) Assert whether each added product in the Cart contains the text ‘Blue’. 2) Assert whether no added product in the Cart contains the text ‘Yellow’.",
    async ({page}) => {
      
      homePage.verifyPageIsOpened()
      homePage.clickOnSignUpLoginBtn()

      const {randomName, randomEmail, password} =  await signUpPage.signUpAndLogout('user1')
      await logInPage.logInEmail.fill(randomEmail)           
      await logInPage.logInPassw.fill(password)
      await logInPage.logInBtn.click()
      expect (homePage.page.getByText(' Logged in as '+randomName)).toBeVisible()
      await homePage.productsBtn.click()

      const addedProdCount = await productPage.addProducts()
      await homePage.cartBtn.click()
      await cartPage.validateAdded(addedProdCount)

      await homePage.deleteCurrentUser()

    });



})
