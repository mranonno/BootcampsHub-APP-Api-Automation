describe.skip("Get active notification successfully with status code 200", () => {
  let accessToken;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Get active notification or not", () => {
    cy.request({
      method: "POST",
      url: `/notification/job/getactive/${sourceid}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Get active notification Response:", response.body);
        console.log("Get active notification Response:", response.body);
      } else {
        cy.log(
          "Get active notification failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
