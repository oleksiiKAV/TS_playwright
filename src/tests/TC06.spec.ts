// @ts-check
import { Locator, Page, expect, test } from '@playwright/test'
import { ContactFormPage} from '../page-objects/ContactForm';
import { ContactForm } from '../test-data/contactForm';


test.describe('Test Case 6: Contact Us Form', () => {
    let contactFormPage : ContactFormPage
    test.beforeEach(async ({ page }) => {
        //to block ads 
        await page.route('**/*', request => {
          return request.request().url().startsWith('https://googleads' || 'https://pagead2' || 'https://maps.googleapis')
            ? request.abort()
            : request.continue();
        })
        await page.goto('/')
    })    

    test('Verify ContactUs Button on HomePage', async ({page}) => {
        
        contactFormPage = new ContactFormPage(page);    
        contactFormPage.verifyContactFormBtn();
    });

    
    test.only('Validate the ContactUs Form', async ({ page }) => {
        

        contactFormPage = new ContactFormPage(page);

        await contactFormPage.clickContactFormBtn();
        await contactFormPage.fillContactUsForm(ContactForm.Name, ContactForm.Email, ContactForm.Subject, ContactForm.MessageBody, ContactForm.filePath);
        await contactFormPage.clickSubmitButton();
        // await contactFormPage.wait(5000)
        await contactFormPage.validateSucessMessage(ContactForm.successMessage);
        await contactFormPage.clickHomeBtn();

    });



})