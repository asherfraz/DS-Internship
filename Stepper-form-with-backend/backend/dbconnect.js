const mongoose = require('mongoose');
const { MONGODB_CONNECTION_STRING } = require('./config/dotenvx');

function connectToDatabase() {
    mongoose.connect(MONGODB_CONNECTION_STRING, {
    })
        .then(() => {
            console.log('Connected to MongoDB successfully: ', MONGODB_CONNECTION_STRING.split('/')[2]);
        })
        .catch(err => {
            console.error('Error connecting to MongoDB:', err);
        });
}

module.exports = connectToDatabase;
