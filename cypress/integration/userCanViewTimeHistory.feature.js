 /// <reference types="Cypress" />

 describe("User can view history of time recordings", () => {
	it("successfully displays a list of work history over the last 7 days ", () => {
			cy.server();
			cy.route({
					method: "GET",
					url: "https://demo.kimai.org/api/timesheets",
					response: "fixture:get_timesheet.json",
					headers: {
							"X-AUTH-USER": "susan_super",
							"X-AUTH-TOKEN": "api_kitten"
					}
			});

			cy.route({
				method: 'GET',
				url: 'https://demo.kimai.org/api/version',
				response: 'fixture:successful_login.json',
				headers: {
					"X-AUTH-USER": "anna_admin",
					"X-AUTH-TOKEN": "api_kitten"
				}
			})

			cy.route({
				method: "GET",
				url: "https://demo.kimai.org/api/customers",
				response: "fixture:customer_index.json",
				headers: {
					"X-AUTH-USER": "susan_super",
					"X-AUTH-TOKEN": "api_kitten"
				}
			});

			cy.route({
					method: "GET",
					url: "https://demo.kimai.org/api/projects?visible=3",
					response: "fixture:get_projects.json",
					headers: {
							"X-AUTH-USER": "susan_super",
							"X-AUTH-TOKEN": "api_kitten"
					}
			});

			cy.route({
				method: "GET",
				url: "https://demo.kimai.org/api/activities?visible=3",
				response: "fixture:get_activities.json",
				headers: {
						"X-AUTH-USER": "susan_super",
						"X-AUTH-TOKEN": "api_kitten"
				}
		});


			cy.visit("http://localhost:3000");
			cy.get("input[type=name]").type("anna_admin");
			cy.get("input[type=password]").type("api_kitten");
			cy.get("button[type=submit]").click();
			cy.contains("START TIME");
			cy.contains("END TIME");
			cy.contains("DURATION");
			cy.contains("PROJECT");
			cy.contains("ACTIVITY");
			cy.contains("architect intuitive niches (x)");
			cy.contains("Phadder")
	});
});