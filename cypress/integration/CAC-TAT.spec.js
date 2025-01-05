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
        cy.get('#firstName').type("João")
        cy.get('#lastName').type("Hayden")
        cy.get('#email').type("joaohaydengmail.com")
        cy.get('#open-text-area').type('Teste') 
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })
    
    it('valida campo vazio ao tentar digitar valor não numérico no telefone', function(){
        cy.get('#phone').type('Teste').should('have.value','') //se usar o not have pode ser mt trabalho -> usa o have.value e verifica se veio vazio
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type("João")
        cy.get('#lastName').type("Hayden")
        cy.get('#email').type("joaohayden@gmail.com")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste') 
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

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit() //chama função em cypress\support\commands.js
    })

    it('utiliza cy.contains para testar botão', function(){
        cy.contains('button','Enviar').click() //utilizou o contains pra trocar o seletor
        cy.get('.error').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value','youtube')//clicar em um item de um select pelo texto e confirmar pelo value
    })
    
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value','blog')
    })

    it('marca o tipo de atendimento "Feedback', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback') //aqui se usou tanto radio quanto feedback, seletor mais legível
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked','ajuda')
        cy.get('input[type="radio"][value="elogio"]').check().should('be.checked','elogio')
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked','feedback')
    })

    //mesmo utilizando each e wrap
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]').each(($radio) => {
            cy.wrap($radio).check().should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })

    //revisão do teste de telefone obrigatório
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type("João")
        cy.get('#lastName').type("Hayden")
        cy.get('#email').type("joaohayden@gmail.com")
        cy.get('input[type="checkbox"]').check('phone').should('be.checked')
        cy.get('#open-text-area').type('Teste') 
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    //anexos
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload') //tipo de seletor + id -> esse ficou massa
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json') //aqui adicionou o arquivo
        .should(($input) => {
            //console.log($input)
            expect($input[0].files[0].name).to.equal('example.json') //verficiar dentro do array onde está o arquivo e verificar se o nome é o mesmo
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload').should('not.have.value').selectFile('./cypress/fixtures/example.json', {action: "drag-drop"})
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload').selectFile('@sampleFile') //@ pra selecionar o alias
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })        
    })

    //essa é a alternativa 1 onde dá muita volta pra mexer com o attr/target/_blank

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank');

    }) 

    //essa é a alternativa 2 utilizando o invoke
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click() //remove atributo e target e abre o blank na mesma pagina
        cy.url().should('include', 'privacy.html') //valida se abriu
    })
    
})

