// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-iframe';

Cypress.Commands.add("addRecipients", (rname, remail)=>{
    rname.forEach((name, i) => {
        cy.get('input[name="recipient-name"]').eq(i).type(name, { force: true });
        cy.get('input[name="recipient-email"]').eq(i).type(remail[i], { force: true });
        if (i < rname.length-1){
        cy.get('button.add-recipient').contains('Add recipients').click();
        }
    });
});

Cypress.Commands.add("removeRecipients", (remail) => {
    cy.get('tbody[formarrayname="receivers"] tr').each(($row) => {
        cy.wrap($row).find('td').eq(2).find('input[name="recipient-email"]').then(($emailInput) => {
            const emailText = $emailInput.val().trim();
            if (emailText === remail) {
                cy.wrap($row).find('img.remove-row').click({ force: true });
                return false;
            }
        });
    });
});

