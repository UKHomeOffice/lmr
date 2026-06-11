import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class lmrSummaryPage extends basePage {

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
