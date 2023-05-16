import React from "react";
import App from "./App";

describe("<App />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react

    // Define the url to spy on and intercept on call
    // On older versions on cypress use cy.route()
    // cy.route("POST", "https://dummyjson.com/products/add")
    // .as("testPost");
    cy.intercept({
      method: "POST",
      url: "https://dummyjson.com/products/add",
    })
    .as("testPost");


    cy.mount(<App />);
    cy.get("#postRequestButton").click();
    // on older versions of cypress use cy.get('@testPost')
    cy.wait(['@testPost'])
    .then((interception)=>{
      assert.equal(interception.response.statusCode, 200) 
      assert.isNotNull(interception.response.body)
    })
  });
});
