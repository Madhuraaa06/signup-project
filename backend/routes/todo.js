const express = require('express');
const Task = require("../models/task")

const router = express.Router();

router.post("/add",async (req,res)=>{
    try {
        const {name, description} = req.body
        const newItem = new Task({
            name,
            description
        });
        await newItem.save();
        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete("/delete/:id",async (req,res)=>{
    try {
        let task = await Task.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Succesfully deleted"}); 
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
});

router.get("/getall",async (req,res)=>{
    try {
        const task = await Task.find();
        res.json(task)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
});

router.put('/update/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        let updatedTask = await Task.findByIdAndUpdate({_id: id}, {done : true})
        updatedTask = await Task.findById(id);
        res.json(updatedTask)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
})

module.exports = router;