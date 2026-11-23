@LmrRegressionTest @LmrAccessibilityTest

Feature: LMR - Accessibility
  # Scans every page in the journey, including validation error states, against WCAG 2 A and AA.
  # Violations are recorded as soft assertions so all pages are checked in a single run.

  Scenario: Accessibility check on every page of the LMR journey
    Given I visit the Landlord's make a report Page
    Then the "Make a report" page should have no accessibility violations
    When I continue from the "Make a report" page
    Then the "When did the person move into your property?" page should have no accessibility violations
    When I continue from the "When did the person move into your property?" page
    Then the "Existing tenant's information" page should have no accessibility violations
    When I continue from the "Existing tenant's information" page
    Then the "Rental property address" page should have no accessibility violations
    When I continue from the "Rental property address" page
    Then the "Landlord's or agent's information" page should have no accessibility violations
    When I continue from the "Landlord's or agent's information" page
    Then the "Summary" page should have no accessibility violations
    When I continue from the "Summary" page
    Then the "Privacy policy" page should have no accessibility violations
    When I continue from the "Privacy policy" page
    Then the "Report submitted" page should have no accessibility violations
