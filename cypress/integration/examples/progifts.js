/// <reference types= "cypress"/>
/// <reference types= "cypress-iframe"/>

import 'cypress-iframe';

describe('Progifts Website Test', ()=> {
    before(() => {
        cy.fixture('example').as('recipientData');
    });

    it('Send Nike card to multiple recipients', ()=> {

        cy.visit('https://giftit-ng-ui-qa.progifts.io/catalog');

        //Look for 'golfsmith' card, if not found, choose 'Nike'
        cy.get('.catalog-search').type('golfsmith');
        cy.get('button').contains('Search').click();
        cy.get('.container').contains("We couldn’t find anything for").then((cards) => {
            if(cards.length){
                cy.get('.catalog-search').clear().type('nike');
                cy.get('button').contains('Search').click();
                cy.get('app-store-item').contains('Nike').click();
            } else {
                cy.log("Found. Do Nothing.")
            }
        });
        
        cy.url().should('include', '/products');
        
        //Choose amount
        cy.get('app-nomination').contains('$75').click();
        cy.get('button.continue').contains('Continue').click();

        cy.url().should('include', '/who-is-it-for');

        //Determine the recipients
        cy.get('.form-switch button').contains('Multiple recipients').click();
        cy.get('button.add-giftee').contains('Add recipient').click();

        cy.get('@recipientData').then((data) => {
            cy.addRecipients(data.name, data.email); // addRecipients command: implemented in the commands.js file
        });


        cy.removeRecipients("qdaqqa@itgsoftware.com"); // removeRecipients command: implemented in the commands.js file
        cy.removeRecipients("user1@test.com");
        cy.wait(5000);

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
        /*cy.iframe('iframe[name="__privateStripeFrame6993"]').find('input').type('4111111111111111');
        cy.wait(1000);
        cy.get('#name').type('Qasem');
        cy.wait(1000);
        cy.iframe('iframe[name="__privateStripeFrame6994"]').find('input').type('0326');
        cy.wait(1000);
        cy.iframe('iframe[name="__privateStripeFrame6995"]').find('input').type('111');
        cy.wait(1000);
        cy.get('#form-submit-btn').contains("Checkout").click();    
        cy.wait(15000);
        cy.url().should('include', '/success');
        */
        cy.get('ngx-stripe-card-number iframe').its('0.contentDocument.body').find('input[name="cardnumber"]').type('4111111111111111');
        cy.wait(1000);
        cy.get('#name').type('Qasem');
        cy.wait(1000);
        cy.get('ngx-stripe-card-expiry iframe').its('0.contentDocument.body').find('input[name="exp-date"]').type('0326');
        cy.wait(1000);
        cy.get('ngx-stripe-card-cvc iframe').its('0.contentDocument.body').find('input[name="cvc"]').type('111');
        cy.wait(1000);
        cy.get('#form-submit-btn').contains("Checkout").click();    
        cy.wait(5000);
        cy.get('.message h2').should('contain', 'Your gift is on its way!');
        

    });
});
