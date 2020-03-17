const mongoose = require('mongoose')
const validator = require('validator')

//this is used create a model class sismilar to the one we create with java with@model annotation
//pojo object
const User = mongoose.model('User', {
    name: {
        type: String,
        //required tells that this value has to be compulasry set while craeting instances
        //without this value the data will not enter into the db
        required: true,
        //trim is used to cut down the whitespace before and after
        //trim, lowercase, default are sanitization values (used to change the values before saving)
        trim: true
    },
    age: {
        type: Number,
        trim: true,
        //default is to provide the default value to age if we dont intailize while creating insatnce
        default: 0,
        //this validate is to check the values whther that falls under the condition if not create error
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive integer')
            }
        }
    },
    email: {
        type: String,
        //save value in lower cases
        lowercase: true,
        validate(value){
            //this validator.isEmail(value) is a built-in method of validator that returns a boolean
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    }
})

/* //creating instance of the object and assigning values to the pojos
const me = new User({
    name: 'Goutham',
    age: -1,
    email: 'MYMAIL@gmail.com'
})

//.save() is used to save the values in the mongodb then()is a promise 
me.save().then((me) =>{
    console.log(me)
}).catch((e) => {
    console.log(e)
})this ll handled in index.js*/

module.exports= User