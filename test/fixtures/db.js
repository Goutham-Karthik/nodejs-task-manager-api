//this db fixture is used to setup the db so that it has been connected 
//and all the test data are set up in the db 
//so that we can run our test cases to work that data
const mongoose = require('mongoose')
const User = require('../../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    age: 26,
    email: 'mike@example.com'
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Jess',
    age: 27,
    email: 'jess@example.com'
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    setupDatabase
}