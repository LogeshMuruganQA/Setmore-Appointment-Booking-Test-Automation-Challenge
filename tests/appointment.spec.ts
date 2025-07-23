import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { CalendarPage } from '../pages/calendar';
import { URLS } from '../helper/urls';

test.describe('Booking Appointment Flow', () => {
    let calendarPage: CalendarPage;
    let eventTitle: string;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(90000);        
        // Step 1: Login
        const login = new LoginPage(page);
        await page.goto(URLS.signupStart);
        await login.HomePage_loginBtn('header');
        await login.FormPage_login(process.env.SETMORE_EMAIL!, process.env.SETMORE_PASSWORD!);

        // Step 2: Open Calendar and Switch to Month View
        calendarPage = new CalendarPage(page);
        await calendarPage.switchToMonthView();
    });

    test('Book appointment with dynamic date and time', async ({ page }) => {
        // Step 3: Dynamic date selection
        await calendarPage.selectDate();

        // Step 4: Generate dynamic title
        eventTitle = `Dynamic Event ${Date.now()}`;
        await calendarPage.enterEventTitle(eventTitle);

        // Step 5: Random time
        await calendarPage.setDynamicTime();

        // Step 6: Create appointment
        await calendarPage.createAppointment();

        // Step 7: Verify
        await calendarPage.verifyEventCreated(eventTitle);
    });

    test('Book appointment with manual date and time', async ({ page }) => {
        // Step 3: Manual date (YYYY-MM-DD format)
        const manualDate = '2025-07-05';
        await calendarPage.selectDate(manualDate);

        // Step 4: Manual event title
        eventTitle = `Manual Event ${Date.now()}`;
        await calendarPage.enterEventTitle(eventTitle);

        // Step 5: Manual time
        await calendarPage.setManualTime('10:00 AM', '11:00 AM');

        // Step 6: Create appointment
        await calendarPage.createAppointment();

        // Step 7: Verify
        await calendarPage.verifyEventCreated(eventTitle);
    });
});
