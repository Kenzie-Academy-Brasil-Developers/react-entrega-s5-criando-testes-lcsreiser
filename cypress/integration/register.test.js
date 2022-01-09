context("Register", () => {
  it("Search for an address", () => {
    cy.visit("http://localhost:3000");
    cy.viewport(1440, 900);
    cy.get("input").type(88085435);
    cy.get("button").click();
  });
});
