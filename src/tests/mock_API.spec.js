import { test, expect, BrowserContext } from '@playwright/test';

test('Simulating API Response', async ({ page }) => {    
    
      await page.goto("https://oleksiikav.github.io/Tweets-Follow")
  
      
      await page.locator('[href="/Tweets-Follow/tweets"]').click();
      await page.route('*/**/users', async route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          [{
            "user": "Mr. Doyle Padberg",
            "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/131.jpg",
            "followers": 20501,
            "tweets": 19,
            "following": false,
            "id": "1"
          },])

      });
      page.waitForURL("https://oleksiikav.github.io/Tweets-Follow/tweets");

      await expect(page.locator('.sc-fqkvVR p')).toBeVisible();

    });
  });

//   test('gets the json from api and adds a new fruit', async ({ page }) => {
//     // Get the response and add to it
//     await page.route('*/**/api/v1/fruits', async route => {
//       // const response = await route.fetch();
//       // const json = await response.json();
//       // json.push({ name: 'ВВВВВВВВВВВВЫВЫ  ааааааааааа', id: 100 });
//       // JSON.stringify({ name: 'ВВВВВВВВВВВВЫВЫ  ааааааааааа', id: 100 });
//       // Fulfill using the original response, while patching the response body
//       // with the given JSON object.
//       // await route.fulfill({ response, json });
//       route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify([
//           { name: 'ВВВВВВВВВВВВЫВЫ  ааааааааааа', id: 100 }
//         ]),
//       });


//     });

//     // Go to the page
//     await page.goto('https://demo.playwright.dev/api-mocking');

//     // Assert that the new fruit is visible
//     await expect(page.getByText('Playwright', { exact: true })).toBeVisible();
//   });