Feature: salesmate Login Page
         To enter the credentials for salesmate login page
Scenario: Entering credentials
   Given I am on the salesmate login page
   When I enter the valid credentials
   When I go to the general settings page
   Then the browser title should be matched with the page opened