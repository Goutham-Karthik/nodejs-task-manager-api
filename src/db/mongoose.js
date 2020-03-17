const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    //this ll create the index for the documents entered
    useCreateIndex: true
})