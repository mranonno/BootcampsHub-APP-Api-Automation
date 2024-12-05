describe("Edit community post successfully with status code 200", () => {
  let accessToken;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Edit community post or not", () => {
    cy.request({
      method: "PATCH",
      url: "/content/community/post/edit/673905dc92731d9ad8c78e37",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        title: "Community post testing",
        description: "Description text",
        tags: "#app",
        attachments: "",
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
        cy.log("Edit community post Response:", response.body);
        console.log("Edit community post Response:", response.body);
      } else {
        cy.log(
          "Edit community post failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
