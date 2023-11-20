const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const BasePage = require("./BasePage");
class LoginPage extends BasePage {
  constructor() {
    super();
    this.inValidPassword = "ThisIsNotAPasswordx";
    this.loginErrorMessage = By.xpath('//p[@class="lead text-danger"]');
    this.loginErrorMessageText =
      "Login failed! Please ensure the username and password are valid.";
  }
}

module.exports = { LoginPage };
