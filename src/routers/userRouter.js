const express = require('express')
const User = require('../models/user')
const router = new express.Router()

//instead of app we can use routers

//post data to the database (posted json from the postman app)
//async function ll retrn only a promise
router.post('/users', async (req, res) =>{
    const user = new User(req.body);

    //use async await --> to enhance promise chaining
    //no need to use .then() a callback fnction
    try{
        //await can be called only on promises
        const saveUSer = await user.save()
    res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }

    /* user.save().then(()=> {
        res.status(200).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    }) */
})

//the get() used to fetch the listof users available in the database
router.get('/users', async (req, res)=> {
   try{
       const users = await User.find({})
        res.status(200).send(users)
    } catch(e) {
        res.status(500).send(e)
    }
})

//used to fetch individual usr based on the id provided on the url 
router.get('/users/:id', async (req, res)=>{
    //req.params is used to read values form the url
    const _id = req.params.id

   try{ 
       const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.send(e)
    }
})

//patch() used to update the data in db 
router.patch('/users/:id', async(req, res) => {
    //object.keys is represent the req.body in the form of array to match the eq fields with the db fields
    const updates = Object.keys(req.body)
    const allowedUpadtes = ['name', 'age', 'email']
    //to chack whether the json request sent from the client is updating the values only which are present in the db
    //eg height is not present as a field in db
    //so client rying to update ll lead to error
    const isValidOperation = updates.every((update) => {
        return allowedUpadtes.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send('error: Invalid Updates!')
    }
  
    try{
        //new : true ll always return the updated req body after modifications to the user
        //runValidators is to do all vaidation neccesary for updating the fields
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true})
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch(e){
        res.send(e)
    }
})

//to delete a user by id 
router.delete('/users/:id', async (req, res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
         return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send(e)
    }
})

module.exports = router
