/// <reference types ="cypress" />

//Elements
const BACK_BTN_CLIENTS = ':nth-child(3) > .btn'
const CREATE_NEW_CLIENT_BTN = 'h2 > .btn'
const CLIENTS_NAME_FIELD = ':nth-child(1) > input'

const CLIENT_LIST = '.client'
const THREE_DOTTS_BTN = '.action > img'
const EDIT_CLIENT_BTN = '.menu > :nth-child(1)'

//const TOTAL_AMOUNT_CLIENTS = '.blocks > :nth-child(2) > div'
//const REDUCED_AMOUNT_CLIENTS = ''
const DELETE_CLIENT_BTN = '.menu > :nth-child(2)'

//Actions/Methods/Functions

function backToDashboardFromClients(confirmationContent){
    cy.get(BACK_BTN_CLIENTS).click()
    cy.contains(confirmationContent)
    cy.wait(500)
}

function createNewClient(confirmationContent){
    cy.get(CREATE_NEW_CLIENT_BTN).click()
    cy.contains(confirmationContent)
    cy.wait(500)
}

function confirmingNewClient(name,email,telephone){
    cy.get(CLIENT_LIST).last()
    .should('contain', name)
    .and('contain', email)
    .and('contain', telephone)
}

function editLastClient(confirmationContent){
    cy.get(THREE_DOTTS_BTN).last().click()
    cy.get(EDIT_CLIENT_BTN).click()
    cy.contains(confirmationContent)
}

function verifyEditedClient(name, email, telephone){
    cy.get(CLIENT_LIST).last()
    .should('contain',name)
    .and('contain' ,email)
    .and('contain' ,telephone)
    cy.wait(500) 
}

function deleteLastClient(){
    //cy.contains(TOTAL_AMOUNT_CLIENTS)
    cy.get(THREE_DOTTS_BTN).last().click()
    cy.get(DELETE_CLIENT_BTN).click() 
    cy.wait(500)
    //cy.contains()
}


//Exports

module.exports = {
    backToDashboardFromClients,
    createNewClient,
    confirmingNewClient,
    editLastClient,
    verifyEditedClient,
    deleteLastClient
}