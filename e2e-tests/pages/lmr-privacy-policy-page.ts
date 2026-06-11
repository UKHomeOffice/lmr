import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class LmrPrivacyPolicyPage extends BasePage {

    readonly submitReportButton: Locator;

    constructor(page: Page) {
        super(page);
        this.submitReportButton = page.locator("input[value='Submit report']");
    }

    async expectedPageTitle(): Promise<string> {
        const title = await this.page.title();

        return title.startsWith('Error')
            ? "Error: Privacy policy – Landlords make a report – GOV.UK"
            : "Privacy policy – Landlords make a report – GOV.UK";
    }

    async clickSubmitReportButton() {
        await this.click(this.submitReportButton);
    }

    async completePrivacyPolicyPage(option: string) {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.selectRadioOptionWithText(this.page, option)
        await this.click(this.submitReportButton);
    }
}
