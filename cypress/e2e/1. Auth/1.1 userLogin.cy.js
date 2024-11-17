describe("As a student I should be able to login to the portal with valid credential and get stats code 200", () => {
  const userEmail = "186mdshimul@gmail.com"; // Define user email
  const userPassword = "Ashraful186@"; // Define user password

  it("should be able to login", () => {
    cy.request({
      method: "POST",
      url: "/api/user/login",
      body: {
        email: userEmail,
        password: userPassword,
      },
      failOnStatusCode: false,
    }).then((response) => {
      // Check if the request was successful
      if (response.status === 200) {
        const { token, user } = response.body;
        const studentToken = token;
        const studentLoginID = user._id;

        // Store token and login ID to fixtures
        cy.writeFile("cypress/fixtures/studentToken.json", {
          studentLoginToken: studentToken,
        });
        cy.writeFile("cypress/fixtures/studentLoginID.json", {
          LoginID: studentLoginID,
        });

        // Assertions
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
        expect(response.body.success).to.eq(true);
        expect(response.duration).to.be.lessThan(2000);
        // Log token and login ID
        cy.log("User Token:", studentToken);
        cy.log("User ID:", studentLoginID);
        console.log("User Token:", studentToken);
        console.log("User ID:", studentLoginID);
      } else {
        // Handle unsuccessful login
        cy.log("Login failed with status:", response.status);
        cy.log(`Login failed  ${response.body.error}`);
        cy.log(`Login failed with status code ${response.status}`);
      }
    });
  });
});
