// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// extra linkes
  // https://docs.cypress.io/api/cypress-api/custom-commands#Syntax

  // https://docs.cypress.io/api/commands/request#Options


const faker = require('faker')

// login ////////////////////////////////////////////////////////////////////////////////////////////////

Cypress.Commands.add('login', () => {
  const USER_CREDENTIALS = {
    "username": "tester01",
    "password": "GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
  }
  cy.request({
    method:'POST',
    url:'http://localhost:3000/api/login',
    headers: {
      'Content-Type':'application/json'
    },
    body: USER_CREDENTIALS
  }).then((response => {
    expect(response.status).to.eq(200)
    Cypress.env({loginToken:response.body})
    cy.log(response.body)
  }))
})


// logout ////////////////////////////////////////////////////////////////////////////////////////////////

Cypress.Commands.add('logout', () => {
  cy.request({
    method:'POST',
    url:'http://localhost:3000/api/logout',
    headers: {
      'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
      'Content-Type': 'application/json'
    }
  }).then((response => {
    expect(response.status).to.eq(200)
    cy.log(JSON.stringify(response.body))
  }))
})


//GoToRooms ////////////////////////////////////////////////////////////////////////////////////////////////

Cypress.Commands.add('rooms', () => {
  cy.request({
  method:'GET',
  url:'http://localhost:3000/api/rooms',
  headers: {
    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
    'Content-Type': 'application/json'
  }
  }).then((response => {
    expect(response.status).to.eq(200)
    cy.log(JSON.stringify(response.body))
  }))
})


//RoomCreate ////////////////////////////////////////////////////////////////////////////////////////////////

Cypress.Commands.add('roomCreate', () => {
  cy.request({
    method:'POST',
    url:'http://localhost:3000/api/room/new',
    headers: {
      'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
      'Content-Type': 'application/json'
    },
    body: {
      "category":"double",
      "floor": faker.datatype.number(),
      "number":faker.datatype.number(),
      "available":true,
      "price":faker.datatype.number(),
      "features":["balcony","ensuite"]
    }
  }).then((response => {
    expect(response.status).to.eq(200)
    cy.log(JSON.stringify(response.body))
  }))
})


// Room Edit LastID ////////////////////////////////////////////////////////////////////////////////////////////////

Cypress.Commands.add('roomEditLasatID', () => {
  cy.login().then((responseA => {
    cy.request({
      method: 'GET', 
      url: 'http://localhost:3000/api/rooms', 
      headers: {
        'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
        'Content-Type': 'application/json'
      }
    }).then((responseB =>{
      expect(responseB.status).to.eq(200)
      let lastID = responseB.body[responseB.body.length -1].id
      cy.log(lastID)
      cy.request({
        method: 'PUT', 
        url: 'http://localhost:3000/api/room/'+lastID, 
        headers: {
          'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
          'Content-Type': 'application/json'
        },
        body:{
          "id": lastID,
          "category":"double",
          "floor":faker.datatype.number(),
          "number":faker.datatype.number(),
          "available":true,
          "price":faker.datatype.number(),
          "features":["balcony","ensuite"]
        }
      }).then((responseC => {
        expect(responseC.status).to.eq(200)
        cy.log(JSON.stringify(responseC.body))
      }))
    }))
  }))
})


// Room Delete LastID ////////////////////////////////////////////////////////////////////////////////////////////////

Cypress.Commands.add('roomDelLastID', () => {
  cy.login().then((responseA => {
    cy.request({
      method: 'GET', 
      url: 'http://localhost:3000/api/rooms', 
      headers: {
        'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
        'Content-Type': 'application/json'
      }
    }).then((responseB =>{
      expect(responseB.status).to.eq(200)
      let lastID = responseB.body[responseB.body.length -1].id
      cy.log(lastID)
      cy.request({
        method: 'DELETE', 
        url: 'http://localhost:3000/api/room/'+lastID, 
        headers: {
          'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
          'Content-Type': 'application/json'
        }
      }).then((responseC => {
        expect(responseC.status).to.eq(200)
        cy.log(JSON.stringify(responseC.body))
      }))
    }))
  }))
})


// GoToClients ////////////////////////////////////////////////////////////////////////////////////////////////

