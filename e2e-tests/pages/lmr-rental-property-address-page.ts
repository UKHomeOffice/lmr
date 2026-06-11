import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class lmrRentalPropertyAddressPage extends basePage {
    readonly addressLine1TextField: Locator;
    readonly addressLine2TextField: Locator;
    readonly townOrCityTextField: Locator;
    readonly countyField: Locator;
    readonly postCodeField: Locator;


    constructor(page: Page) {
        super(page);
        this.addressLine1TextField = page.locator('#address-line-1')
        this.addressLine2TextField = page.locator('#address-line-2')
        this.townOrCityTextField = page.locator('#town-or-city')
        this.countyField = page.locator('#county')
        this.postCodeField = page.locator('#postcode')
    }

    async expectedPageTitle(): Promise<string> {
        const title = await this.page.title();

        return title.startsWith('Error')
                ? "Error: Rental property address – Landlords make a report – GOV.UK"
                : "Rental property address – Landlords make a report – GOV.UK";
    }

    async completeRentalPropertyAddressPage(addressLine1: string, addressLine2: string, townOrCity: string, county: string, postCode: string) {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.type(this.addressLine1TextField, addressLine1);
        await this.type(this.addressLine2TextField, addressLine2);
        await this.type(this.townOrCityTextField, townOrCity);
        await this.type(this.countyField, county);
        await this.type(this.postCodeField, postCode);
        await this.click(this.continueButton);
    }
}
