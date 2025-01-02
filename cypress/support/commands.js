Cypress.Commands.add('fillMandatoryFieldAndSubmit', function() {
  cy.get('[id=firstName]').type('JULIO')
  cy.get('[id=lastName]').type('GAMA')
  cy.get('[id=email]').type('TESTE@TESTE.COM.BR')
  cy.get('[id=phone]').type('19999999999')
  cy.get('#product').select('YouTube');
  cy.get('input[name="atendimento-tat"][value="elogio"]').check();
  cy.get('#email-checkbox').check();
  cy.get('[id=open-text-area]').type('Teste!')
  cy.get('button[type="submit"]').click()
});