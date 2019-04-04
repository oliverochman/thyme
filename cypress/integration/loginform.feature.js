/// <reference types="Cypress" />

describe('Login form', () => {

	it('when user visits Login page', () => {
		cy.visit('http://localhost:3000')
			.get('input[type=name]').type('susan_super')
			.get('input[type=password]').type('api_kitten')
			.get('button[type=submit]').click()
			.get('#login_message').should('contain', 'Welcome, susan_super')
	})

	it('User does not get successfully authenticated', () => {
		cy.visit('http://localhost:3000')
			.get('input[type=name]').type('susan_super')
			.get('input[type=password]').type('wrong_password')
			.get('button[type=submit]').click()
			.get('#error_message').should('contain', 'Invalid credentials')
	})
})