/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação',function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.clock()//congela o relogio do browser
        const longText = 'Lorem ipsum dolor sit amet' //adicionar const pra deixar o código menos mockado
        cy.get('#firstName').type("João")
        cy.get('#lastName').type("Hayden")
        cy.get('#email').type("joaohayden@gmail.com")
        cy.get('#open-text-area').type(longText, {delay: 0})//tempo de digitação
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.clock()
        cy.get('#firstName').type("João")
        cy.get('#lastName').type("Hayden")
        cy.get('#email').type("joaohayden,gmail.com")
        cy.get('#open-text-area').type('Teste') 
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')

    })
    
    it('valida campo vazio ao tentar digitar valor não numérico no telefone', function(){
        cy.get('#phone').type('Teste').should('have.value','') //se usar o not have pode ser mt trabalho -> usa o have.value e verifica se veio vazio
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.clock()
        cy.get('#firstName').type("João")
        cy.get('#lastName').type("Hayden")
        cy.get('#email').type("joaohayden@gmail.com")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste') 
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
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
        cy.clock()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit() //chama função em cypress\support\commands.js
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
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

    //utilização do lodash com times
    it('preenche os campos obrigatórios e envia o formulário, alterando name para 5 diferentes', function() {
        const longText = 'Lorem ipsum dolor sit amet'
        const nomes =['Anakin','Padmé','Leia','Luke','Obi-Wan']
        Cypress._.times(nomes.length, (index)=> {
        cy.clock()
        cy.get('#firstName').type(nomes[index])
        cy.get('#lastName').type("Hayden")
        cy.get('#email').type("joaohayden@gmail.com")
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
        })
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function(){
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', function(){
        const textExample = 'Esse é o texto preenchido pelo invoke'
        cy.get('#open-text-area').invoke('val',textExample).should('have.value',textExample)
    })

    it('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should((response) =>{
            expect(response.status).to.eq(200)
            expect(response.statusText).to.eq('OK')
            expect(response.body).contains('CAC TAT')
        })
    })

    it('desafio encontre o gato', function(){
        cy.get('#cat').invoke('show').should('be.visible')
        cy.get('#title').invoke('text', 'CAT TAT')
        cy.get('#subtitle').invoke('text', 'Finalizei o curso!')
    })
})
