//EXPRESS
const express = require("express");
const app = express();

//Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//DOTENV
require("dotenv/config")

//MONGODB
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONN, () => {
    console.log("Connected to database\n");
});

//PORT
app.listen(process.env.PORT);

//Import routes
const petRoutes = require("./routes/pet");

//Routes
app.use("/api/pet", petRoutes);