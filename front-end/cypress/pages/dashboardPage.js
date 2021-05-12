/// <reference types ="cypress" />

//Elements

const LOGOUT_BTN ='.user > .btn'
const VIEW_ROOMS_BTN = ':nth-child(1) > .btn'
const VIEW_CLIENTS_BTN = '.blocks > :nth-child(2) > .btn'
const VIEW_BILLS_BTN = ':nth-child(3) > .btn'

//Actions/Methods/Functions

function performLogout(confirmationContent){
cy.get(LOGOUT_BTN).click()
cy.contains(confirmationContent)
}

function viewRooms(confirmationContent){
    cy.get(VIEW_ROOMS_BTN).click()
    cy.contains(confirmationContent)
}

function viewClients(confirmationContent){
    cy.get(VIEW_CLIENTS_BTN).click()
    cy.contains(confirmationContent)
}

function viewBills(confirmationContent){
    cy.get(VIEW_BILLS_BTN).click()
    cy.contains(confirmationContent)
}


//Exports

module.exports = {
    performLogout,
    viewRooms,
    viewClients,
    viewBills
}