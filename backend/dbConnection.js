const mongoose = require('mongoose');
require('dotenv').config();

const {MongoUri} = process.env

const ConnectToMongo = ()=>{
    try {
        mongoose.connect(MongoUri);
        console.log("Connected to Database Sucessfully");
    } catch (error) {
        console.log("Error")
    }
};

module.exports = ConnectToMongo