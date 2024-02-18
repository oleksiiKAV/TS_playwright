import { test, expect, BrowserContext } from '@playwright/test';

import { SubscrHomePage } from '../page-objects/SubscibeInHome'


import {generateRandomString} from '../helpers/generateRandomString';
  
test.describe.parallel('UI Tests', () => {
  let subscrPage: SubscrHomePage  
  let context: BrowserContext

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    const page = await context.newPage();

    subscrPage = new SubscrHomePage(page);
    await subscrPage.visit()
  })
  
  test.afterAll(async () => {    
    await context.close();
  });

  test.only('UI Test10 - Verify Subscription in home page',
    async ({}) => {
        await subscrPage.page.pause();
        await subscrPage.verifyPageIsOpened();        
        await subscrPage.verifySubscribeHeader();
        await subscrPage.subscribeHomeFillAndClickBtn(generateRandomString(10) + '@example.com')
        await subscrPage.verifySubscribeSuccess();
    }
  );
})