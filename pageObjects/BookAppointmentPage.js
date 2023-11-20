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
class BookAppointmentPage {
  constructor(driver) {
    this.driver = driver;
    this.facilityDropdown = By.id("combo_facility");
    this.facilities = "Hongkong CURA Healthcare Center";
    this.loginURL = By.xpath('//a[contains(text(), "Login")]');
    this.username = By.id("txt-username");
    this.hospitalReadmission = By.xpath(
      '//input[@name="hospital_readmission"]'
    );
    this.programRadioButton = By.xpath('//input[@id="radio_program_none"]');
    this.dateInput = By.xpath('//input[@id="txt_visit_date"]');
    this.date = By.xpath("//tbody/tr[last()]/td[last()]");
    this.commentInput = By.xpath('//textarea[@id="txt_comment"]');
    this.comment = "Booked an appointment";
    this.bookAppointmentButton = By.xpath(
      '//button[@id="btn-book-appointment"]'
    );
    this.facilityText = By.xpath('//p[@id="facility"]');
    this.hospitalReadmissionText = By.xpath('//p[@id="hospital_readmission"]');
    this.commentText = By.id("comment");
  }

  async selectTextFromDropDown(locator, text) {
    // Locate the <select> element by ID
    let dropdown = await this.driver.findElement(locator);

    // Create a Select object from the <select> element
    let selectObject = new Select(dropdown);

    // Select an option by visible text
    await selectObject.selectByVisibleText(text);
  }

  async bookValidAppointment() {
    await this.selectTextFromDropDown(this.facilityDropdown, this.facilities);

    await this.driver.findElement(this.hospitalReadmission).click();
    await this.driver.findElement(this.programRadioButton).click();
    await this.driver.findElement(this.dateInput).click();
    let elementToClick = this.driver.findElement(this.date);
    let actions = this.driver.actions();
    await actions.click(elementToClick).perform();
    await this.driver.findElement(this.commentInput).click();
    await this.driver.findElement(this.commentInput).sendKeys(this.comment);
    await this.driver.findElement(this.bookAppointmentButton).click();
  }
}

module.exports = { BookAppointmentPage };
