context("Search Component", () => {
  it("Search an address", () => {
    cy.visit("http://localhost:3000");
    cy.viewport(1440, 900);

    cy.get("input").type("88085435");
    cy.get(".primary").click();

    cy.get(":nth-child(1) > .fluid > input[value='Rua João Meirelles']");
    cy.get(":nth-child(3) > .fluid > input[value='Itaguaçu']");
    cy.get(":nth-child(4) > .fluid > input[value='Florianópolis']");
    cy.get(":nth-child(5) > .fluid > input[value='SC']");
  });
});
