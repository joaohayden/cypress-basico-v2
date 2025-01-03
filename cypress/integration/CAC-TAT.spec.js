/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação',function(){
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type("João")
        cy.get('#lastName').type("Hayden")
        cy.get('#email').type("joaohayden@gmail.com")
        cy.get('#phone').type("92999999999")
        cy.get('#open-text-area').type("Me ajude a aprender Cypress em uma semana")
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })
})