Cypress.Commands.add('clients', () => {
  cy.request({
    method:'GET',
    url:'http://localhost:3000/api/clients',
    headers: {
      'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
      'Content-Type': 'application/json'
    }
  }).then((response => {
    expect(response.status).to.eq(200)
    cy.log(JSON.stringify(response.body))
  }))
})


// ClientsCreate ////////////////////////////////////////////////////////////////////////////////////////////////

Cypress.Commands.add('clientCreate', () => {
  cy.request({
    method:'POST',
    url:'http://localhost:3000/api/client/new',
    headers: {
      'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
      'Content-Type': 'application/json'
    },
    body:{
      "name": faker.name.firstName(),
      "email": faker.internet.email(),
      "telephone": faker.phone.phoneNumber()
    }
  }).then((response => {
    expect(response.status).to.eq(200)
    cy.log(JSON.stringify(response.body))
  }))
})


// Client edit LastID ////////////////////////////////////////////////////////////////////////////////////////////////

Cypress.Commands.add('clientEditLastID', () => {
  cy.login().then((responseA => {
      cy.request({
        method: 'GET', 
        url: 'http://localhost:3000/api/clients', 
        headers: {
          'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
          'Content-Type': 'application/json'
        }
      }).then((responseB =>{
          expect(responseB.status).to.eq(200)
          let lastID = responseB.body[responseB.body.length -1].id
          cy.log(lastID)
          cy.request({
            method: 'PUT', 
            url: 'http://localhost:3000/api/client/'+lastID, 
            headers: {
              'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
              'Content-Type': 'application/json'
            },
            body: {  
              "id":lastID,
              "name":faker.name.firstName(),
              "email":faker.internet.email(),
              "telephone":faker.phone.phoneNumber()
            }
          }).then((responseC => {
              expect(responseC.status).to.eq(200)
              cy.log(JSON.stringify(responseC.body))
          }))
      }))
  }))
})


// Client Delete LastID ////////////////////////////////////////////////////////////////////////////////////////////////

Cypress.Commands.add('clientDelLastID', () => {
  cy.login().then((responseA => {
      cy.request({
        method: 'GET', 
        url: 'http://localhost:3000/api/clients', 
        headers: {
          'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
          'Content-Type': 'application/json'
        }
      }).then((responseB =>{
        expect(responseB.status).to.eq(200)
        let lastID = responseB.body[responseB.body.length -1].id
        cy.log(lastID)
        cy.request({
          method: 'DELETE', 
          url: 'http://localhost:3000/api/client/'+lastID, 
          headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
          }
        }).then((responseC => {
          expect(responseC.status).to.eq(200)
          cy.log(JSON.stringify(responseC.body))
        }))
      }))
  }))
})


// GoToBills ////////////////////////////////////////////////////////////////////////////////////////////////

Cypress.Commands.add('bills', () => {
  cy.request({
    method:'GET',
    url:'http://localhost:3000/api/bills',
    headers: {
      'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
      'Content-Type': 'application/json'
    }
  }).then((response => {
      expect(response.status).to.eq(200)
      cy.log(JSON.stringify(response.body))
  }))
})

// evry thing under is extra "if you want" work
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get last Client in the listan

Cypress.Commands.add('getLastID', () => {
  // Authentication; Getting a valid token
  cy.login().then((responseA => {
      // Get request to get all clients in order to extract the lastID
      cy.request({
          method: 'GET', 
          url: 'http://localhost:3000/api/clients', 
          headers: {
              'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
              'Content-Type': 'application/json'
          }
      }).then((responseB =>{
          expect(responseB.status).to.eq(200)
          //Save the id of the last client into a variable
          let lastID = responseB.body[responseB.body.length -1].id
          cy.log(lastID)

          //The GET / PUT / DELETE request towards the client with the lastID.
          // The URL is build by appending the variable lastID in the end of the endpoint
          cy.request({
              method: 'GET', 
              url: 'http://localhost:3000/api/client/'+lastID, 
              headers: {
                  'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                  'Content-Type': 'application/json'
              }
          }).then((responseC => {
              expect(responseC.status).to.eq(200)
              cy.log(JSON.stringify(responseC.body))
          }))
      }))
  }))
})
