@LmrRegressionTest
Feature: LMR Test

@LmrE2ETest
  Scenario Outline: Landlords make a report E2E test
    Given I visit the Landlord's make a report Page
    When I fill out the answers to LMR form pertaining to "<LMR Journey Test>"
    Then I am navigated to "Report submitted" page
    Examples:
      | LMR Journey Test                      |
      | T1: All field completed               |
      | T2: Optional field values not entered |

  Scenario: Landlord make a report - links
    Given I visit the Landlord's make a report Page
    Then link text "checking their relevant documents" is displayed and is associated to url "https://www.gov.uk/government/publications/right-to-rent-document-checks-a-user-guide"
    And link text "verification from the Home Office" is displayed and is associated to url "https://eforms.homeoffice.gov.uk/outreach/lcs-application.ofml"
    And link text "immigration crime reporting service" is displayed and is associated to url "https://www.gov.uk/report-immigration-crime"