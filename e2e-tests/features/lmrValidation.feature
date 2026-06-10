@LmrRegressionTest

Feature: LMR - Landlords make a report

# When did the person move into your property? page
# Existing tenant's information page
# Rental property address page
# Landlord's or agent's information page
# Privacy policy page
  Scenario: LMR Test-1 Validate the above pages
    Given I visit the Landlord's make a report Page
    When I choose to navigate to "When did the person move into your property?" page for LMR
# When did the person move into your property? page
# No data entered in any of the fields
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tell us when the person moved into your property" error summary
# Entered future date
    When I enter "Tomorrow's date" into "When did the person move into your property?" field and page for LMR
    Then I should see "There is a problem" error message displayed
    And I should see "This date must not be in the future" error summary
# Entered past date tenancy agreements that started after 30 November 2014
    When I enter "30/11/2014" into "When did the person move into your property?" field and page for LMR
    Then I should see "There is a problem" error message displayed
    And I should see "This service only applies to tenancy agreements that started after 30 November 2014" error summary
    When I enter "Today's date" into "When did the person move into your property?" field and page for LMR
# Existing tenant's information
# No data entered in any of the fields
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter tenant's full name¬Please enter the tenant's date of birth" error summary
# DOB entered is less than 18 year old
    When I complete Existing tenant's information fields with the below details:
      | Full name     | Dan HOF                |
      | Date of birth | less than 18 years ago |
      | Nationality   | Aland Islands          |
    Then I should see "There is a problem" error message displayed
    And I should see "Date of birth entered must reflect 18 years or older" error summary
# DOB entered is invalid
    When I complete Existing tenant's information fields with the below details:
      | Full name     | Dan HOF       |
      | Date of birth | 1*/02/1990    |
      | Nationality   | Aland Islands |
    Then I should see "There is a problem" error message displayed
    And I should see "Please enter a valid date" error summary
    When I complete Existing tenant's information fields with the below details:
      | Full name     | Dan HOF      |
      | Date of birth | 19 years ago |
      | Nationality   |              |
# Rental property address
# No data entered in any of the fields
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter the property address line 1¬Enter the town/city¬Enter the postcode of the rental property" error summary
# UK address: incorrect England Postcode
    When I complete Rental property address with the below details:
      | Address line 1 | 12      |
      | Address line 2 | Kings   |
      | Town or City   | Leeds   |
      | Country        | UK      |
      | Postcode       | L!2 1PP |
    Then I should see "There is a problem" error message displayed
    And I should see "Your postcode is not in England. If your property is not in England, you do not have to do a right to rent check" error summary
    When I complete Rental property address with the below details:
      | Address line 1 | 12      |
      | Address line 2 | Kings   |
      | Town or City   | Leeds   |
      | Country        | UK      |
      | Postcode       | M12 1PP |
# Landlord's or agent's information page
# No data entered in any of the fields
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter the landlord's full name¬Enter the landlord's email" error summary
# Enter email address @ symbol at the end and enter Invalid uk telephone number
    When I complete Landlord's or agent's information with the below details:
      | Landlord's or agent's full name | Kings          |
      | Company name                    |                |
      | Email address                   | TesterTlf.com@ |
      | Phone number                    | -48081570192   |
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a valid email¬Enter a valid phone number" error summary
# Enter Email address short less than 6 characters and enter invalid UK telephone number 12 digits
    When I complete Landlord's or agent's information with the below details:
      | Landlord's or agent's full name | Kings        |
      | Company name                    | HOF LTD      |
      | Email address                   | T@t.c        |
      | Phone number                    | 016148081588 |
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a valid email¬Enter a valid phone number" error summary
# Enter email does not have @ symbol
    When I complete Landlord's or agent's information with the below details:
      | Landlord's or agent's full name | Kings         |
      | Company name                    | HOF LTD       |
      | Email address                   | TesterTlf.com |
      | Phone number                    | 01614808158   |
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a valid email" error summary
    When I complete Landlord's or agent's information with the below details:
      | Landlord's or agent's full name | Kings          |
      | Company name                    | HOF LTD        |
      | Email address                   | Tester@Tlf.com |
      | Phone number                    | 01614808158    |
    And I select continue
# Privacy policy
    And I select submit report button
    Then I should see "There is a problem" error message displayed
    And I should see "Confirm you have read the Data Protection statement" error summary
