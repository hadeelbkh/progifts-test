/// <reference types= "cypress"/>
/// <reference types= "cypress-iframe"/>

import 'cypress-iframe';

describe('Progifts Website Test', () => {
    it('Send Nike card to multiple recipients', () => {

        cy.visit('https://giftit-ng-ui-qa.progifts.io/catalog');

        //Choose Nike card
        cy.get('.catalog-search').type('nike');
        cy.get('button').contains('Search').click();
        cy.get('app-store-item').contains('Nike').click();

        cy.url().should('include', '/products');

        //Choose amount
        cy.get('app-nomination').contains('$75').click();
        cy.get('button.continue').contains('Continue').click();

        cy.url().should('include', '/who-is-it-for');

        //Determine the recipients
        cy.get('.form-switch button').contains('Multiple recipients').click();
        cy.get('button.add-giftee').contains('Add recipient').click();

        cy.get('input[name="recipient-name"]').eq(0).type('Qasem', { force: true });
        cy.get('input[name="recipient-email"]').eq(0).type('qdaqqa@itgsoftware.com', { force: true });

        cy.get('button.add-recipient').contains('Add recipients').click();

        cy.get('input[name="recipient-name"]').eq(1).type('User', { force: true });
        cy.get('input[name="recipient-email"]').eq(1).type('user@test.com', { force: true });

        cy.get('#form-submit-btn').contains("Apply").click({ force: true });
        cy.get('#form-submit-btn').contains("Continue").click();

        cy.url().should('include', '/who-is-it-from');

        //Determine the sender 
        cy.get('input#gifterName').type('User');
        cy.get('input#gifterEmail').type('uu640824@gmail.com');

        cy.get('#form-submit-btn').contains("Continue").click();
        cy.wait(1000);
        cy.url().should('include', '/checkout');

        //Perform payment
        cy.get('ngx-stripe-card-number iframe').its('0.contentDocument.body').find('input[name="cardnumber"]').type('4111111111111111');
        cy.wait(1000);
        cy.get('#name').type('Qasem');
        cy.wait(1000);
        cy.get('ngx-stripe-card-expiry iframe').its('0.contentDocument.body').find('input[name="exp-date"]').type('0326');
        cy.wait(1000);
        cy.get('ngx-stripe-card-cvc iframe').its('0.contentDocument.body').find('input[name="cvc"]').type('111');
        cy.wait(1000);
        cy.get('#form-submit-btn').contains("Checkout").click();    
        cy.wait(10000);
        cy.url().should('include', '/success');
    });
});
