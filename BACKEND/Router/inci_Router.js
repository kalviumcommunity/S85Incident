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





module.exports = Router;
