/// <reference types ="cypress" />

//Elements
const BACK_BTN_BILLS = ':nth-child(3) > .btn'


//Actions/Methods/Functions
function backToDashboardFromBills(confirmationContent){
    cy.get(BACK_BTN_BILLS).click()
    cy.contains(confirmationContent)
    cy.wait(500)
}

module.exports = {
    backToDashboardFromBills
}