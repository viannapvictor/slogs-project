/// <reference types="cypress" />

describe("Delete Account", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
    })

    it("Usuário realiza a remoção da conta", () => {
        cy.get('Div')
        cy.get('button').contains('Login').click({ multiple: true})
        cy.get('[data-cy=username]').type('teste3@gmail.com')
        cy.get('[data-cy=password]').type('123456')
        cy.get('button').contains('Login').click()
        cy.get('#detailed-button').click()
        cy.get('#menu-link-configurações').click()
        cy.get('button').contains('Deletar conta').click()
        cy.get('button').contains("Login").click()
    })
})