/// <reference types="Cypress" />

describe("User can create time recording", () => {
	it("successfully", () => {
		cy.server();
		cy.route({
			method: "POST",
			url: "https://demo.kimai.org/api/timesheets",
			response: "fixture:successfully_saving_data.json",
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			},
			status: 200
		});

		cy.route({
			method: "GET",
			url: "https://demo.kimai.org/api/customers",
			response: "fixture:customer_index.json",
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			}
		}).as('getCustomers');

		cy.route({
			method: "GET",
			url: "https://demo.kimai.org/api/activities",
			response: "fixture:activities_index.json",
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			}
		}).as('getActivities');

		cy.route({
			method: "GET",
			url: "https://demo.kimai.org/api/projects",
			response: "fixture:projects_index.json",
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			}
		}).as('getProjects');

		cy.visit("http://localhost:3000");
		cy.get("input[type=name]").type("anna_admin");
		cy.get("input[type=password]").type("api_kitten");
		cy.get("button[type=submit]").click();
		cy.get("#customer > .dropdown").click();
		cy.get(".visible > .selected > .text").click();
		cy.get("#projects > .dropdown").click();
		cy.get(".visible > .selected > .text").click();
		cy.get("#activity > .dropdown").click();
		cy.get(".visible > .selected > .text").click();
		cy.get('input[name="begin"]').type("07:00");
		cy.get('input[name="end"]').type("08:00");
		cy.get('input[name="rate"]').type("25", {force: true});
		cy.get('input[name="description"]').type("I worked really hard on this");
		cy.get('button[name="create"]').click();
		cy.get('p[name="save-message"]').should("contain", "Your time was saved");
	});

	it("unsuccessfully", () => {
		cy.server();
		cy.route({
			method: "POST",
			url: "https://demo-stable.kimai.org/api/timesheets",
			response: "fixtures:failed_saving_data.json",
			headers: {
				"X-AUTH-USER": "susan_super",
				"X-AUTH-TOKEN": "api_kitten"
			},
			status: 400
		});
		cy.visit("http://localhost:3000");
		cy.get("input[type=name]").type("anna_admin");
		cy.get("input[type=password]").type("api_kitten");
		cy.get("button[type=submit]").click();
		cy.get("#customer > .dropdown").click();
		cy.get('input[name="begin"]').type("abcd");
		cy.get('input[name="end"]').type("abcd");
		cy.get('button[name="create"]').click();
		cy.get('p[name="error-message"]').should(
			"contain",
			"Your time was not saved, make sure that you use the correct format"
		);
	});
});
