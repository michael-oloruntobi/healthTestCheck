const { BookAppointmentPage } = require("../pageObjects/BookAppointmentPage");

describe("Appointment", function () {
  let bookAppointmentPage;
  beforeEach(async function () {
    bookAppointmentPage = new BookAppointmentPage();
    await bookAppointmentPage.openUrl();
  });
  afterEach(async function () {
    await bookAppointmentPage.quitDriver();
  });

  it("should book appointment", async function () {
    await bookAppointmentPage.validLogin(
      bookAppointmentPage.validUsername,
      bookAppointmentPage.validPassword
    );

    await bookAppointmentPage.bookValidAppointment();

    await bookAppointmentPage.assertElementText(
      bookAppointmentPage.facilityText,
      bookAppointmentPage.facilities
    );

    await bookAppointmentPage.assertElementText(
      bookAppointmentPage.hospitalReadmissionText,
      "Yes"
    );

    await bookAppointmentPage.assertElementText(
      bookAppointmentPage.commentText,
      bookAppointmentPage.comment
    );
  });
});
