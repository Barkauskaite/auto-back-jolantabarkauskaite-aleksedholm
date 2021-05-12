/// <reference types ="cypress" />

//Elements
const CLIENTS_NAME_FIELD = ':nth-child(1) > input'
const CLIENTS_EMAIL_FIELD = ':nth-child(2) > input'
const CLIENTS_TELEPHONE = ':nth-child(3) > input'


const NEW_CLIENT_SAVE_BTN = '.blue'


//Actions/Methods/Functions
function creatingNewClient(name, email, telephone){
    cy.get(CLIENTS_NAME_FIELD).type(name)
    cy.get(CLIENTS_EMAIL_FIELD).type(email)
    cy.get(CLIENTS_TELEPHONE).type(telephone)  
}
function savingNewClient(confirmationContent){
    cy.get(NEW_CLIENT_SAVE_BTN).click()
    cy.contains(confirmationContent)
    cy.wait(500)
}


//Exports

module.exports = {
    creatingNewClient,
    savingNewClient
}