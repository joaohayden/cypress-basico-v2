/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação',function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Lorem ipsum dolor sit amet. Et ipsam Quis vel quia recusandae et sapiente corporis ut officia iure. Aut necessitatibus tempora vel voluptatem ipsum ea omnis reiciendis ab quia sunt sit perferendis iste ut vero error et minima consequuntur.' //adicionar const pra deixar o código menos mockado
        cy.get('#firstName').type("João")
        cy.get('#lastName').type("Hayden")
        cy.get('#email').type("joaohayden@gmail.com")
        cy.get('#open-text-area').type(longText, {delay: 0})//tempo de digitação
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })
    
    it('valida campo vazio ao tentar digitar valor não numérico no telefone', function(){
        cy.get('#phone').type('Teste').should('have.value','') //se usar o not have pode ser mt trabalho -> usa o have.value e verifica se veio vazio
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        const firstName = 'João'
        const lastName = 'Hayden'
        const email = 'joaohayden@gmail.com'
        const phone = '92981020175'
        cy.get('#firstName').type(firstName).should('have.value',firstName).clear().should('have.value','')
        cy.get('#lastName').type(lastName).should('have.value',lastName).clear().should('have.value','')
        cy.get('#email').type(email).should('have.value',email).clear().should('have.value','')
        cy.get('#phone').type(phone).should('have.value',phone).clear().should('have.value','')
    })

    it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

})