describe('Testes da aplicação Agenda de Contatos', () => {
  const baseUrl = 'https://agenda-contatos-react.vercel.app/';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.wait(2000); // Wait for the page to load completely
  });

  it('Deve incluir um novo contato', () => {
    cy.get('[placeholder="Nome"]').should('be.visible').type('João da Silva');
    cy.get('[placeholder="E-mail"]').should('be.visible').type('joao.silva@example.com');
    cy.get('[placeholder="Telefone"]').should('be.visible').type('11999999999');
    cy.get('button').contains('Adicionar').click();

    cy.wait(2000); // Wait for the contact to be added
    cy.contains('João da Silva', { timeout: 10000 }).should('exist');
    cy.contains('joao.silva@example.com').should('exist');
    cy.contains('11999999999').should('exist');
  });

  it('Deve alterar um contato existente', () => {
    // Supondo que o contato "João da Silva" já foi adicionado
    cy.contains('João da Silva').should('exist').parent().within(() => {
      cy.get('button').contains('Edit').click();
    });
    cy.get('[placeholder="Nome"]').clear().type('João Silva');
    cy.get('[placeholder="E-mail"]').clear().type('joao.silva.novo@example.com');
    cy.get('[placeholder="Telefone"]').clear().type('11988888888');
    cy.get('button').contains('alterar').click();

    cy.contains('João Silva', { timeout: 10000 }).should('exist');
    cy.contains('joao.silva.novo@example.com').should('exist');
    cy.contains('11988888888').should('exist');
  });

  it('Deve remover um contato', () => {
    // Supondo que o contato "João Silva" já foi alterado
    cy.contains('João Silva').should('exist').parent().within(() => {
      cy.get('button').contains('delet').click();
    });

    cy.contains('João Silva', { timeout: 10000 }).should('not.exist');
    cy.contains('joao.silva.novo@example.com').should('not.exist');
    cy.contains('11988888888').should('not.exist');
  });
});