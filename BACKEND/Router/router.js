const express = require("express");
const router = express.Router();
const User = require("../model/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });

// Register User
router.post('/user', async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;
    try {
        if (!username || !phoneNumber || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const create = await User.create({ username, phoneNumber, email, password: hashedPassword });
        res.json(create);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login User
router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_Secret);
        res.json({ message: "Login successful", token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send("Internal server error");
    }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ error: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_Secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid token" });
    }
};

// Get user info (Protected)
router.get('/user', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete user by ID
router.delete('/user/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
