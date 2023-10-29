import { ElementHandle, Locator, Page, expect } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class CartPage  extends AbstractPage {

  constructor(page: Page) {
    super(page)
  }

  async getCartItems(): Promise<ElementHandle[]> {  
    return await this.page.$$('.cart_description');
  }

  async validateAdded(addedNumbers: number){
    const cartProducts = await this.getCartItems()

    expect(addedNumbers, 'Inconsistency between the added data from the file and what is displayed in the cart').toBe(cartProducts.length)

    for (const productElement of await cartProducts) {
      const productName = await productElement.textContent();
      // console.log(productName)
      expect(productName!.toLowerCase()).toContain('blue');
      expect(productName!.toLowerCase()).not.toContain('yellow');
    }  
  } 
}
