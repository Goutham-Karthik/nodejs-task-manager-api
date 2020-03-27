const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, setupDatabase } = require('./fixtures/db')

//userOneId, userOne,
//beforeEach is used to run something before each test case is about to run
beforeEach(setupDatabase)

//test is the syntax ro tell that this ia test case no need to import the jest framework
test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Goutham',
        age: 26,
        email: 'goutham@example.com'
    }).expect(201)
 
    // Assert that the database was changed correctly
    const user = await User.findById(response.body._id)
    console.log(response.body._id);
    
     expect(user).not.toBeNull()
     expect(user.name).toBe('Goutham')
    

//     // Assertions about the response
//     //expect(user.name).not.toBe('Andrew)
//     //to assert many fields of a particular document we use like below
//     // expect(response.body).toMatchObject({
//     //     user: {
//     //         name: 'Andrew',
//     //         email: 'andrew@example.com'
//     //     }
//     // })
 })


 //to get all user saved in the db
test('Should get all user', async () => {
    const response = await request(app)
        .get('/users')
        .send()
        .expect(200)

        console.log(response.body);
        
})

//to get a single user
test('Should get single user', async () => {
    const response = await request(app)
        .get('/users')
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).not.toBeNull()
    expect(user.name).toEqual('Mike')

    console.log(user.name)
})

//to update a existing user field
test('Should update a user fields', async () => {
    const response = await request(app)
        .patch('/users/'+userOneId)
        .send({
            name: 'Dhanush'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Dhanush')

    console.log(user.name)
})

//to delete a user
test('Should delete a user', async () => {
    await request(app)
        .delete('/users/'+userOneId)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})
