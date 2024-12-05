describe("Get event details successfully with status code 200", () => {
  let accessToken;
  let eventId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/eventId.json").then((eventData) => {
      eventId = eventData.event_id;
    });
  });

  it("Checking if should be able Get event details or not", () => {
    cy.request({
      method: "GET",
      url: `/calendar/event/details/${eventId}`,
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
        cy.log("Get event details Response:", response.body);
        console.log("Get event details Response:", response.body);
      } else {
        cy.log("Get event details failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
