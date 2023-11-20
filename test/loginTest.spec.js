const { LoginPage } = require("../pageObjects/LoginPage");

describe("Login", function () {
  let loginPage;

  beforeEach(async function () {
    loginPage = new LoginPage();
    await loginPage.openUrl();
  });
  afterEach(async function () {
    await loginPage.quitDriver();
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
