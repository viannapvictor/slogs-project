/// <reference types="cypress" />

describe("SignUpPage", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
    })

    it("Usuário realiza cadastro", () => {
        cy.get('Div')
        cy.get('button').contains('Registrar-se').click({ multiple: true})
        cy.get('[data-cy=username]').type('teste3@gmail.com')
        cy.get('[data-cy=phone]').type('999999999')
        cy.get('[data-cy=company]').type('teste3@gmail.com')
        cy.get('[data-cy=password]').type('123456')
        cy.get('button').contains('Cadastrar').click({ multiple: true})
    })
})