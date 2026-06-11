import { test as base } from 'playwright-bdd';
import { basePage } from '../pages/base-page';
import { lmrMakeAReportPage } from '../pages/lmr-make-a-report-page';
import { lmrWhenDidThePersonMoveIntoYourPropertyPage } from '../pages/lmr-when-did-the-person-move-into-your-property-page';
import { lmrExistingTenantsInformationPage } from '../pages/lmr-existing-tenants-information-page';
import { lmrRentalPropertyAddressPage } from '../pages/lmr-rental-property-address-page';
import { lmrLandlordOrAgentsInformationPage } from '../pages/lmr-landlord-or-agents-information-page';
import { lmrSummaryPage } from '../pages/lmr-summary-page';
import { lmrPrivacyPolicyPage } from '../pages/lmr-privacy-policy-page';
import { lmrReportSubmittedPage } from '../pages/lmr-report-submitted-page';

type Pages = {
  basePage: basePage;
  lmrMakeAReportPage: lmrMakeAReportPage;
  lmrWhenDidThePersonMoveIntoYourPropertyPage: lmrWhenDidThePersonMoveIntoYourPropertyPage;
  lmrExistingTenantsInformationPage: lmrExistingTenantsInformationPage;
  lmrRentalPropertyAddressPage: lmrRentalPropertyAddressPage;
  lmrLandlordOrAgentsInformationPage: lmrLandlordOrAgentsInformationPage;
  lmrSummaryPage: lmrSummaryPage;
  lmrPrivacyPolicyPage: lmrPrivacyPolicyPage;
  lmrReportSubmittedPage: lmrReportSubmittedPage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    await use({
      basePage: new basePage(page),
      lmrMakeAReportPage: new lmrMakeAReportPage(page),
      lmrWhenDidThePersonMoveIntoYourPropertyPage: new lmrWhenDidThePersonMoveIntoYourPropertyPage(page),
      lmrExistingTenantsInformationPage: new lmrExistingTenantsInformationPage(page),
      lmrRentalPropertyAddressPage: new lmrRentalPropertyAddressPage(page),
      lmrLandlordOrAgentsInformationPage: new lmrLandlordOrAgentsInformationPage(page),
      lmrSummaryPage: new lmrSummaryPage(page),
      lmrPrivacyPolicyPage: new lmrPrivacyPolicyPage(page),
      lmrReportSubmittedPage: new lmrReportSubmittedPage(page),
    });
  },
});

export const expect = test.expect;
