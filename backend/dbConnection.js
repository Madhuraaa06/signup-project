const mongoose = require('mongoose');

// Define the MongoDB URI directly
const MongoUri = 'mongodb+srv://ayushdarade06:Madhura@cluster0.4zd7ked.mongodb.net/todolist';

const ConnectToMongo = () => {
    try {
        mongoose.connect(MongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to Database Successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

module.exports = ConnectToMongo;
