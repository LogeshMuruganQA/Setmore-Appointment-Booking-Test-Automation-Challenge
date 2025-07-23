import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { URLS } from '../helper/urls';
import { CalendarPage } from '../pages/calendar';

test.describe('Login with valid credentials', () => {
    let login: LoginPage;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(90000);
        login = new LoginPage(page);
        await page.goto(URLS.signupStart);
    });

    test('Log in with header button', async ({ page }) => {
        await login.HomePage_loginBtn('header');
        await login.FormPage_login(process.env.SETMORE_EMAIL!, process.env.SETMORE_PASSWORD!);

        const calendarPage = new CalendarPage(page);
        await calendarPage.switchToMonthView();

        await page.waitForTimeout(2000);
        await expect(page).toHaveScreenshot({
            mask: [page.getByTestId('calendar-container')]
        });
    });

    test('Log in with footer link', async ({ page }) => {
        await login.HomePage_loginBtn('footer');
        await login.FormPage_login(process.env.SETMORE_EMAIL!, process.env.SETMORE_PASSWORD!);

        const calendarPage = new CalendarPage(page);
        await calendarPage.switchToMonthView();

        await page.waitForTimeout(2000);
        await expect(page).toHaveScreenshot({
            mask: [page.getByTestId('calendar-container')]
        });

    });

});