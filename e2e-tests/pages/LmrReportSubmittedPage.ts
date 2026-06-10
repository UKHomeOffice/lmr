import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LmrReportSubmittedPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async expectedPageTitle(): Promise<string> {
        const title = await this.page.title();

        return title.startsWith('Error')
                ? "Error: Report submitted – Landlords make a report – GOV.UK"
                : "Report submitted – Landlords make a report – GOV.UK";
    }

    async completeReportSubmittedPage() {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
    }
}