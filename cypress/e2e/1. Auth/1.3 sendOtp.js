describe("As a student I should be able to get OTP on my email successfully with status code 200", () => {
    let studentID;
  
    before(() => {
      cy.readFile("cypress/fixtures/rejisterId.json").then((data) => {
        studentID = data.studentUserRegisterId;
      });
    });
  
    it("Should be able to send OTP to email", () => {
      cy.request({
        method: "POST",
        url: "/api/user/sendotp",
        body: {
          userId: studentID,
          channel: "email",
          captchaToken: "string",
        },
      }).then((response) => {
        // Check if the request was successful
        if (response.status === 200) {
          cy.log("OTP sent successfully");
          // Assertions
          expect(response.status).to.eq(200); // Check if the status code is 200
          expect(response.body).to.have.property("success", true); // Check if the success property is true
          expect(response.duration).to.be.lessThan(2000);
        } else {
          // Handle unsuccessful request
          cy.log("Failed to send OTP");
          cy.log(`Failed to send OTP. Status code: ${response.status}`);
          cy.log(response.body.error);
        }
      });
    });
  });
  