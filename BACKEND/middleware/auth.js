const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config/.env' });

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

module.exports = verifyToken; 