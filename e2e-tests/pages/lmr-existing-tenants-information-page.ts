import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class LmrExistingTenantsInformationPage extends BasePage {
	readonly fullNameField: Locator;
	readonly nationalityField: Locator;

	constructor(page: Page) {
		super(page);

		this.fullNameField = page.locator('#tenant-full-name')
		this.nationalityField = page.locator('#tenant-nationality')
	}

	async expectedPageTitle(): Promise<string> {
		const title = await this.page.title();

		return title.startsWith('Error')
			? "Error: Existing tenant's information – Landlords make a report – GOV.UK"
			: "Existing tenant's information – Landlords make a report – GOV.UK";
	}

	async completeExistingTenantsInformationPage(fullName: string, dob: string, nationality: string) {
		await this.assertPageTitle(this.page, await this.expectedPageTitle());
		await this.type(this.fullNameField, fullName);
		await this.enterDateOrDob(dob);
		await this.type(this.nationalityField, nationality);
		await this.click(this.continueButton);
	}
}
