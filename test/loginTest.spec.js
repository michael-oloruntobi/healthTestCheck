const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const ltcapabilities = require("../capabilities");
const { LoginPage } = require("../pageObjects/LoginPage");

describe("Login", function () {
  let driver;
  let loginPage;

  beforeEach(async function () {
    // driver = new Builder()
    //   .withCapabilities(ltcapabilities.capabilities)
    //   .build();
    // driver.get("https://katalon-demo-cura.herokuapp.com/");
    loginPage = new LoginPage(driver);
  });
  afterEach(async function () {
    await driver.quit();
  });

  it("should login successfully using valid credentials", async function () {
    await loginPage.validLogin(
      loginPage.validUsername,
      loginPage.validPassword
    );
    await loginPage.assertElementIsDisplayed(
      '//h2[contains(text(), "Make Appointment")]'
    );
  });
  it("should fail for login with invalid credentials", async function () {
    await loginPage.validLogin(
      loginPage.validUsername,
      loginPage.inValidPassword
    );
    let expectedValue = loginPage.loginErrorMessageText;
    let locator = loginPage.loginErrorMessage;
    await loginPage.assertElementText(locator, expectedValue);
  });
});
