import { faker } from "@faker-js/faker";

describe("As a student I should be able to verify successfully with status code 200", () => {
  let studentID;

  before(() => {
    cy.readFile("cypress/fixtures/rejisterId.json").then((data) => {
      studentID = data.studentUserRegisterId;
    });
  });

  it.skip("should be able to verify", () => {
    const otp = "654911"; // Define OTP for verification

    cy.request({
      method: "POST",
      url: "/user/verifyotp",
      body: {
        otp: otp,
        channel: "email",
        userId: studentID, // Use student ID obtained from fixture
      },
    }).then((response) => {
      // Check if the request was successful
      if (response.status === 200) {
        cy.log("Verification successful"); // Log successful verification
        console.log("Verification successful");
        // Assertions
        expect(response.status).to.eq(200); // Check if the status code is 200
        expect(response.body).to.have.property("success", true); // Check if the success property is true
        expect(response.duration).to.be.lessThan(2000);
      } else {
        // Handle unsuccessful verification
        cy.log("Verification failed with status:", response.status);
        cy.log(response.body);
        console.log("Verification failed with status:", response.status);
        console.log(response.body);
      }
    });
  });
});
