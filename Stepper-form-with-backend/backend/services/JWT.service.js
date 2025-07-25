const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRATION } = require('../config/dotenvx');
const RefreshToken = require('../model/token.model');


class JWTService {

    static signAccessToken(payload) {
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
    }

    static signRefreshToken(payload) {
        return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
    }
    static verifyAccessToken(token) {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    }
    static verifyRefreshToken(token) {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    }

    static async storeRefreshToken(userId, token) {
        try {
            const newRefreshToken = new RefreshToken({ userId, token });
            await newRefreshToken.save();
        } catch (error) {
            console.error('Error storing refresh token:', error);
        }
    }
}

module.exports = JWTService;