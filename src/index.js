const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const userRouter = require('./routers/userRouter')

const app = express()

//used to get the port from the property or the vlaue specified(3000)
// const port = process.env.PORT || 3000
//after setting dev-env
const port = process.env.PORT

//this is used to parse the json tat we get as request to object to work easily
app.use(express.json())
app.use(userRouter)

//application listening to the below server
app.listen(port, () => {
    console.log('Server started at '+ port);
    
})