describe('API Request', () => {
  const mockQuestion = [
    {
      "question": "What is 100 % 4?",
      "answers": [
        {"text": "8", "isCorrect": false},
        {"text": "4", "isCorrect": false},
        {"text": "0", "isCorrect": true},
        {"text": "16", "isCorrect": false}
      ]
    }
  ]

  it('should GET all questions when the quiz is started', () => {
    cy.intercept('GET', '/api/questions/random', mockQuestion).as('getQuestions');
    cy.visit('/');
    cy.get('button').should('have.text', 'Start Quiz').click();
    cy.wait('@getQuestions').its('response.body').should('deep.equal', mockQuestion);
  });
});