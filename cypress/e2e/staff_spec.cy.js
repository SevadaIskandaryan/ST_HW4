const HOME_URL = "https://staff.am/"
const JOB_URL = "https://staff.am/en/jobs"

const JOB_NAME = "devops"

// staffAmTests.spec.js

describe('Staff.am Tests', () => {

  beforeEach(() => {
    cy.visit(HOME_URL);
  });

  it('Should search for jobs on the home page', () => {
    cy.get('input[id="jobsfilter-key_word"]').type(JOB_NAME).should('have.value', JOB_NAME);
    cy.get('.search-btn').click();
    cy.get('input[id="jobsfilter-key_word"]').should('have.value', JOB_NAME);
  });

  it('Should navigate to a job page and search directly from job page', () => {
    cy.visit(JOB_URL);
    cy.get('input[id="jobsfilter-key_word"]').type(JOB_NAME).should('have.value', JOB_NAME);
    cy.get('#btn_search_keyword').click();
    cy.get('#w0').first().find('a').invoke('attr', 'href').then((href) => {
      cy.visit("https://staff.am" + href);
      cy.get('.job-info').contains('Employment term').should('exist');
    });
  });

  it('Should apply filters on job page and verify filtered results', () => {
    cy.visit(JOB_URL);
    cy.get('#jobsfilter-category').should('exist');
    cy.get('#jobsfilter-category').find('input[type="checkbox"]').should('exist');
    cy.get('#jobsfilter-category').find('input[type="checkbox"]').first().check();

    cy.get('#w0').should('have.length.greaterThan', 0);
    cy.get('#w0').first().find('a').invoke('attr', 'href').then((href) => {
      cy.visit("https://staff.am" + href);
      cy.get('.job-info').contains('Employment term').should('exist');
    });
  });
});
