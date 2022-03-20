const express = require("express");
const Input = require("../models/input");


const router = express.Router();

router.post("/addinput", async (req,res) => {
    const {inputName, inputVar, inputType} = req.body;
    const newInput = new Input({inputName, inputVar, inputType})

    const savedInput = await newInput.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Cannot add new input" });
        return
    });
    if(savedInput){
        res.status(200).json(savedInput);
    }
})

router.get("/getinputs", async (req,res) => {
    const response = await Input.findAll().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Error getting inputs" });
        return
    });
    if(response){
        res.status(200).json(response);
    }
})

module.exports = router;
