/// <reference types="cypress" />

describe("SignInPage", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
    })

    it("Registro e visualização de um log de incidente", () => {
        cy.get('Div')
        cy.get('button').contains('Login').click()
        cy.get('[data-cy=username]').type('teste3@gmail.com')
        cy.get('[data-cy=password]').type('123456')
        cy.get('button').contains('Login').click()
        cy.get('button').contains('Registrar Incidente').click()
        cy.get('[data-cy=title]').type('Queda de nível')
        cy.get('[data-cy=Description]').type('Funcionário caiu após tropeçar em local onde não havia sinalização')
        cy.get('select').select('Mediana')

        cy.get('button').contains('Enviar').click()
        cy.get('div').contains('Queda').click({multiple: true})
    })
})