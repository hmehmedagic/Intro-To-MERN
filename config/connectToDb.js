// Responsible for connecting the Mongoose Database to the Express Server Application
require("dotenv").config();

const mongoose = require("mongoose");

const connectToDb = async() => {
    // -> This is how the app connects to our database
    await mongoose.connect(process.env.DB_URL);

    console.log("Currently connected to MongoDB Cluster");
}

module.exports = connectToDb;