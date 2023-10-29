import { PlaywrightTestConfig } from '@playwright/test'
import { defineConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 30000,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  
  reporter: 'html',
  projects: [
    {
      name: 'Chromium',
      use: { 
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: 'https://www.automationexercise.com',
        browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { 
        baseURL: 'https://www.automationexercise.com',
        browserName: 'firefox' },
    },
    {
      name: 'Webkit',
      use: { 
        baseURL: 'https://www.automationexercise.com',
        browserName: 'webkit' },
    },
  ],
}

export default config
