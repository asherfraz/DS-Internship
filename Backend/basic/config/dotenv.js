const dotenvx = require("@dotenvx/dotenvx").config();


module.exports = {
    PORT: process.env.PORT || 3001,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION,

};