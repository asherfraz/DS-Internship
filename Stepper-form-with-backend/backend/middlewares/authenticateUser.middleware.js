const User = require('../model/user.model');
const JWTService = require('../services/JWT.service');



const authenticateUser = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    // if user not login
    if (!accessToken || !refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // if user login then authenticate user
    try {
        const decoded = JWTService.verifyAccessToken(accessToken);
        // verify token and inject user data in request
        req.user = await User.findById(decoded.userId);

        // call next middleware
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).json({ message: 'Unauthorized access' });
    }
};

module.exports = authenticateUser;