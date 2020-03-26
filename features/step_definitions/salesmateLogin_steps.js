const { Given, When, Then,AfterAll} = require('cucumber');
const { Builder, By, Capabilities} = require('selenium-webdriver');
const {strictEqual} = require('assert');
require("chromedriver");
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given('I am on the salesmate login page', {timeout: 2 * 8000},async function () {
    await driver.get('https://accounts.salesmate.io/login.html#');
});

When('I enter the credentials', async function () {
    await driver.findElement(By.xpath("//input[@id='email']")).sendKeys("priyanka.vlr@rapidops.com");
    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("123456");
    await driver.findElement(By.xpath("//button[@id='login_btn']")).click();
});

Then('the page salesmate homescreen page should be opened',{timeout: 2 * 12000},async function () {
    await driver.sleep(20000);
    const title = await driver.getTitle();
    const expectedTitle = 'Default Dashboard';
    strictEqual(title,expectedTitle);
});

AfterAll('end', async function(){
    await driver.quit();
});