import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LmrMakeAReportPage extends BasePage {

    readonly startButton: Locator;
    readonly acceptCookieButton: Locator;
    readonly hideThisMessageButton: Locator;



    constructor(page: Page) {
        super(page);
        this.startButton = page.locator('a:has-text("Start now")');
        this.acceptCookieButton = page.locator('button').filter({ hasText: 'Accept additional cookies' });
        this.hideThisMessageButton = page.locator('button').filter({ hasText: 'Hide this ' })
    }

    async expectedPageTitle(): Promise<string> {
        const title = await this.page.title();

        return title.startsWith('Error')
            ? "Error: Make a report – Landlords make a report – GOV.UK"
            : "Make a report – Landlords make a report – GOV.UK";
    }

    // Navigation
    async navigateToUrl() {
        await this.page.goto('/');
    }

    async completeLandingPageForm() {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.click(this.acceptCookieButton);
        await this.click(this.hideThisMessageButton);
        await this.click(this.startButton);
    }
}