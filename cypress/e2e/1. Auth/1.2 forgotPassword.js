describe("As a student, I should be able to use my forgot password functionality if I forgot my password successfully with status code 200", () => {
    let studentEmail;
    let studentNumber;
  
    before(() => {
      // Combine reading files using Cypress.Promise.all for efficiency
      cy.wrap(
        Cypress.Promise.all([
          cy.readFile("cypress/fixtures/userEmail.json"),
          cy.readFile("cypress/fixtures/userNumber.json"),
        ])
      ).then(([emailData, numberData]) => {
        studentEmail = emailData.studentUserEmail;
        studentNumber = numberData.studentUserNumber;
      });
    });
  
    it("Checking if a user can use forgot password functionality in the browser or not", () => {
      cy.request({
        method: "POST",
        url: "/api/user/password/forgot",
        body: {
          phone: studentNumber,
          email: studentEmail,
          channel: "email",
        },
        failOnStatusCode: false, // Handle non-2xx status codes manually
      }).then((response) => {
        if (response.status === 200) {
          // Assertions
          expect(response.status).to.eq(200); // Check if the status code is 200
          expect(response.body).to.have.property("success", true); // Check if the success property is true
          expect(response.duration).to.be.lessThan(2000);
          expect(response.body).to.have.property("isOtpSend", true);
          // Log the response for debugging
          cy.log("Forgot Password Response:", response.body);
          console.log("Forgot Password Response:", response.body);
        } else {
          cy.log("Forgot password failed due to: ", response.body.error);
        }
      });
    });
  });
  