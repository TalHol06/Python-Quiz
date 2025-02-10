import React from "react";
import Quiz from '../../client/src/components/Quiz';
import { Question } from "../../client/src/models/Question";

describe('<Quiz />', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
    cy.mount(<Quiz />);
  });

  it('should render the proper content if quiz has not started', () => {
    cy.get('button').should('have.text', 'Start Quiz');
  });

  it('should start the quiz once button is clicked', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('h2').should('be.visible');
    cy.get('button').should('be.visible');
  });

  it('should allow anwsering and tracks the score', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    cy.fixture('questions.json').then((questions) => {
      questions.forEach((q: Question, index: number) => {
        cy.get('h2').should('contain', q.question);
        cy.get('.btn-primary').first().click();
        if (index < questions.length - 1){
          cy.get('h2').should('not.contain', q.question);
        }
      });
    });
  });

  it('should complete the quiz and show final score when all questions are answered', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    cy.fixture('questions.json').then((questions) => {
      questions.forEach(() => {
        cy.get('.btn-primary').first().click();
      });

      cy.contains('Quiz Completed').should('be.visible');
      cy.contains('Your score').should('be.visible');
    });
  });

  it('should restart the quiz when the Take new Quiz button is clicked', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    cy.fixture('questions.json').then((questions) => {
      questions.forEach(() => {
        cy.get('.btn-primary').first().click();
      });

      cy.contains('Take New Quiz').click();
    })
  })
});