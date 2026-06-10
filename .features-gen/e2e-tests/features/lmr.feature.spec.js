// Generated from: e2e-tests\features\lmr.feature
import { test } from "../../../e2e-tests/fixture/fixtures.ts";

test.describe('LMR Test', () => {

  test.describe('Landlords make a report E2E test', () => {

    test('Example #1', { tag: ['@LmrRegressionTest', '@LmrE2ETest'] }, async ({ Given, When, Then, pages }) => { 
      await Given('I visit the Landlord\'s make a report Page', null, { pages }); 
      await When('I fill out the answers to LMR form pertaining to "T1: All field completed"', null, { pages }); 
      await Then('I am navigated to "Report submitted" page', null, { pages }); 
    });

    test('Example #2', { tag: ['@LmrRegressionTest', '@LmrE2ETest'] }, async ({ Given, When, Then, pages }) => { 
      await Given('I visit the Landlord\'s make a report Page', null, { pages }); 
      await When('I fill out the answers to LMR form pertaining to "T2: Optional field values not entered"', null, { pages }); 
      await Then('I am navigated to "Report submitted" page', null, { pages }); 
    });

  });

  test('Landlord make a report - links', { tag: ['@LmrRegressionTest'] }, async ({ Given, Then, And, page, pages }) => { 
    await Given('I visit the Landlord\'s make a report Page', null, { pages }); 
    await Then('link text "checking their relevant documents" is displayed and is associated to url "https://www.gov.uk/government/publications/right-to-rent-document-checks-a-user-guide"', null, { page, pages }); 
    await And('link text "verification from the Home Office" is displayed and is associated to url "https://eforms.homeoffice.gov.uk/outreach/lcs-application.ofml"', null, { page, pages }); 
    await And('link text "immigration crime reporting service" is displayed and is associated to url "https://www.gov.uk/report-immigration-crime"', null, { page, pages }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e-tests\\features\\lmr.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":11,"tags":["@LmrRegressionTest","@LmrE2ETest"],"steps":[{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given I visit the Landlord's make a report Page","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I fill out the answers to LMR form pertaining to \"T1: All field completed\"","stepMatchArguments":[{"group":{"start":49,"value":"\"T1: All field completed\"","children":[{"start":50,"value":"T1: All field completed","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I am navigated to \"Report submitted\" page","stepMatchArguments":[{"group":{"start":18,"value":"\"Report submitted\"","children":[{"start":19,"value":"Report submitted","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":14,"pickleLine":12,"tags":["@LmrRegressionTest","@LmrE2ETest"],"steps":[{"pwStepLine":15,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given I visit the Landlord's make a report Page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I fill out the answers to LMR form pertaining to \"T2: Optional field values not entered\"","stepMatchArguments":[{"group":{"start":49,"value":"\"T2: Optional field values not entered\"","children":[{"start":50,"value":"T2: Optional field values not entered","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I am navigated to \"Report submitted\" page","stepMatchArguments":[{"group":{"start":18,"value":"\"Report submitted\"","children":[{"start":19,"value":"Report submitted","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":14,"tags":["@LmrRegressionTest"],"steps":[{"pwStepLine":23,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given I visit the Landlord's make a report Page","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then link text \"checking their relevant documents\" is displayed and is associated to url \"https://www.gov.uk/government/publications/right-to-rent-document-checks-a-user-guide\"","stepMatchArguments":[{"group":{"start":10,"value":"\"checking their relevant documents\"","children":[{"start":11,"value":"checking their relevant documents","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":84,"value":"\"https://www.gov.uk/government/publications/right-to-rent-document-checks-a-user-guide\"","children":[{"start":85,"value":"https://www.gov.uk/government/publications/right-to-rent-document-checks-a-user-guide","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And link text \"verification from the Home Office\" is displayed and is associated to url \"https://eforms.homeoffice.gov.uk/outreach/lcs-application.ofml\"","stepMatchArguments":[{"group":{"start":10,"value":"\"verification from the Home Office\"","children":[{"start":11,"value":"verification from the Home Office","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":84,"value":"\"https://eforms.homeoffice.gov.uk/outreach/lcs-application.ofml\"","children":[{"start":85,"value":"https://eforms.homeoffice.gov.uk/outreach/lcs-application.ofml","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And link text \"immigration crime reporting service\" is displayed and is associated to url \"https://www.gov.uk/report-immigration-crime\"","stepMatchArguments":[{"group":{"start":10,"value":"\"immigration crime reporting service\"","children":[{"start":11,"value":"immigration crime reporting service","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":86,"value":"\"https://www.gov.uk/report-immigration-crime\"","children":[{"start":87,"value":"https://www.gov.uk/report-immigration-crime","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end