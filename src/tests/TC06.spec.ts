// @ts-check
import { Locator, Page, expect, test } from '@playwright/test'
import { ContactFormPage} from '../page-objects/ContactForm';
import { ContactForm } from '../test-data/contactForm';


test.describe('Test Case 6: Contact Us Form', () => {
    let contactFormPage : ContactFormPage
    

    test('Verify ContactUs Button on HomePage', async ({page}) => {
        await page.goto('/');      
        contactFormPage = new ContactFormPage(page);    
        contactFormPage.verifyContactFormBtn();
    });

    //to block ads 
    test.only('Validate the ContactUs Form', async ({ page }) => {
        await page.goto('/');
        // advertising interception
        await page.route("**/*", (request) => {
            request.request().url().startsWith("https://googleads.g.doubleclick.net")
                ? request.abort()
                : request.continue();
            return;
        });

        contactFormPage = new ContactFormPage(page);

        await contactFormPage.clickContactFormBtn();
        await contactFormPage.fillContactUsForm(ContactForm.Name, ContactForm.Email, ContactForm.Subject, ContactForm.MessageBody, ContactForm.filePath);
        await contactFormPage.clickSubmitButton();
        // await contactFormPage.wait(5000)
        await contactFormPage.validateSucessMessage(ContactForm.successMessage);
        await contactFormPage.clickHomeBtn();

    });



})