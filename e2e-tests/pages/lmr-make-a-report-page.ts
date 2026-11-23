import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class lmrMakeAReportPage extends basePage {

    readonly startButton: Locator;
    readonly acceptCookieButton: Locator;
    readonly hideThisMessageButton: Locator;



    constructor(page: Page) {
        super(page);
        this.startButton = page.locator('a:has-text("Start now")');
        this.acceptCookieButton = page.locator('#accept-cookies-button');
        this.hideThisMessageButton = page.locator('#hide-accept-cookie-banner');
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

        if (await this.acceptCookieButton.isVisible()) {
            await this.click(this.acceptCookieButton);
        }

        if (await this.hideThisMessageButton.isVisible()) {
            await this.click(this.hideThisMessageButton);
        }

        await this.click(this.startButton);
    }
}
