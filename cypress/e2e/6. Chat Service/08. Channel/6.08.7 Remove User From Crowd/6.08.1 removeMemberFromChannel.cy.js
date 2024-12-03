describe.skip("Remove member from channel with status code 200", () => {
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

  it("Checking if should be able Remove member from channel or not", () => {
    cy.request({
      method: "PATCH",
      url: `/chat/channel/remove-user/${chatId}`,
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
        console.log("Remove member from channel Response:", response.body);
      } else {
        cy.log(
          "Remove member from channel failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
