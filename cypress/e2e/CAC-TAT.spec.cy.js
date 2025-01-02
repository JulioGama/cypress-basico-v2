/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(function() {
    cy.visit('./src/index.html')
  });
 
it('verifica o título da aplicação', function() {
    cy.title().should('eq','Central de Atendimento ao Cliente TAT')
  });

it('preenche os campos obrigatórios e envia o formulário', function() {
  const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'
  cy.get('[id=firstName]').type('JULIO')
  cy.get('[id=lastName]').type('GAMA')
  cy.get('[id=email]').type('TESTE@TESTE.COM.BR')
  cy.get('[id=phone]').type('19999999999')
  cy.get('#product').select('YouTube');
  cy.get('input[name="atendimento-tat"][value="elogio"]').check();
  cy.get('#email-checkbox').check();
  cy.get('[id=open-text-area]').type(longText, {delay: 0})
  cy.contains('button', 'Enviar').click()
  cy.get('.success').should('be.visible')
});

it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
  const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'
  cy.get('[id=firstName]').type('JULIO')
  cy.get('[id=lastName]').type('GAMA')
  cy.get('[id=email]').type('TESTE TESTE.COM.BR')
  cy.get('[id=phone]').type('19999999999')
  cy.get('#product').select('YouTube');
  cy.get('input[name="atendimento-tat"][value="elogio"]').check();
  cy.get('#email-checkbox').check();
  cy.get('[id=open-text-area]').type(longText, {delay: 0})
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')
});

  it('campo telefone continua vazio quando preenchido com valor não-numerico', function() {
    cy.get('[id=phone]').type('abcdefghij')
      .should('have.value','')
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
  const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'
  cy.get('[id=firstName]').type('JULIO')
  cy.get('[id=lastName]').type('GAMA')
  cy.get('[id=email]').type('TESTE TESTE.COM.BR')
  cy.get('#product').select('YouTube');
  cy.get('input[name="atendimento-tat"][value="elogio"]').check();
  cy.get('#phone-checkbox').click();
  cy.get('[id=open-text-area]').type(longText, {delay: 0})
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('[id=firstName]').type('JULIO').should('have.value','JULIO')
    cy.get('[id=firstName]').clear().should('have.value','')
    cy.get('[id=lastName]').type('GAMA').should('have.value','GAMA')
    cy.get('[id=lastName]').clear().should('have.value','')
    cy.get('[id=email]').type('TESTE@TESTE.COM.BR').should('have.value','TESTE@TESTE.COM.BR')
    cy.get('[id=email]').clear().should('have.value','')
    cy.get('[id=phone]').type('16999999999').should('have.value','16999999999')
    cy.get('[id=phone]').clear().should('have.value','')
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  });

  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldAndSubmit()
    cy.get('.success').should('be.visible')
  });

  it('seleciona um produto (YouTube) por seu texto', function() {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  });

  it('seleciona um produto (Mentoria) por seu valor', function() {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  });

  it('seleciona um produto (Blog) por seu índice', function() {
    cy.get('#product').select(1).should('have.value', 'blog')
  });

  it('marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"]').check('feedback')
    cy.get('input[type="radio"][value="feedback"]').should('be.checked')
  });

  it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  });

  it('marca ambos checkboxes, depois desmarca o último', function() {
    cy.get('input[type="checkbox"]')
      .check().should('be.checked')
      .last().uncheck().should('not.be.checked')
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
  const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'
  cy.get('[id=firstName]').type('JULIO')
  cy.get('[id=lastName]').type('GAMA')
  cy.get('[id=email]').type('TESTE TESTE.COM.BR')
  cy.get('#product').select('YouTube');
  cy.get('input[name="atendimento-tat"][value="elogio"]').check();
  cy.get('#phone-checkbox').check().should('be.checked');
  cy.get('[id=open-text-area]').type(longText, {delay: 0})
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')
  });

  it('seleciona um arquivo da pasta fixtures', function() {
    cy.get('input[type="file"]').should('not.have.value')
    cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
    })
  });

  it('seleciona um arquivo simulando um drag-and-drop', function() {
    cy.get('input[type="file"]').should('not.have.value')
      .selectFile('cypress/fixtures/example.json',{ action: 'drag-drop'})
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')})
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]').should('not.have.value')
      .selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()

    cy.contains('Talking About Testing').should('be.visible')
  });
});