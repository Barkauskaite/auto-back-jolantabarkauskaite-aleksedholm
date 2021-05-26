/// <reference types="cypress" />

describe('Test suite', () => {

    it('test case 1 login/logout ', () => {
      cy.login().then(cy.logout)
    })
    
  
    it('test case 2 GoRooms/logout ', () => {
      cy.login().then(cy.rooms).then(cy.logout)
    })
  
  
    it('test case 3 RoomCreat ', () => {
      cy.login().then(cy.roomCreate).then(cy.logout)
    })
  
  
    it('test case 4  RoomCreate/Edit', () => {
      cy.login().then(cy.roomEditLasatID).then(cy.logout)
    })
  
  
    it('test case 5 RoomCreate/Delete ', () => {
      cy.login().then(cy.roomDelLastID).then(cy.logout)
    })
  
  
    it('test case 6 GoClients/logout ', () => {
      cy.login().then(cy.clients).then(cy.logout)
    })
  
  
    it('test case 7 ClientCreat ', () => {
      cy.login().then(cy.clientCreate).then(cy.logout)
    })
  
  
    it('test case 8 ClientCreate/Edit ', () => {
      cy.login().then(cy.clientEditLastID).then(cy.logout)
    })
  
  
    it('test case 9 ClientCreate/Delete ', () => {
      cy.login().then(cy.clientDelLastID).then(cy.logout)
    })
  
  
    it('test case 10 GoBills/logout ', () => {
      cy.login().then(cy.bills).then(cy.logout)
    })
  
  
  /*
  // Rafaels postman test case
  
      it('test case 1 ', () => {
          cy.login().then((response => {
              cy.request({
                  method: 'GET', 
                  url: 'http://localhost:3000/api/clients',
                  headers: {
                      'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                      'Content-Type': 'application/json'
                  }
              })
          })).then((response => {
              expect(response.status).to.eq(200)
              cy.log(JSON.stringify(response.body))
          })).then(cy.logout)
      })
  
      // end of rafaels postman test case 
  */

})