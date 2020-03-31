Feature: salesmate Login Page
         To enter the credentials for salesmate login page
Scenario: Entering credentials and updating general settings page
   Given I am on the salesmate login page
   When I enter the valid credentials
   When checking with mandatory fields in general settings page
   When updating data in general settings page
   Then the browser title should be matched with the page opened