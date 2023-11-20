const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const BasePage = require("./BasePage");
class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.validUsername = "John Doe";
    this.validPassword = "ThisIsNotAPassword";
    this.inValidPassword = "ThisIsNotAPasswordx";
    this.menu = By.id("menu-toggle");
    this.loginURL = By.xpath('//a[contains(text(), "Login")]');
    this.username = By.id("txt-username");
    this.password = By.id("txt-password");
    this.signInbutton = By.id("btn-login");
    this.loginErrorMessage = By.xpath('//p[@class="lead text-danger"]');
    this.loginErrorMessageText =
      "Login failed! Please ensure the username and password are valid.";
  }

  async validLogin(username, password) {
    //Click Menu
    await this.driver.findElement(this.menu).click();
    //Click on login URL
    await this.driver.findElement(this.loginURL).click();
    //Type email
    await this.driver.findElement(this.username).sendKeys(username);
    //Type password
    await this.driver.findElement(this.password).sendKeys(password);
    //Click sign in button
    await this.driver.findElement(By.id("btn-login")).click();
  }

  async assertElementIsDisplayed(locator) {
    let isElementPresent = await this.driver
      .findElement(By.xpath(locator))
      .isDisplayed();
    assert.strictEqual(
      isElementPresent,
      true,
      "The element should be displayed"
    );
  }

  async assertElementText(locator, expectedValue) {
    let elementText = await this.driver.findElement(locator).getText();
    await assert.strictEqual(
      elementText,
      expectedValue,
      "Invalid text displayed"
    );
  }
}

module.exports = { LoginPage };
