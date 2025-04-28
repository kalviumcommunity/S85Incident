const express = require('express');
const Incident = require("../model/incident"); 
const Router = express.Router();
const uploadd =require("../multer/upload")

const upload=uploadd();
Router.post('/inci', upload.single('photo'), async (req, res) => {
    const { description } = req.body;
    const photo = req.file ? req.file.filename : null;  

    try {
        const newIncident = await Incident.create({ description, photo });  
        res.status(201).json(newIncident);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


Router.get('/inci', async (req, res) => {
    try {
        const incidents = await Incident.find(); 
        res.status(200).json(incidents);
    } catch (err) {
        res.status(404).json({ message: err.message }); 
    }
});

Router.put('/inci/:id', async (req, res) => {
    const { id } = req.params;  
    const { description } = req.body; 
    try {
        const updatedIncident = await Incident.findByIdAndUpdate(
            id, 
            { description }, 
            { new: true } 
        );
       if (!updatedIncident) {
            return res.status(404).json({ message: "Incident not found" });
        }
        res.status(200).json(updatedIncident);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


Router.delete('/inci/:id',async(req,res)=>{
    try{
        const update=await Incident.findByIdAndDelete(req.params.id)
        if (!update) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(201).json({message:"User deleted successfully"})

    }
    catch{
        res.status(500).json({message:err.message})
    }
})


module.exports = Router;
