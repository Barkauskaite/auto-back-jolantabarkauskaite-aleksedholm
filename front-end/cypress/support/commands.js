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


// login

Cypress.Commands.add('login', () => {
    // https://docs.cypress.io/api/cypress-api/custom-commands#Syntax
    const USER_CREDENTIALS = {
      "username": "tester01",
      "password": "GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
    }

    // https://docs.cypress.io/api/commands/request#Options
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


// logout

  Cypress.Commands.add('logout', () => {
    // https://docs.cypress.io/api/cypress-api/custom-commands#Syntax

    // https://docs.cypress.io/api/commands/request#Options
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


//GoToRooms

Cypress.Commands.add('rooms', () => {
  // https://docs.cypress.io/api/cypress-api/custom-commands#Syntax

  // https://docs.cypress.io/api/commands/request#Options
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

//RoomCreate

Cypress.Commands.add('roomCreate', () => {
    // https://docs.cypress.io/api/cypress-api/custom-commands#Syntax
  
    // https://docs.cypress.io/api/commands/request#Options
    cy.request({
      method:'POST',
      url:'http://localhost:3000/api/room/new',
      headers: {
          'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
          'Content-Type': 'application/json'
        },
    body:{
            "category":"double",
            "floor":5,
            "number":3,
            "available":true,
            "price":1500,
            "features":["balcony","ensuite"]
        } 
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
  })

/*
// RoomEdit
  Cypress.Commands.add('roomEdit', () => {
    // https://docs.cypress.io/api/cypress-api/custom-commands#Syntax
  
    // https://docs.cypress.io/api/commands/request#Options
    cy.request({
      method:'PUT',
      url:'http://localhost:3000/api/room/2',
      headers: {
          'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
          'Content-Type': 'application/json'
        },
    body:{
        "id":2,
         "category":"double",
         "floor":7,
         "number":31,
         "available":true,
         "price":2000,
         "features":["balcony","ensuite"]
        } 

    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
  })
  */


  // RoomDeleteLastID

Cypress.Commands.add('delLastRoomID', () => {
    // Authentication; Getting a valid token
    cy.login().then((response => {
        // Get request to get all clients in order to extract the lastID
        cy.request({
            method: 'GET', 
            url: 'http://localhost:3000/api/rooms', 
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        }
        }).then((response =>{
            expect(response.status).to.eq(200)
            //Save the id of the last client into a variable
            let lastID = response.body[response.body.length -1].id
            cy.log(lastID)

            //The GET / PUT / DELETE request towards the client with the lastID.
            // The URL is build by appending the variable lastID in the end of the endpoint
                cy.request({
                method: 'DELETE', 
                url: 'http://localhost:3000/api/room/'+lastID, 
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                    'Content-Type': 'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))

        }))
    }))
})



// GoToClients

Cypress.Commands.add('clients', () => {
  // https://docs.cypress.io/api/cypress-api/custom-commands#Syntax

  // https://docs.cypress.io/api/commands/request#Options
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

// ClientsCreate

Cypress.Commands.add('clientCreate', () => {
    // https://docs.cypress.io/api/cypress-api/custom-commands#Syntax
  
    // https://docs.cypress.io/api/commands/request#Options
    cy.request({
      method:'POST',
      url:'http://localhost:3000/api/client/new',
      headers: {
          'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
          'Content-Type': 'application/json'
        },
        body:{

            "name":"Jolina",
            "email":"Jolina@example.com",
            "telephone":"0709191991"
        }
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
})


// ClientEdit  editLastClientID

Cypress.Commands.add('delLastClientID', () => {
    // Authentication; Getting a valid token
    cy.login().then((response => {
        // Get request to get all clients in order to extract the lastID
        cy.request({
            method: 'GET', 
            url: 'http://localhost:3000/api/rooms', 
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        }
        }).then((response =>{
            expect(response.status).to.eq(200)
            //Save the id of the last client into a variable
            let lastID = response.body[response.body.length -1].id
            cy.log(lastID)

            //The GET / PUT / DELETE request towards the client with the lastID.
            // The URL is build by appending the variable lastID in the end of the endpoint
                cy.request({
                method: 'PUT', 
                url: 'http://localhost:3000/api/room/'+lastID, 
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                    'Content-Type': 'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))

        }))
    }))
})


// ClientDeleteLastID

Cypress.Commands.add('delLastClientID', () => {
  // Authentication; Getting a valid token
  cy.login().then((response => {
    // Get request to get all clients in order to extract the lastID
    cy.request({
      method: 'GET', 
      url: 'http://localhost:3000/api/clients', 
      headers: {
        'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
        'Content-Type': 'application/json'
      }
    }).then((response =>{
      expect(response.status).to.eq(200)
      //Save the id of the last client into a variable
      let cliDelLastID = response.body[response.body.length -1].id
      cy.log(cliDelLastID)

      //The GET / PUT / DELETE request towards the client with the lastID.
      // The URL is build by appending the variable lastID in the end of the endpoint
      cy.request({
        method: 'DELETE', 
        url: 'http://localhost:3000/api/client/'+cliDelLastID, 
        headers: {
          'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
          'Content-Type': 'application/json'
        }
        }).then((response => {
          expect(response.status).to.eq(200)
          cy.log(JSON.stringify(response.body))
        }))

        }))
    }))
})



// GoToBills

Cypress.Commands.add('bills', () => {
  // https://docs.cypress.io/api/cypress-api/custom-commands#Syntax

  // https://docs.cypress.io/api/commands/request#Options
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


