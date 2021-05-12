/// <reference types ="cypress" />


//Elements

const BACK_BTN = ':nth-child(3) > .btn'
const CREATE_ROOM_BTN = 'h2 > .btn'
const ROOMS_LIST = '.room'
const THREE_DOTTS_BTN = '.action > img'
const DELETE_BTN = '.menu > :nth-child(2)'
const EDIT_BTN = '.menu > :nth-child(1)'

//const BLC_FTR = ':nth-child(41) > :nth-child(2) > .features > :nth-child(1)'
//const SEA_W_FTR = '.features > :nth-child(2)'
//const ALL_FEATURES = ':nth-child(2) > :nth-child(2) > .features'



//Actions/Methods/Functions

function backToDashboardFromRooms(confirmationContent){
    cy.get(BACK_BTN).click()
    cy.contains(confirmationContent)
    cy.wait(500)
}

function createRoom(confirmationContent){
    cy.get(CREATE_ROOM_BTN).click()
    cy.contains(confirmationContent)
}

function verifyNewRoom(category,number,floor,x,price,features){
    cy.get(ROOMS_LIST).last()
    .should('contain', category)
    .and('contain',number)
    .and('contain',floor)
    .and('be.visible',x)
    .and('contain', price)
    .and('contain',features)
    cy.wait(500)
}
function openFreeDottsAndEdit(confirmationContent){
    cy.get(THREE_DOTTS_BTN).last().click()
    cy.get(EDIT_BTN).click()
    cy.contains(confirmationContent)
}
function verifyEditedRoom(category,number,floor,x,price,[]){
    cy.get(ROOMS_LIST).last()
    .should('contain', category)
    .and('contain',number)
    .and('contain',floor)
    .and('be.visible',x)
    .and('contain', price)
    //.and('contain', [])
    cy.get(ROOMS_LIST).last().should('contain',[])
      
}

function openFreeDottsAndDelete(){
    cy.get(THREE_DOTTS_BTN).last().click()
    cy.get(DELETE_BTN).click() 
    cy.wait(500)
}


//Exports

module.exports ={
    backToDashboardFromRooms,
    createRoom,
    verifyNewRoom,
    openFreeDottsAndDelete,
    openFreeDottsAndEdit,
    verifyEditedRoom
}
