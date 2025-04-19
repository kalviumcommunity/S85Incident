const express = require('express');
const app = express();
const PORT = 8000;
const connectDatabas = require('./Database/db.js');
const userRoutes = require('./Router/router.js');
const InciRoutes = require('./Router/inci_Router.js');
const Community=require('./Router/community.js')
 
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "./config/.env" });
}

connectDatabas();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/api', userRoutes);
app.use('/api1',InciRoutes);
app.use('/api2',Community)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
