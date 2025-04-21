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


module.exports = Router;
