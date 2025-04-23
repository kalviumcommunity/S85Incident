const express = require('express');
const Router = express.Router();
const Community = require('../model/community');

Router.post("/community", async (req, res) => {
    const { name, room, description } = req.body;
     try {
        const community = await Community.create({
            name,
            room,
            description
        });

        res.status(201).json(community);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
Router.get("/community", async (req, res) => {
    try {
        const communities = await Community.find()
        res.status(200).json(communities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


Router.get("/community/:id", async (req, res) => {
    try {
        const community = await Community.findById(req.params.id)
        if (!community) {
            return res.status(404).json({ message: "Community not found" });
        }
        res.status(200).json(community);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


Router.put("/community/:id", async (req, res) => {
    try {
        const updated = await Community.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ message: "Community not found" });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

Router.delete("/community/:id", async (req, res) => {
    try {
        const deleted = await Community.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Community not found" });
        }
        res.status(200).json({ message: "Community deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = Router;
