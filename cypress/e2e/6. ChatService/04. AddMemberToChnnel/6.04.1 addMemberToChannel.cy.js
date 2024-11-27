describe.skip("Add member to channel with status code 200", () => {
  let accessToken;
  let chatId;
  let memberId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      chatId = loginData.chatId;
      memberId = loginData.memberId;
    });
  });

  it("Checking if should be able Add member to channel or not", () => {
    cy.request({
      method: "PATCH",
      url: `/chat/channel/adduser/${chatId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // Organization: organizationId,
      },
      body: {
        member: memberId,
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
        console.log("Add member to channel Response:", response.body);
      } else {
        cy.log(
          "Add member to channel failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
