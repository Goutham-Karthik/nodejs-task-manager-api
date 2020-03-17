//CRUD apertion using mongodb module of node js

/* const mongdb = require('mongodb')
const MongoClient = mongdb.MongoClient
const ObjectID = mongdb.ObjectID */

//the above code can be rewritten 
const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// the below objectID create a new id which is a hexa obj
//that is 12 bytes in total
//its is an object not a string
const id = new ObjectID();
// id printed is --->5e6f97adc6a0810aec9493b4
console.log(id);

//this is used to connect to the database and start the server in the above connection url
MongoClient.connect(connectionURL , {useNewUrlParser: true}, (error, client) => {
    if(error){
        return console.log('unable to connect to database')
        }

        //this is used to create the schema with the name we declared
    const db = client.db(databaseName);

    //the below code ll create document inside the mongodb name user 
    //and insert the name, age ,.... fields into the document
    //if error call the callback function (error, result) =>
        db.collection('User').insertMany([
            {
            name: 'Goutham',
            age: 26,
            job: 'Graphic designer'
        },
        {
            name: 'Dhanush',
            age: 18,
            job: 'Student'
        }
        ], (error, result) => {
            if(error){
                console.log('unable to enter the user details');
            }

            //ll print the object that is created
            console.log(result.ops);  
        })

        db.collection('User').findOne({_id: new ObjectID("5e6f97adc6a0810aec9493b5")}, (error , user) => {
            if(error){
                console.log('user not found');  
            }

            console.log(user);
            //output
            // { _id: 5e6f97adc6a0810aec9493b5,
            //     name: 'Goutham',
            //     age: 26,
            //     job: 'Graphic designer' }
        })

       const updateUSer= db.collection('User').updateOne({_id: new ObjectID("5e6f97adc6a0810aec9493b6")},{
            //this $set is used only for updating the fileds n db
            //used to set values
        //     $set:{
        //         name: 'DhanushKarthik'
        //     }
        
        // },{
            //$inc used to increment the values
            $inc:{
                age: 20
            }
        // }, (error, user) => {
        //     if(error){
        //         console.log('user not found');  
        //     }
        })

        //the above error can be handled with promises
        updateUSer.then((result)=>{
            console.log('result' +result)
        }).catch((e)=> {
            console.log(e)
        })

        //delete opeations

        db.collection('User').deleteMany({name: "Dhanush"     
        }).then((result)=> {
            console.log('result'+result)
        }).catch((e) => {
            console.log(e);
        })

})



//similar to the above insertone Function in mongodb module we have many function 
//insertOne
//findMany
//find
//updateOne
//updateMany
//deleteOne
//deleteMany