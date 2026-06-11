import { test as base } from 'playwright-bdd';
import { BasePage } from '../pages/base-page';
import { LmrMakeAReportPage } from '../pages/lmr-make-a-report-page';
import { LmrWhenDidThePersonMoveIntoYourPropertyPage } from '../pages/lmr-when-did-the-perso-move-into-your-property-page';
import { LmrExistingTenantsInformationPage } from '../pages/lmr-existing-tenants-information-page';
import { LmrRentalPropertyAddressPage } from '../pages/lmr-rental-property-address-page';
import { LmrLandlordOrAgentsInformationPage } from '../pages/lmr-landlord-or-agents-information-page';
import { LmrSummaryPage } from '../pages/lmr-summary-page';
import { LmrPrivacyPolicyPage } from '../pages/lmr-privacy-policy-page';
import { LmrReportSubmittedPage } from '../pages/lmr-report-submitted-page';

type Pages = {
  basePage: BasePage;
  lmrMakeAReportPage: LmrMakeAReportPage;
  lmrWhenDidThePersonMoveIntoYourPropertyPage: LmrWhenDidThePersonMoveIntoYourPropertyPage;
  lmrExistingTenantsInformationPage: LmrExistingTenantsInformationPage;
  lmrRentalPropertyAddressPage: LmrRentalPropertyAddressPage;
  lmrLandlordOrAgentsInformationPage: LmrLandlordOrAgentsInformationPage;
  lmrSummaryPage: LmrSummaryPage;
  lmrPrivacyPolicyPage: LmrPrivacyPolicyPage;
  lmrReportSubmittedPage: LmrReportSubmittedPage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    await use({
      basePage: new BasePage(page),
      lmrMakeAReportPage: new LmrMakeAReportPage(page),
      lmrWhenDidThePersonMoveIntoYourPropertyPage: new LmrWhenDidThePersonMoveIntoYourPropertyPage(page),
      lmrExistingTenantsInformationPage: new LmrExistingTenantsInformationPage(page),
      lmrRentalPropertyAddressPage: new LmrRentalPropertyAddressPage(page),
      lmrLandlordOrAgentsInformationPage: new LmrLandlordOrAgentsInformationPage(page),
      lmrSummaryPage: new LmrSummaryPage(page),
      lmrPrivacyPolicyPage: new LmrPrivacyPolicyPage(page),
      lmrReportSubmittedPage: new LmrReportSubmittedPage(page),
    });
  },
});

export const expect = test.expect;
