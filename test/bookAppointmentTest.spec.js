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
const { LoginPage } = require("../pageObjects/LoginPage");
const { BookAppointmentPage } = require("../pageObjects/BookAppointmentPage");

describe("Appointment", function () {
  let driver;
  let loginPage;
  let bookAppointmentPage;
  beforeEach(async function () {
    driver = new Builder()
      .withCapabilities(ltcapabilities.capabilities)
      .build();
    driver.get("https://katalon-demo-cura.herokuapp.com/");
    loginPage = new LoginPage(driver);
    bookAppointmentPage = new BookAppointmentPage(driver);
  });
  afterEach(async function () {
    await driver.quit();
  });

  it("should book appointment", async function () {
    await loginPage.validLogin(
      loginPage.validUsername,
      loginPage.validPassword
    );

    await bookAppointmentPage.bookValidAppointment();

    await loginPage.assertElementText(
      bookAppointmentPage.facilityText,
      bookAppointmentPage.facilities
    );

    await loginPage.assertElementText(
      bookAppointmentPage.hospitalReadmissionText,
      "Yes"
    );

    await loginPage.assertElementText(
      bookAppointmentPage.commentText,
      bookAppointmentPage.comment
    );
  });
});
