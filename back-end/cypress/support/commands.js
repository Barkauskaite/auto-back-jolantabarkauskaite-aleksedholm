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
const faker= require ('faker')

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
        //"floor":1,
        "floor":faker.datatype.number({min:1, max:40}),
        //"number":103,
        "number":faker.datatype.number({min:3, max:500}),
        //"available":true,
        "available":faker.datatype.boolean(),
        //"price":3000,
        "price":faker.datatype.number({min:1500, max:4000}),
        "features":["balcony","ensuite"]
    } }).then((response=>{
           expect(response.status).to.eq(200)
           cy.log(JSON.stringify(response.body))
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
                //"floor":1,
                "floor":faker.datatype.number({min:1, max:40}),
                //"number":103,
                "number":faker.datatype.number({min:3, max:500}),
                //"available":true,
                "available":faker.datatype.boolean(),
                //"price":3000,
                "price":faker.datatype.number({min:1500, max:4000}),
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
                "name":faker.name.firstName(),
                "email":faker.internet.email(),
                "telephone":faker.phone.phoneNumber()
            
        }
       }).then((response=>{
           expect(response.status).to.eq(200)
           cy.log(JSON.stringify(response.body))
       }))
})

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
                    "name":faker.name.firstName(),
                    "email":faker.internet.email(),
                    "telephone":faker.phone.phoneNumber()
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
    
