/// <reference types = "cypress" />

describe('Test suit', () => {

    it('1.Login/logout endpoint', ()=>{
        cy.authenticate().then(cy.logout)
    })

    it ('2.View the rooms and logout endpoint',()=>{
        cy.authenticate().then(cy.rooms).then(cy.logout)
    })

    it ('3.Create a room endpoint',()=>{
        cy.authenticate().then(cy.create_a_room).then(cy.logout)
    })

    it ('4.Edit a room endpoint',()=>{
        cy.authenticate().then(cy.edit_a_room).then(cy.logout)
    })

    it ('5.Delete a room endpoint',()=>{
        cy.authenticate().then(cy.edit_a_room).then(cy.logout)
    })

    it ('6.View the clients endpoint',()=>{
        cy.authenticate().then(cy.clients).then(cy.logout)
    })

    it ('7.Create a new client endpoint',()=>{
        cy.authenticate().then(cy.create_a_client).then(cy.logout)
    })

    it ('8.Edit the client endpoint',()=>{
        cy.authenticate().then(cy.edit_a_client).then(cy.logout)
    })

    it ('9.Delete the client endpoint',()=>{
        cy.authenticate().then(cy.delete_a_client).then(cy.logout)
    })

    it ('10.View the bills endpoint',()=>{
        cy.authenticate().then(cy.bills).then(cy.logout)
    })
})