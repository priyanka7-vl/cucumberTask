const { Given, When, Then,AfterAll} = require('cucumber');
const { Builder, By,Key, Capabilities} = require('selenium-webdriver');
const {strictEqual} = require('assert');
require("chromedriver");
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given('I am on the salesmate login page', {timeout: 2 * 9000},async function () {
    await driver.get('https://accounts.salesmate.io/login.html#');
});

When('I enter the valid credentials',{timeout: 2 * 15000}, async function () {
    await driver.findElement(By.xpath("//input[@id='email']")).sendKeys("priyanka.vlr@rapidops.com");
    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("123456");
    await driver.findElement(By.xpath("//button[@id='login_btn']")).click();
    await driver.sleep(18000);
    await driver.findElement(By.xpath("//span[@class='thumb-sm avatar avatar-6']")).click();
    await driver.findElement(By.xpath("//a[text()='My Account']")).click();
    await driver.sleep(6000);  
});
When('checking with mandatory fields in general settings page', async function () { 
    await driver.findElement(By.xpath("//input[@id='firstName']")).sendKeys(Key.chord(Key.CONTROL,"a"));
    await driver.findElement(By.xpath("//input[@id='firstName']")).sendKeys(Key.chord(Key.DELETE));
    await driver.findElement(By.xpath("//input[@id='lastName']")).sendKeys(Key.chord(Key.CONTROL,"a"));
    await driver.findElement(By.xpath("//input[@id='lastName']")).sendKeys(Key.chord(Key.DELETE));
    await driver.findElement(By.xpath("//input[@id='email']")).sendKeys(Key.chord(Key.CONTROL,"a"));
    await driver.findElement(By.xpath("//input[@id='email']")).sendKeys(Key.chord(Key.DELETE));
    await driver.findElement(By.xpath("//button[@id ='btnUpdate']")).click();
    let header2 = await driver.findElement(By.xpath("//div[@class='error-message text-danger']")).getText();
    strictEqual(header2,'This field is required.');
});
When('updating data in general settings page',async function() {
    await driver.findElement(By.xpath("//input[@id='firstName']")).sendKeys("priyanka");
    await driver.findElement(By.xpath("//input[@id='lastName']")).sendKeys("vlr");
    await driver.findElement(By.xpath("//input[@id='email']")).sendKeys("priyanka.vlr@rapidops.com");
    await driver.findElement(By.xpath("//input[@id='mobile']")).sendKeys(Key.chord(Key.CONTROL,"a"));
    await driver.findElement(By.xpath("//input[@id='mobile']")).sendKeys(Key.chord(Key.DELETE));
    await driver.findElement(By.xpath("//input[@id='mobile']")).sendKeys("9553387165");
    await driver.findElement(By.xpath("//span[@role='presentation']")).click();
    await driver.findElement(By.xpath("//li[text()='24 Hour']")).click();
    await driver.findElement(By.xpath("//span[@title='MMM DD, YYYY']")).click();
    await driver.findElement(By.xpath("//li[text()='DD MMM, YYYY']")).click();
    await driver.findElement(By.xpath("//span[@title='Asia/Kolkata']")).click();
    await driver.findElement(By.xpath("//input[@id='nickname']")).sendKeys(Key.chord(Key.CONTROL,"a"));
    await driver.findElement(By.xpath("//input[@id='nickname']")).sendKeys(Key.chord(Key.DELETE));
    await driver.findElement(By.xpath("//input[@id='nickname']")).sendKeys("priya");
    await driver.findElement(By.xpath("//button[@id ='btnUpdate']")).click();
});

Then('the browser title should be matched with the page opened',async function () {
    const title = await driver.getTitle();
    const expectedTitle = 'General - My Account';
    strictEqual(title,expectedTitle);
});

AfterAll('end', async function(){
    await driver.quit();
});