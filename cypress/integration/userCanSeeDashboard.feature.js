/// <reference types="Cypress" />

describe("User can see a dashboard", () => {
	it("User can see a dashboard with graphs", () => {
		cy.server();
		cy.route({
			method: "GET",
			url: "https://demo-stable.kimai.org/api/version",
			response: "fixtures:successful_login.json",
			headers: {
				"X-AUTH-USER": "anna_admin",
				"X-AUTH-TOKEN": "api_kitten"
			}
		});
		cy.visit("http://localhost:3000");
		cy.get("input[type=name]").type("anna_admin");
		cy.get("input[type=password]").type("api_kitten");
		cy.get("button[type=submit]").click();
		cy.get("Button[id=menuicon]").click("topLeft", { force: true });
		cy.get("#dashboard").should("contain", "Dashboard");
		cy.visit("http://localhost:3000/Dashboard");
		cy.get(".chartjs-render-monitor");
	});
});
