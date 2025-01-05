describe('Teste da página de política de privacidade', function(){
    it.only('testa a página da política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        //cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()
        cy.title().should('include','Política de privacidade') 
    })
})





