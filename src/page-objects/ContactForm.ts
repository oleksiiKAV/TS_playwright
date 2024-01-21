
import { Locator, Page, expect } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class ContactFormPage   extends AbstractPage{

    readonly ContactUsBtn: Locator;
    readonly Heading: Locator;
    readonly EnterName: Locator;
    readonly EnterEmail: Locator;
    readonly EnterSubject: Locator;
    readonly EnterMessage: Locator;
    readonly ClickUploadFileBtn: Locator;
    readonly SubmitBtn: Locator;
    readonly SucessMessage: Locator;
    readonly HomeBtn: Locator;

    constructor(page:Page) {
        super(page)
        this.ContactUsBtn = page.locator("[href='/contact_us']"); //a[contains(text(),'Contact us')]");
        this.Heading = page.getByRole('heading', { name: 'Get In Touch' });
        this.EnterName = page.getByPlaceholder('Name');
        this.EnterEmail = page.getByPlaceholder('Email', { exact: true });
        this.EnterSubject = page.locator("input[data-qa='subject']");
        this.EnterMessage = page.locator("textarea.form-control");
        this.ClickUploadFileBtn = page.locator('input[name="upload_file"]');
        this.SubmitBtn = page.locator("//input[@value='Submit']");
        this.SucessMessage = page.locator('div.status.alert.alert-success');
        this.HomeBtn = page.locator("//span[text()=' Home']");
    }

    async verifyContactFormBtn() {
        expect(await this.ContactUsBtn).toBeVisible();
        console.log(await this.ContactUsBtn.textContent())
    }

    async clickContactFormBtn() {
        await this.ContactUsBtn.click();
    }

    async clickSubmitButton() {
        await this.page.on('dialog', dialog => {dialog.accept()});
        await this.page.click('input[data-qa="submit-button"]');
    }

    async fillContactUsForm(name, email, subject, messageBody, filePath) {
        await this.EnterName.fill(name);
        await this.EnterEmail.fill(email);
        await this.EnterSubject.fill(subject);
        await this.EnterMessage.fill(messageBody);
        await this.ClickUploadFileBtn.setInputFiles(filePath)

    }

    async validateSucessMessage(exp_sucess_message) {
        let contactForm = await this.page.locator('#contact-page')
        await expect(await contactForm.getByText('Success! Your details have been submitted successfully.')).toBeVisible()
        // // await this.SucessMessage.waitFor({state: "visible"})
        // const sucessMesssage = await this.SucessMessage.textContent();
        
        
        // console.log(sucessMesssage);
        // await expect(sucessMesssage).toBe(exp_sucess_message)
    }

    async clickHomeBtn() {
        await this.HomeBtn.click();
        const url = await this.page.url();
        console.log(url)
        //expect(url).toHaveURL("https://automationexercise.com/")
    }


}
