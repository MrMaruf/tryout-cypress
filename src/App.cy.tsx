import React from "react";
import App from "./App";

describe("<App />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    // Define the url to spy on and intercept on call
    cy.intercept({
      method: "POST",
      url: "https://dummyjson.com/products/add",
    }).as("testPost");


    cy.mount(<App />);
    cy.get("#postRequestButton").click();
    cy.wait(['@testPost'])
  });
});
