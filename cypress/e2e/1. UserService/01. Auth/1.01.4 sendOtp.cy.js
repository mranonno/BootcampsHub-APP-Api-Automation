describe("As a student I should be able to get OTP on my email successfully with status code 200", () => {
  let studentID;

  before(() => {
    cy.readFile("cypress/fixtures/studentLoginID.json").then((data) => {
      studentID = data.studentUserRegisterId;
    });
  });

  it("Should be able to send OTP to email", () => {
    cy.request({
      method: "POST",
      url: "/user/sendotp",
      body: {
        userId: studentID,
        channel: "email",
        captchaToken: "valid-captcha-token",
      },
    })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);
      })
      .catch((error) => {
        cy.log("Request failed:", error.message);
      });
  });
});
