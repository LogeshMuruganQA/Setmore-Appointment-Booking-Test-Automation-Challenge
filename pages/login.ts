import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly headerLoginBtn: Locator;
    readonly footerLoginink: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly SubmitBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        // Home Page Login buttons
        this.headerLoginBtn = page.locator('header.header').getByRole('link', { name: 'Login' });
        this.footerLoginink = page.locator('section.right-wrapper').getByRole('link', { name: 'Login' });

        // Login form elements
        this.emailInput = page.locator('input.email-field');
        this.passwordInput = page.locator('input.password-field');
        this.SubmitBtn = page.locator("//span[text()='Login']");
    };

    async HomePage_loginBtn(from: 'header' | 'footer' = 'header') {
        if (from === 'header') {
            await this.headerLoginBtn.click();
        }
        else {
            await this.footerLoginink.click();
        }
    };

    async FormPage_login(email: string, password: string) {
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await expect(this.SubmitBtn).toBeEnabled();
        await this.SubmitBtn.click({force:true});
    };
}