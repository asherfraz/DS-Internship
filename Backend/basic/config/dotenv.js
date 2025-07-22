const dotenvx = require("@dotenvx/dotenvx").config();


module.exports = {
    PORT: process.env.PORT || 3001,
    MONGO_URI: process.env.MONGO_URI
};