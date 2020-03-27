const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const userRouter = require('./routers/userRouter')

const app = express()

//this is used to parse the json tat we get as request to object to work easily
app.use(express.json())
app.use(userRouter)

module.exports = app