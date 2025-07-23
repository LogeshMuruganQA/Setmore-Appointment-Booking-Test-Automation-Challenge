import { Locator, Page, expect } from '@playwright/test';
import { getRandomFutureDate } from '../utils/date';

export class CalendarPage {
    readonly page: Page;
    readonly calendarview: Locator;
    readonly monthViewOption: Locator;
    readonly eventTitleInput: Locator;
    readonly startTimeInput: Locator;
    readonly endTimeInput: Locator;
    readonly createButton: Locator;
    private selectedDate: string | null = null;

    constructor(page: Page) {
        this.page = page;
        this.calendarview = page.locator('//button[@data-testid="change-view-button"]');
        this.monthViewOption = page.getByTestId('view-name').filter({ hasText: 'Month' });
        this.eventTitleInput = page.getByPlaceholder('Event name');
        this.startTimeInput = page.getByTestId('app-widget-start-time-input');
        this.endTimeInput = page.getByTestId('app-widget-end-time-input');
        this.createButton = page.getByTestId('app-widget-create-button');
    };

    async switchToMonthView() {
        await this.calendarview.click();
        await this.monthViewOption.click();
    };

    async selectDate(manualDate?: string) {
        this.selectedDate = manualDate ?? getRandomFutureDate(10);
        const dateCell = this.page.locator(`[data-date="${this.selectedDate}"]`);
        await dateCell.scrollIntoViewIfNeeded();
        await expect(dateCell).toBeVisible({ timeout: 5000 });
        await dateCell.click();
    };

    async enterEventTitle(title: string) {
        await expect(this.eventTitleInput).toBeVisible({ timeout: 5000 });
        await this.eventTitleInput.fill(title);
    };

    async setDynamicTime() {
        const times = [
            '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM',
            '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM',
            '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
            '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
            '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
            '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'
        ];

        const index = Math.floor(Math.random() * (times.length - 2));
        const startTime = times[index];
        const endTime = times[index + 1];

        await this.setManualTime(startTime, endTime);
    };

    async setManualTime(start: string, end: string) {
        await expect(this.startTimeInput).toBeVisible({ timeout: 5000 });
        await this.startTimeInput.click();
        await this.startTimeInput.fill('');
        await this.startTimeInput.type(start);

        await expect(this.endTimeInput).toBeVisible({ timeout: 5000 });
        await this.endTimeInput.click();
        await this.endTimeInput.fill('');
        await this.endTimeInput.type(end);
    };

    async createAppointment() {
        await expect(this.createButton).toBeVisible({ timeout: 5000 });
        await this.createButton.click();
    };

    async verifyEventCreated(title: string) {
        if (!this.selectedDate) {
            throw new Error('No date selected. Run selectDate() first.');
        }
        const eventLocator = this.page.locator(`[data-date="${this.selectedDate}"] >> text="${title}"`);
        await expect(eventLocator).toBeVisible({ timeout: 7000 });
    };
};