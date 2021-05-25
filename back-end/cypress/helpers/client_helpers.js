const faker= require ('faker')

//function 
function createClientPayload(){
    let clientPayload ={
        "name":faker.name.firstName(),
        "email":faker.internet.email(),
        "telephone":faker.phone.phoneNumber()

    }
    return clientPayload
}

//exports

module.exports = {
    createClientPayload
}