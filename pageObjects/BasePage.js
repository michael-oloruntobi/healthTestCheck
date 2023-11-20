const { Builder, By, Capabilities } = require("selenium-webdriver");
const assert = require("assert");
const ltcapabilities = require("../capabilities");

class BasePage {
  constructor() {
    // Set Chrome options for headless mode
    const chromeOptions = {
      args: ["--headless", "--disable-gpu"],
    };

    // Merge capabilities and Chrome options
    const mergedCapabilities = Capabilities.chrome().set(
      "chromeOptions",
      chromeOptions
    );

    this.driver = new Builder().withCapabilities(mergedCapabilities).build();

    this.validUsername = "John Doe";
    this.validPassword = "ThisIsNotAPassword";
    this.menu = By.id("menu-toggle");
    this.loginURL = By.xpath('//a[contains(text(), "Login")]');
    this.username = By.id("txt-username");
    this.password = By.id("txt-password");
    this.signInbutton = By.id("btn-login");
  }

  async openUrl() {
    await this.driver.get("https://katalon-demo-cura.herokuapp.com/");
  }

  async quitDriver() {
    await this.driver.quit();
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

  async selectTextFromDropDown(locator, text) {
    // Locate the <select> element by ID
    let dropdown = await this.driver.findElement(locator);

    // Create a Select object from the <select> element
    let selectObject = new this.Select(dropdown);

    // Select an option by visible text
    await selectObject.selectByVisibleText(text);
  }
}

module.exports = BasePage;
