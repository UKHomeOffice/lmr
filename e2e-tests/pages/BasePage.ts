import { chromium, Page, Locator, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    // Common locators (example)
    readonly headerText: Locator;
    readonly continueButton: Locator;
    readonly thereIsAProblemText: Locator;
    readonly errorSummaryList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerText = page.locator('h1');
        this.continueButton = page.locator("input[value='Continue']");
        this.thereIsAProblemText = page.locator('#error-summary-title');
        this.errorSummaryList = page.locator("[class='govuk-list govuk-error-summary__list']");
    }

    // Assertion page title
    async assertPageTitle(page: Page, title: string) {
        await expect(page).toHaveTitle(title);
    }

    // Generic click
    async click(locator: Locator) {
        await locator.click();
    }

    // Generic type
    async type(locator: Locator, text: string) {
        await locator.fill(text);
        await this.page.keyboard.press('Tab');
    }

    async clickContinueButton() {
        await this.click(this.continueButton);
    }

    // Visibility check
    async isVisible(locator: Locator) {
        return await locator.isVisible();
    }

    async selectRadioOptionWithText(page: Page, optionText: string): Promise<void> {
        if (!optionText || optionText.trim() === '') {
            throw new Error('Radio option text value cannot be null or blank.');
        }

        const radioOption: Locator = page.getByRole('checkbox', { name: optionText });

        // Check the option
        await radioOption.check();
    }


    convertTextToDate(dateValue: string | null): string | null {
        if (dateValue == null) return null;

        const date = dateValue.trim().toLowerCase();
        if (!date) return dateValue;

        const now = new Date();

        const formatDate = (d: Date): string => {
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const addDays = (d: Date, days: number) => {
            const newDate = new Date(d);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        };

        const addYears = (d: Date, years: number) => {
            const newDate = new Date(d);
            newDate.setFullYear(newDate.getFullYear() + years);
            return newDate;
        };

        const dateMappings: Record<string, () => Date> = {
            "yesterday's date": () => addDays(now, -1),
            "today's date": () => now,
            "tomorrow's date": () => addDays(now, 1),
            "more than one year in the future": () => addDays(addYears(now, 1), 1),
            "more than 100 years in the future": () => addDays(addYears(now, 100), 1),
            "more than one year in the past": () => addDays(addYears(now, -1), -1),
            "within the last 3 years": () => addDays(addYears(now, -3), 1),
            "more than 3 years ago": () => addYears(now, -3),
            "less than 16 years ago": () => addDays(addYears(now, -16), 1),
            "less than 18 years ago": () => addDays(addYears(now, -18), 1),
            "19 years ago": () => addYears(now, -20),
            "more than 50 years ago": () => addDays(addYears(now, -50), -1),
            "more than 100 years ago": () => addDays(addYears(now, -100), -1),
            "more than 120 years ago": () => addDays(addYears(now, -120), -1),
            "more than 126 years ago": () => addDays(addYears(now, -126), -1),
        };

        const dateFn = dateMappings[date];

        return dateFn ? formatDate(dateFn()) : dateValue;
    }

    async enterDateOrDob(inputDate: string | null) {
        if (!inputDate?.trim()) return;

        const dayLocator: Locator = this.page.getByLabel('Day');
        const monthLocator: Locator = this.page.getByLabel('Month');
        const yearLocator: Locator = this.page.getByLabel('Year');

        const formattedDate = this.convertTextToDate(inputDate);

        if (!formattedDate) return;

        const dateParts = formattedDate.split('/');

        if (dateParts.length !== 3) {
            throw new Error('Invalid date format. Expected format: dd/MM/yyyy');
        }

        const [dayVal, monthVal, yearVal] = dateParts;

        await this.type(dayLocator, dayVal);
        await this.type(monthLocator, monthVal);
        await this.type(yearLocator, yearVal);
    }

    async linkTextIsDisplayed(page: Page, linkText: string): Promise<boolean> {
        return await page.getByRole('link', { name: linkText }).isVisible();
    }

    async getUrlForLinkText(page: Page, linkText: string): Promise<string | null> {
        return await page.getByRole('link', { name: linkText }).getAttribute('href');
    }

    async getThereIsAProblemTextErrorText(): Promise<string | null> {
        return await this.thereIsAProblemText.textContent();
    }

    async getErrorSummaryListText(): Promise<string | null> {
        return await this.errorSummaryList.textContent();
    }

    

    // // Assertion helper (optional)
    // async expectToBeVisible(locator: Locator) {
    //     await expect(locator).toBeVisible();
    // }

    // async expectToHaveText(locator: Locator, text: string) {
    //     await expect(locator).toHaveText(text);
    // }
}