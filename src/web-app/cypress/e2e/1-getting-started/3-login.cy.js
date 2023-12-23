/// <reference types="cypress" />

describe("SignInPage", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
    })

    it("Usuário realiza login", () => {
        cy.get('Div')
        cy.get('button').contains('Login').click({ multiple: true})
        cy.get('[data-cy=username]').type('teste3@gmail.com')
        cy.get('[data-cy=password]').type('123456')
        cy.get('button').contains('Login').click()
    })
})