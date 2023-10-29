import { Locator, Page, expect } from '@playwright/test'
import { AbstractPage } from './AbstractPage'
import * as fs from 'fs/promises';

import path from "path";

export class ProductsPage  extends AbstractPage {
  // readonly page: Page
  
  readonly searchInput: Locator
  readonly searchIcon: Locator  
  readonly searchResult: Locator
  readonly addCartBtn: Locator
  readonly continueShopping: Locator  

  constructor(page: Page) {
    // this.page = page
    super(page)
    this.searchInput = page.locator('#search_product') // enter search input from the file
    this.searchIcon = page.locator('#submit_search') // click icon
    this.searchResult =  page.locator('.productinfo')
    this.addCartBtn = page.getByText('Add to cart').first()//.nth(1) // add to cart Btn
    this.continueShopping = page.locator('[data-dismiss="modal"]') // close modal
  }

  async addProducts():Promise<any> {
    const productNames: string[] = await this.readProductData();

    for (const productName of productNames) {
      await this.searchInput.fill(productName);
      await this.searchIcon.click();
      await this.page.waitForLoadState('load'); // Wait for the page to load after search      
      if (await this.searchResult.isVisible()) {    
        await this.searchResult.hover()    
        await this.page.locator('.product-overlay').waitFor()
        await this.addCartBtn.waitFor(); // Wait for add to cart button to be visible
        await this.addCartBtn.click(); // Click add to cart button
        await this.continueShopping.click(); // Continue shopping (assuming there is a modal after adding to cart)
      } else {
        console.log(`Product "${productName}" not found.`);
      }
    }
    return productNames.length
  }

  private async readProductData(): Promise<any> {
    const productDataPath = path.join(__dirname, "../test-data/", "data-driven-blue.json"
      );
    try {
        const data = await fs.readFile(productDataPath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData.map((item: any) => item.productName);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}
  
}
