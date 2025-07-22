const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/dotenv.js');


const connectDB = () => {

    try {
        mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("\nDatabase connected successfully to : ", MONGO_URI.split('/')[2]);

    } catch (error) {
        console.error("\nError connecting to the database:", error);
        process.exit(1); // Exit the process with failure
    }

}


module.exports = connectDB;