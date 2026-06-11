import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LmrSummaryPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async expectedPageTitle(): Promise<string> {
        return "Summary – Landlords make a report – GOV.UK";
    }

    async completeSummaryPage() {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.click(this.continueButton);
    }
}
