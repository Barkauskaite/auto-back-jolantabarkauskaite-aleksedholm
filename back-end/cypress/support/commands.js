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

Cypress.Commands.add('authenticate', ()=> {
    const USER_CREDENTIALS = {
        "username": "tester01",
        "password": "GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
    }
    cy.request({
     method:'POST',
     url: 'http://localhost:3000/api/login',
     headers: {
         'Content-Type': 'application/json'
     },
     body: USER_CREDENTIALS
    }).then((response=>{
        expect(response.status).to.eq(200)
        Cypress.env({loginToken:response.body})
        cy.log(response.body)
    }))
})
Cypress.Commands.add('logout', ()=>{

    cy.request({
        method:'POST',
        url: 'http://localhost:3000/api/logout',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
       }).then((response=>{
           expect(response.status).to.eq(200)
           cy.log(response.body)
       }))

})

Cypress.Commands.add('rooms', ()=>{

    cy.request({
        method:'GET',
        url: 'http://localhost:3000/api/rooms',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
       }).then((response=>{
           expect(response.status).to.eq(200)
           cy.log(JSON.stringify(response.body))
       }))
})

Cypress.Commands.add('create_a_room', ()=>{

    cy.request({
        method:'POST',
        url: 'http://localhost:3000/api/room/new',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: {
        "category":"double",
        "floor":1,
        "number":103,
        "available":true,
        "price":3000,
        "features":["balcony","ensuite"]
    }
       }).then((response=>{
           expect(response.status).to.eq(200)
           cy.log(JSON.stringify(response.body))
       }))
})

/*Cypress.Commands.add('edit_a_room', ()=>{

    cy.request({
        method:'PUT',
        url: 'http://localhost:3000/api/room/3',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: {"id":3,
        "category":"double",
        "floor":1,
        "number":103,
        "available":false,
        "price":0,
        "features":["balcony","ensuite"]
    }
       }).then((response=>{
           expect(response.status).to.eq(200)
           cy.log(JSON.stringify(response.body))
       }))
})*/

/*Cypress.Commands.add('delete_a_room', ()=>{

    cy.request({
        method:'DELETE',
        url: 'http://localhost:3000/api/room/3',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
       }).then((response=>{
           expect(response.status).to.eq(200)
           cy.log(JSON.stringify(response.body))
       }))
})*/

Cypress.Commands.add('clients', ()=>{

    cy.request({
        method:'GET',
        url: 'http://localhost:3000/api/clients',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
       }).then((response=>{
           expect(response.status).to.eq(200)
           cy.log(JSON.stringify(response.body))
       }))
})

Cypress.Commands.add('create_a_client', ()=>{

    cy.request({
        method:'POST',
        url: 'http://localhost:3000/api/client/new',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: {
            "name":"Jonas Q",
            "email":"jonas.Q@example.com",
            "telephone":"070 000 11111"
        }
       }).then((response=>{
           expect(response.status).to.eq(200)
           cy.log(JSON.stringify(response.body))
       }))
})

/*Cypress.Commands.add('edit_a_client', ()=>{

    cy.request({
        method:'PUT',
        url: 'http://localhost:3000/api/client/3',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body:{"id": 3,
        "name":"Tommy Q",
        "email":"jonas.Q@example.com",
        "telephone":"070 000 22222"
    } 
       }).then((response=>{
           expect(response.status).to.eq(200)
           cy.log(JSON.stringify(response.body))
       }))
})*/

/*Cypress.Commands.add('delete_a_client', ()=>{

    cy.request({
        method:'DELETE',
        url: 'http://localhost:3000/api/client/3',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
       }).then((response=>{
           expect(response.status).to.eq(200)
           cy.log(JSON.stringify(response.body))
       }))
})*/

Cypress.Commands.add('bills', ()=>{

    cy.request({
        method:'GET',
        url: 'http://localhost:3000/api/bills',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
       }).then((response=>{
           expect(response.status).to.eq(200)
           cy.log(JSON.stringify(response.body))
       }))
})

/*it('GET request towards /api/client/{lastID}', () => {
        // Authentication; Getting a valid token
        cy.authenticate().then((response => {
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
                let lastID = response.body[response.body.length -1].id
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
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))

            }))
        }))
       
    })*/

    Cypress.Commands.add('edit_a_client', ()=>{
        cy.authenticate().then((response => {      
            cy.request({
                method: 'GET', 
                url: 'http://localhost:3000/api/clients', 
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                    'Content-Type': 'application/json'
                }
            }).then((response =>{
                expect(response.status).to.eq(200)
                let lastID = response.body[response.body.length -1].id
                cy.log(lastID)
                cy.request({
                    method: 'PUT', 
                    url: 'http://localhost:3000/api/client/'+lastID, 
                    headers: {
                        'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                        'Content-Type': 'application/json'
                    },
                    body:{"id": lastID,
                    "name":"Tommy Q",
                    "email":"jonas.Q@example.com",
                    "telephone":"070 000 22222"
                } 
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))

            }))
        }))
       
    })
    
    Cypress.Commands.add('delete_a_client', ()=>{
        cy.authenticate().then((response => {      
            cy.request({
                method: 'GET', 
                url: 'http://localhost:3000/api/clients', 
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                    'Content-Type': 'application/json'
                }
            }).then((response =>{
                expect(response.status).to.eq(200)
                let lastID = response.body[response.body.length -1].id
                cy.log(lastID)
                cy.request({
                    method: 'DELETE', 
                    url: 'http://localhost:3000/api/client/'+lastID, 
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
    Cypress.Commands.add('edit_a_room', ()=>{
        cy.authenticate().then((response => {      
            cy.request({
                method: 'GET', 
                url: 'http://localhost:3000/api/rooms', 
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                    'Content-Type': 'application/json'
                }
            }).then((response =>{
                expect(response.status).to.eq(200)
                let lastID = response.body[response.body.length -1].id
                cy.log(lastID)
                cy.request({
                    method: 'PUT', 
                    url: 'http://localhost:3000/api/room/'+lastID, 
                    headers: {
                        'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                        'Content-Type': 'application/json'
                    },
                    body: {
                    "id":lastID,
                    "category":"double",
                    "floor":1,
                    "number":103,
                    "available":false,
                    "price":0,
                    "features":["balcony","ensuite"]
                }
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))

            }))
        }))
       
    })
    Cypress.Commands.add('delete_a_room', ()=>{
        cy.authenticate().then((response => {      
            cy.request({
                method: 'GET', 
                url: 'http://localhost:3000/api/rooms', 
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                    'Content-Type': 'application/json'
                }
            }).then((response =>{
                expect(response.status).to.eq(200)
                let lastID = response.body[response.body.length -1].id
                cy.log(lastID)
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
    
