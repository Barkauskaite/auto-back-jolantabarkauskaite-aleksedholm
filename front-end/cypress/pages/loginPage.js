/// <reference types ="cypress" />

//Web-elements
const LOGIN_PAGE_TITTLE = 'Testers Hotel'
const USERNAME_TEXTFIELD = ':nth-child(1) > input'
const PASSWORD_TEXTFIELD = ':nth-child(2) > input'
const SUBBMIT_BTN = '.btn'
const FORM_LABEL = 'Login'

//Actions/Methods/Functions
function checkLoginPageTitle(){
    cy.title().should('eq', LOGIN_PAGE_TITTLE)
}

function performValidLogin(username, password, confirmationContent){
    cy.get(USERNAME_TEXTFIELD).type(username)
    cy.get(PASSWORD_TEXTFIELD).type(password)
    cy.get(SUBBMIT_BTN).click()
    cy.contains(confirmationContent)
    cy.wait(500)
}

//Exports


module.exports={   
    checkLoginPageTitle,
    performValidLogin
}
