const express = require("express");
const router = express.Router();
const User = require("../model/Users");
const bcrypt=require("bcrypt");
const jwt =require('jsonwebtoken');
require("dotenv").config({ path: "./config/.env" });

router.post('/user', async (req, res) => {
    const { username,  email,phoneNumber,password } = req.body;
    try {
        if (!username || !phoneNumber|| !email || !password ) {
            return res.status(400).json({ message: "Missing required fields" });
        }
       

        const create = await User.create({ username, phoneNumber, email,password:haash });
        res.json(create);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }


});

router.post('/user/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"user not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const token=jwt.sign({id: user._id,email:user.email, },JWT_Secret)
        res.json({ message: "Login successful", token });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).send("Internal server error");
    }

})
//middleware
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]; //req.headers["authorization"] // returns: "Bearer <token>"
    // if (!token) {         Uses the secret key to compute:
    //     HMAC_SHA256(header + "." + payload, secret)
        return res.status(401).json({ error: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], JWT_Secret);
        req.user = decoded;//decoded is the decoded JWT payload, id 1
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }


router.get('/user',verifyToken, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



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


// //When the server creates a JWT, it generates a signature by combining the header and payload with a secret key and applying a cryptographic algorithm (like HMAC SHA256 or RS256).

// The secret key is critical during this step because it ensures that the signature is unique and cryptographically tied to the payload and header. The signature guarantees that no one can alter the payload or header without invalidating the token.

// Signature Validation:

// When the server receives the JWT from the client, it decodes the header and payload and recalculates the signature using the same secret key.

// The server then compares the recomputed signature with the signature that came with the JWT.

// If they match, the server knows that the data hasn't been tampered with because only someone who knows the secret key could have generated a valid signature for the given payload and header.

// If they don't match, the server knows that the token has been tampered with, and it will reject the token.

