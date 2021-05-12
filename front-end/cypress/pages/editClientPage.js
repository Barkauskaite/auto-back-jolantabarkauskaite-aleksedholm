/// <reference types ="cypress" />

//Elements
const EDIT_CLIENTS_NAME_FIELD = ':nth-child(3) > input'
const EDIT_CLIENTS_EMAIL_FIELD = ':nth-child(4) > input'
const EDIT_CLIENTS_TELEPHONE_FIELD = ':nth-child(5) > input'

const SAVE_EDITED_CLIENT_BTN = '.blue'

//Actions/Methods/Functions

function editRoom(name,email,telephone){
    cy.get(EDIT_CLIENTS_NAME_FIELD).clear().type(name)
    cy.get(EDIT_CLIENTS_EMAIL_FIELD).clear().type(email)
    cy.get(EDIT_CLIENTS_TELEPHONE_FIELD).clear().type(telephone)
    }

function saveEditedClient(confirmationContent){
    cy.get(SAVE_EDITED_CLIENT_BTN).click()
    cy.wait(500)
    cy.contains(confirmationContent)
}

//Exports
module.exports = {
    editRoom,
    saveEditedClient
}
