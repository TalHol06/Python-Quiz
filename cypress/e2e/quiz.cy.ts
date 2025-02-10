describe('API Request', () => {
  it('should GET all questions when the quiz is started', () => {
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
    cy.visit('/', { timeout: 30000 });
    cy.wait('@getQuestions').then((intercept) => {
      cy.fixture('questions.json').then((data) => {
        expect(intercept.response?.body).to.deep.equal(data);
      });
    });
  });
});