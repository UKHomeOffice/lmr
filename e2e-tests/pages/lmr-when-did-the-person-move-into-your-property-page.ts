import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LmrWhenDidThePersonMoveIntoYourPropertyPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async expectedPageTitle(): Promise<string> {
        const title = await this.page.title();

        return title.startsWith('Error')
                ? "Error: When did the person move into your property? – Landlords make a report – GOV.UK"
                : "When did the person move into your property? – Landlords make a report – GOV.UK";
    }

    async completeWhenDidThePersonMoveIntoYourPropertyPage(dateValue: string) {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.enterDateOrDob(dateValue);
        await this.click(this.continueButton);
    }
}
