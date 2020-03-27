const app = require('./app')

//used to get the port from the property or the vlaue specified(3000)
// const port = process.env.PORT || 3000
//after setting dev-env
const port = process.env.PORT

//application listening to the below server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})