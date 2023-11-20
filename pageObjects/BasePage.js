const {
  Builder,
  Browser,
  By,
  Key,
  until,
  Select,
  Actions,
} = require("selenium-webdriver");
const assert = require("assert");
const ltcapabilities = require("../capabilities");

class BasePage {
  @before
  async launch() {
    let driver = new Builder()
      .withCapabilities(ltcapabilities.capabilities)
      .build();
    return driver;
  }
  async navigateToURL() {
    driver.get("https://katalon-demo-cura.herokuapp.com/");
  }
}
module.exports = { BasePage };
launch = new BasePage();
launch.navigateToURL();
