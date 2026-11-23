import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class lmrLandlordOrAgentsInformationPage extends basePage {
    readonly fullNameField: Locator;
    readonly companyNameField: Locator;
    readonly emailField: Locator;
    readonly phoneNumberField: Locator;

    constructor(page: Page) {
        super(page);
        this.fullNameField = page.locator('#landlord-full-name')
        this.companyNameField = page.locator('#company-name')
        this.emailField = page.locator('#landlord-email')
        this.phoneNumberField = page.locator('#landlord-phone')
    }

    async expectedPageTitle(): Promise<string> {
        const title = await this.page.title();

        return title.startsWith('Error')
            ? "Error: Landlord's or agent's information – Landlords make a report – GOV.UK"
            : "Landlord's or agent's information – Landlords make a report – GOV.UK";
    }

    async completeLandlordOrAgentInformationPage(fullName: string, companyName: string, email: string, phoneNumber: string) {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.type(this.fullNameField, fullName);
        await this.type(this.companyNameField, companyName);
        await this.type(this.emailField, email);
        await this.type(this.phoneNumberField, phoneNumber);
        await this.click(this.continueButton);
    }
}
