require('../src/db/mongoose')
const User = require('../src/models/user')

//the below code is promise chaining to use two promises one after the other
//findOneAndUpdate & countDocuments
//findOneAndUpdate ll find the document with 1st args & update the 2nd args
//countDocuments to get the number of documenst present with the arg specified
//update the db
User.findOneAndUpdate('5e6fa6a6b3d42272ec55ad9c',{name: 'GouthamKarthik'}).then((user)=>{
    console.log(user)
    return User.countDocuments({age: 26})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e);
    
})