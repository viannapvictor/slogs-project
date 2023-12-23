/// <reference types="cypress" />

describe("HomeUnauthorized", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
    })

    it("Home deve ter um Stack envolvendo-o", () => {
        cy.get('Div')
        cy.get('button').click({ multiple: true, force: true})
    })
})