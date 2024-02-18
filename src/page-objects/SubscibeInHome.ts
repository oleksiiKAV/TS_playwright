import { Locator, Page, expect } from '@playwright/test'
import { HomePage } from './HomePage'
import{homePageTitle} from "./consts"

export class SubscrHomePage  extends HomePage {
  readonly subscrHeader: Locator
  readonly subscrEmail: Locator  
  readonly subscrBtn: Locator
  readonly subscrSucc: Locator  
  

  constructor(page: Page) {
    
    super(page)
    this.subscrHeader = page.locator('.single-widget h2')
    this.subscrEmail = page.locator('#susbscribe_email')
    this.subscrBtn = page.locator('#subscribe')
    this.subscrSucc = page.locator('.alert-success')
    
  }

  async verifySubscribeHeader(){
    await this.page.keyboard.down('End');
    const actualText = await this.subscrHeader.textContent();
    const expectedText = "SUBSCRIPTION";

    if (actualText)
        expect(actualText.toLowerCase()).toEqual(expectedText.toLowerCase());
  }

  async subscribeHomeFillAndClickBtn(email:string){
    await this.subscrEmail.fill(email);
    await this.subscrBtn.click();
  }

  async verifySubscribeSuccess(){
    this.subscrSucc.isVisible();
  }
}