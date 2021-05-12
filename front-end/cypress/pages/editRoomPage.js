/// <reference types ="cypress" />

//Elements
const CATEGORY_FIELD = ':nth-child(3) > select'
const NUMBER_FIELD = ':nth-child(4) > input'
const FLORR_FIELD = ':nth-child(5) > input'
const AVAILABILTY_BOX = '.checkbox'
const PRICE_FIELD = ':nth-child(7) > input'
const FEATURES_SELECTOR = ':nth-child(8) > select'
const BALCONY_SELECTOR = '[value="balcony"]'
const ENSUIT_SELECTOR = '[value="ensuite"]'
const SEA_VIEW_SELECTOR = '[value="sea_view"]'
const PENTHOUSE_SELECTOR = '[value="penthouse"]'

const SAVE_BTN = '.blue'

//Actions/Methods/Functions
function editRoom(category,number,floor,x,price,[BALCONY_SELECTOR, SEA_VIEW_SELECTOR]){
    cy.get(CATEGORY_FIELD).select(category)
    cy.get(NUMBER_FIELD).clear().type(number)
    cy.get(FLORR_FIELD).clear().type(floor)
    cy.get(AVAILABILTY_BOX).click()
    cy.get(PRICE_FIELD).clear().type(price)
    cy.get(FEATURES_SELECTOR).select([BALCONY_SELECTOR, SEA_VIEW_SELECTOR])
    }
    function saveEditedRoom(confirmationContent){
        cy.get(SAVE_BTN).click()
        cy.contains(confirmationContent)
        cy.wait(500)
    }

//Exports
module.exports = {
    editRoom,
    saveEditedRoom
}