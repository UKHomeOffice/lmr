import { test as base } from 'playwright-bdd';
import { BasePage } from '../pages/BasePage';
import { LmrMakeAReportPage } from '../pages/LmrMakeAReportPage';
import { LmrWhenDidThePersonMoveIntoYourPropertyPage } from '../pages/LmrWhenDidThePersonMoveIntoYourPropertyPage';
import { LmrExistingTenantsInformationPage } from '../pages/LmrExistingTenantsInformationPage';
import { LmrRentalPropertyAddressPage } from '../pages/LmrRentalPropertyAddressPage';
import { LmrLandlordOrAgentsInformationPage } from '../pages/LmrLandlordOrAgentsInformationPage';
import { LmrSummaryPage } from '../pages/LmrSummaryPage';
import { LmrPrivacyPolicyPage } from '../pages/LmrPrivacyPolicyPage';
import { LmrReportSubmittedPage } from '../pages/LmrReportSubmittedPage';

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