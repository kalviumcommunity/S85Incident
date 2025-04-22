const express = require('express');
const Router = express.Router();
const Community = require('../model/community');

Router.post("/community", async (req, res) => {
    const { name, room, description } = req.body;

    if (!name || !room || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const exists = await Community.findOne({ name, room });
        if (exists) {
            return res.status(409).json({ message: "Community already exists" });
        }

        const community = await Community.create({
            name: name.trim(),
            room: room.trim(),
            description: description.trim()
        });

        res.status(201).json(community);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

Router.get("/community", async (req, res) => {
    try {
        const communities = await Community.find();
        res.status(200).json(communities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = Router;
