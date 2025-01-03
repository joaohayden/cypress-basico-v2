/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação',function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type("João")
        cy.get('#lastName').type("Hayden")
        cy.get('#email').type("joaohayden@gmail.com")
        cy.get('#phone').type("92999999999")
        cy.get('#open-text-area').type("Lorem ipsum dolor sit amet. Et ipsam Quis vel quia recusandae et sapiente corporis ut officia iure. Aut necessitatibus tempora vel voluptatem ipsum ea omnis reiciendis ab quia sunt sit perferendis iste ut vero error et minima consequuntur. Qui dolores reiciendis ut rerum nesciunt rem alias voluptas eum voluptatem tempore eum nostrum Quis.", {delay: 0}) //tempo de digitação
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })
    it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        
    })
})