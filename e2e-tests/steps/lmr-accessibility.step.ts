import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { basePage } from '../pages/base-page';

const { When, Then } = createBdd(test);


Then('the {string} page should have no accessibility violations', async ({ pages }, arg: string) => {
  await pages.basePage.assertAccessibility();
});

When('I continue from the {string} page', async ({ pages }, page: string) => {
  switch (page.toLowerCase()) {
    case "make a report":
      await pages.lmrMakeAReportPage.completeLandingPageForm();
      break;
    case "when did the person move into your property?":
      await pages.lmrWhenDidThePersonMoveIntoYourPropertyPage.completeWhenDidThePersonMoveIntoYourPropertyPage(c.YESTERDAY_S_DATE);
      break;
    case "existing tenant's information":
      await pages.lmrExistingTenantsInformationPage.completeExistingTenantsInformationPage(c.FULL_NAME, c.DOB_1978, c.NATIONALITY);
      break;
    case "rental property address":
      await pages.lmrRentalPropertyAddressPage.completeRentalPropertyAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.COUNTRY_UK, c.POSTCODE);
      break;
    case "landlord's or agent's information":
      await pages.lmrLandlordOrAgentsInformationPage.completeLandlordOrAgentInformationPage(c.LAND_LORD_AGENT_NAME, c.COMPANY_NAME, c.SAS_HOF_EMAIL, c.TELEPHONE);
      break;
    case "summary":
      await pages.lmrSummaryPage.completeSummaryPage();
      break;
    case "privacy policy":
      await pages.lmrPrivacyPolicyPage.completePrivacyPolicyPage("I confirm that I have read and understood the Data Protection statement above.");
      break;
    default:
      throw new Error(`Invalid scenario: ${page}`);
  }
});
