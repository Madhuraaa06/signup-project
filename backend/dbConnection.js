const mongoose = require('mongoose');
require('dotenv').config();

const {MongoUri} = 'mongodb+srv://ayushdarade06:Madhura@cluster0.4zd7ked.mongodb.net/todolist'

const ConnectToMongo = ()=>{
    try {
        mongoose.connect(MongoUri);
        console.log("Connected to Database Sucessfully");
    } catch (error) {
        console.log("Error")
    }
};

module.exports = ConnectToMongo