import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { DataTable } from '@cucumber/cucumber';

export const { Given, When, Then } = createBdd(test);

Given('I visit the Landlord\'s make a report Page', async ({ pages }) => {
  await pages.lmrMakeAReportPage.navigateToUrl();
});

When('I fill out the answers to LMR form pertaining to {string}', async ({ pages }, scenario: string) => {
  switch (scenario.toLowerCase()) {
    case "t1: all field completed":
      await pages.lmrMakeAReportPage.completeLandingPageForm();
      await pages.lmrWhenDidThePersonMoveIntoYourPropertyPage.completeWhenDidThePersonMoveIntoYourPropertyPage(c.YESTERDAY_S_DATE);
      await pages.lmrExistingTenantsInformationPage.completeExistingTenantsInformationPage(c.FULL_NAME, c.DOB_1978, c.NATIONALITY);
      await pages.lmrRentalPropertyAddressPage.completeRentalPropertyAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.COUNTRY_UK, c.POSTCODE);
      await pages.lmrLandlordOrAgentsInformationPage.completeLandlordOrAgentInformationPage(c.LAND_LORD_AGENT_NAME, c.COMPANY_NAME, c.SAS_HOF_EMAIL, c.TELEPHONE);
      break;

    case "t2: optional field values not entered":
      await pages.lmrMakeAReportPage.completeLandingPageForm();
      await pages.lmrWhenDidThePersonMoveIntoYourPropertyPage.completeWhenDidThePersonMoveIntoYourPropertyPage(c.YESTERDAY_S_DATE);
      await pages.lmrExistingTenantsInformationPage.completeExistingTenantsInformationPage(c.FULL_NAME, c.DOB_1978, "");
      await pages.lmrRentalPropertyAddressPage.completeRentalPropertyAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, "", c.POSTCODE);
      await pages.lmrLandlordOrAgentsInformationPage.completeLandlordOrAgentInformationPage(c.LAND_LORD_AGENT_NAME, c.COMPANY_NAME, c.SAS_HOF_EMAIL, "");
      break;

    default:
      throw new Error(`Invalid scenario: ${scenario}`);
  }
  await pages.lmrSummaryPage.completeSummaryPage();
  await pages.lmrPrivacyPolicyPage.completePrivacyPolicyPage("I confirm that I have read and understood the Data Protection statement above.");
  await pages.lmrReportSubmittedPage.completeReportSubmittedPage();
});

Then('I am navigated to {string} page', async ({ pages }, expectedPageHeaderText: string) => {
  const actualPageHeaderTextLocator = pages.lmrReportSubmittedPage.headerText;
  await expect(actualPageHeaderTextLocator).toHaveText(expectedPageHeaderText);
});

Then('link text {string} is displayed and is associated to url {string}', async ({ page, pages }, linkText: string, expectedUrl: string) => {
  const isVisible = await pages.lmrMakeAReportPage.linkTextIsDisplayed(page, linkText);
  const actualUrl = await pages.lmrMakeAReportPage.getUrlForLinkText(page, linkText);
  expect(isVisible).toBe(true);
  expect(actualUrl).toMatch(expectedUrl);
});

//**************************************************************************************************************************************************************************//
//********************************************************************  Validation Test start from here ********************************************************************//
//**************************************************************************************************************************************************************************//

When('I choose to navigate to {string} page for LMR', async ({ pages }, arg: string) => {
  await pages.lmrMakeAReportPage.completeLandingPageForm();
});

When('I select continue', async ({ pages, page }) => {
  await pages.basePage.clickContinueButton();
});

Then('I should see {string} error message displayed', async ({ pages }, expectedErrorMessage: string) => {
  const actualErrorMessageLocator = await pages.basePage.getThereIsAProblemTextErrorText();
  expect(expectedErrorMessage).toEqual(actualErrorMessageLocator!);
});

Then('I should see {string} error summary', async ({ pages }, expectedErrorMessage: string) => {
  const expectedErrorArray = expectedErrorMessage.trim().split('¬');

  const actualText = await pages.basePage.getErrorSummaryListText();
  const actualErrorArray = actualText!
    .replaceAll('\t', '') // remove ALL tabs
    .trim()             // remove leading/trailing whitespace
    .split(/\r?\n/);    // handle all newline types

  expect(actualErrorArray).toEqual(expectedErrorArray);
});

When('I enter {string} into {string} field and page for LMR', async ({ pages }, value: string, arg1: string) => {

  await pages.lmrWhenDidThePersonMoveIntoYourPropertyPage.completeWhenDidThePersonMoveIntoYourPropertyPage(value);
});

When('I complete Existing tenant\'s information fields with the below details:', async ({ pages }, dataTable: DataTable) => {
  const data = dataTable.rowsHash();

  const fullName = data['Full name'];
  const dob = data['Date of birth'];
  const nationality = data['Nationality'];

  await pages.lmrExistingTenantsInformationPage.completeExistingTenantsInformationPage(fullName, dob, nationality);
});

When('I complete Rental property address with the below details:', async ({ pages }, dataTable: DataTable) => {
  const data = dataTable.rowsHash();

  const addressLine1 = data['Address line 1'];
  const addressLine2 = data['Address line 2'];
  const townOrCity = data['Town or City'];
  const country = data['Country'];
  const postcode = data['Postcode'];

  await pages.lmrRentalPropertyAddressPage.completeRentalPropertyAddressPage(addressLine1, addressLine2, townOrCity, country, postcode);
});

When('I complete Landlord\'s or agent\'s information with the below details:', async ({ pages }, dataTable: DataTable) => {
  const data = dataTable.rowsHash();

  const landlordFullName = data["Landlord's or agent's full name"];
  const companyName = data['Company name'];
  const email = data['Email address'];
  const phone = data['Phone number'];

  await pages.lmrLandlordOrAgentsInformationPage.completeLandlordOrAgentInformationPage(landlordFullName, companyName, email, phone);
});

When('I select submit report button', async ({ pages }) => {
  await pages.lmrPrivacyPolicyPage.clickSubmitReportButton();
});
