const express = require('express');
const Incident = require("../model/incident"); 
const Router = express.Router();

Router.post('/inci', async (req, res) => {
    const { description } = req.body;
    try {
        const newIncident = await Incident.create({ description });
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





module.exports = Router;
