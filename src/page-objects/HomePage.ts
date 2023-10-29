import { Locator, Page, expect } from '@playwright/test'
import { AbstractPage } from './AbstractPage'
import{homePageTitle} from "./consts"

export class HomePage  extends AbstractPage {
  // readonly page: Page
  
  readonly logo: Locator
  readonly signUpLoginBtn: Locator  
  readonly deleteCurrUserBtn: Locator
  readonly productsBtn: Locator  
  readonly cartBtn: Locator

  constructor(page: Page) {
    // this.page = page
    super(page)
    this.logo = page.locator('.logo')
    this.signUpLoginBtn = page.locator('[href="/login"]')
    this.deleteCurrUserBtn = page.locator('[href="/delete_account"]')
    this.productsBtn = page.locator('[href="/products"]')
    this.cartBtn = page.locator('[href="/view_cart"]').first()
  }

  async visit() {
    await this.page.goto('/')    
  }

  async isLogoVisible() {
    return await this.logo.isVisible();
  }

  async getTitle() {
    return await this.page.title()
  }

  async verifyPageIsOpened() {   
    expect(await this.getTitle()).toBe(homePageTitle);
    expect(await this.isLogoVisible()).toBe(true);
  }

  async clickOnSignUpLoginBtn() {
    await this.signUpLoginBtn.click()
  } 

  async deleteCurrentUser(){
    this.logo.click()
    await this.deleteCurrUserBtn.waitFor()
     await this.deleteCurrUserBtn.click()
      let delMess = await this.page.locator('[data-qa="account-deleted"]').textContent()
      expect(delMess).toBe('Account Deleted!')
  }
  
}
