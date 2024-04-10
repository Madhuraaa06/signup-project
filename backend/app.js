const express = require('express');
const ConnectToMongo = require('./dbConnection');
const todo = require('./routes/todo')
const cors = require('cors')
const path = require("path");
 
const app = express();
const PORT = 8000;

//database
ConnectToMongo();

app.use(cors());
app.use(express.json());

app.use(todo);
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });