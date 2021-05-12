/// <reference types ="cypress" />
import * as loginFuncs from '../pages/loginPage'
import * as dashboardFuncs from '../pages/dashboardPage'
import * as roomsFuncs from '../pages/roomsPage'
import * as newRoomsFuncs from '../pages/newRoomPage'
import * as editRoomFuncs from '../pages/editRoomPage'
import * as clientFuncs from '../pages/clientsPage'
import * as newClientFuncs from '../pages/newClientPage'
import * as editClientsFuncs from '../pages/editClientPage'
import * as billsFuncs from '../pages/billsPage'

var faker = require('faker');

//array(length?: number): (string | number)[]
//let randomCategory = faker.datatype.array({(length:2), })
let randomRoom = faker.datatype.number(1000)
let randomFloor = faker.datatype.number(11)
let randomAvailability = faker.datatype.boolean();
let randomPrice = faker.datatype.number({min:1500, max:4000});

let randomName = faker.name.findName();
let randomEmail = faker.internet.email();
let randomTelephone = faker.phone.phoneNumber();

describe('Test suit with Page-objects', () => {

    beforeEach(() => {
        cy.visit("/")
        loginFuncs.checkLoginPageTitle
        loginFuncs.performValidLogin('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c','Welcome')
        cy.wait(500)
        
     })

    it('1.Perform a valid login', () => {
       //cy.visit('http://localhost:3000')  
       //loginFuncs.checkLoginPageTitle
       //loginFuncs.performValidLogin('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c','Welcome')
       dashboardFuncs.performLogout('Login')
    })

    it('2.View rooms and come back to dashboard-page', () =>{
        dashboardFuncs.viewRooms("Rooms")
        roomsFuncs.backToDashboardFromRooms("Tester Hotel Overview")
    })

    it('3.Create a new room', () =>{
        dashboardFuncs.viewRooms("Rooms")
        roomsFuncs.createRoom("New Room")
        newRoomsFuncs.createANewRoom('double', randomRoom, randomFloor, randomAvailability, randomPrice,'balcony')
        newRoomsFuncs.saveANewRoom('Rooms')
        roomsFuncs.verifyNewRoom('double', randomRoom, randomFloor, randomAvailability, randomPrice,'balcony')
    })

    it('4.Edit last room', () =>{
        dashboardFuncs.viewRooms("Rooms")
        roomsFuncs.openFreeDottsAndEdit("ID")
        editRoomFuncs.editRoom('double',randomRoom,randomFloor,randomAvailability,randomPrice,['balcony','sea_view'])
        editRoomFuncs.saveEditedRoom('Rooms')
        roomsFuncs.verifyEditedRoom('double',randomRoom,randomFloor,randomAvailability,randomPrice,['balcony','sea_view'])
      })

    it('5.Delete last room', () =>{
      dashboardFuncs.viewRooms("Rooms")
      roomsFuncs.openFreeDottsAndDelete()
    })

    it('6.View Clients and come back to the dashboard page', () =>{
      dashboardFuncs.viewClients("Clients")
      clientFuncs.backToDashboardFromClients("Tester Hotel Overview")
    })

    it('7.Create new client', () =>{
      dashboardFuncs.viewClients('Clients')
      clientFuncs.createNewClient('New Client')
      newClientFuncs.creatingNewClient(randomName,randomEmail,randomTelephone)
      newClientFuncs.savingNewClient('Clients')
      clientFuncs.confirmingNewClient(randomName,randomEmail,randomTelephone)
    })

    it('8.Edit last client', () =>{
      dashboardFuncs.viewClients('Clients')
      clientFuncs.editLastClient("ID")
      editClientsFuncs.editRoom(randomName,randomEmail,randomTelephone)
      editClientsFuncs.saveEditedClient('Clients')
      clientFuncs.verifyEditedClient(randomName,randomEmail,randomTelephone)
    })

    it('9.Delete last client', () =>{
      dashboardFuncs.viewClients('Clients')
      clientFuncs.deleteLastClient() 
    })
    
    it('10.View Bills and come back to the dashboard page', () =>{
      dashboardFuncs.viewBills("Bills")
      billsFuncs.backToDashboardFromBills("Tester Hotel Overview")
    })

    after(() => {
      dashboardFuncs.performLogout('Login')
   })
   })