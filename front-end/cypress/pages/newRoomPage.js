/// <reference types ="cypress" />

//Elements
const CATEGORY_FIELD = ':nth-child(1) > select'
const NUMBER_FIELD = ':nth-child(2) > input'
const FLORR_FIELD = ':nth-child(3) > input'
const AVAILABILTY_BOX = '.checkbox'
const PRICE_FIELD = ':nth-child(5) > input'
const FEATURES_SELECTOR = ':nth-child(6) > select'
const SAVE_BTN = '.blue'

//Actions/Methods/Functions
function createANewRoom(category,number,floor,x,price,features){
cy.get(CATEGORY_FIELD).select(category)
cy.get(NUMBER_FIELD).type(number)
cy.get(FLORR_FIELD).type(floor)
cy.get(AVAILABILTY_BOX).click(x)
cy.get(PRICE_FIELD).type(price)
cy.wait(500)
cy.get(FEATURES_SELECTOR).select(features)
}

function saveANewRoom(confirmationContent){
    cy.get(SAVE_BTN).click()
    cy.contains(confirmationContent)
    cy.wait(500)
}


//Exports
module.exports = {
    createANewRoom,
    saveANewRoom
}
