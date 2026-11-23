import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class lmrReportSubmittedPage extends basePage {

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
