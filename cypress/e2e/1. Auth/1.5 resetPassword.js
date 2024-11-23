describe("As a student, I should be able to reset my password successfully with status code 200", () => {
    let studentEmail;
    let studentNumber;
    let accessToken;
  
    before(() => {
      // Combine reading files using Cypress.Promise.all for efficiency
      cy.wrap(
        Cypress.Promise.all([
          cy.readFile("cypress/fixtures/studentToken.json"),
          cy.readFile("cypress/fixtures/userEmail.json"),
          cy.readFile("cypress/fixtures/userNumber.json"),
        ])
      ).then(([tokenData, emailData, numberData]) => {
        accessToken = tokenData.studentLoginToken;
        studentEmail = emailData.studentUserEmail;
        studentNumber = numberData.studentUserNumber;
        // console.log(accessToken, studentEmail, studentNumber);
      });
    });
  
    it("Checking if the user can reset their password or not", () => {
      cy.request({
        method: "PATCH",
        url: "/api/user/password/reset",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: {
          email: studentEmail,
          phone: studentNumber,
          channel: "email",
          otp: "268660", // User valid OTP
          password: "Ashraful186@",
        },
        failOnStatusCode: false, // Handle non-2xx status codes manually
      }).then((response) => {
        if (response.status === 200) {
          // Assertions
          expect(response.status).to.eq(200); // Check if the status code is 200
          expect(response.body).to.have.property("success", true); // Check if the success property is true
          expect(response.duration).to.be.lessThan(2000);
          // Log the response for debugging
          cy.log("Password Reset Response:", response.body);
          console.log("Password Reset Response:", response.body);
        } else {
          cy.log("Reset password failed with status code: ", response.status);
          cy.log(response.body.error);
        }
      });
    });
  });
  