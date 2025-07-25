const User = require('../model/user.model');
const RefreshToken = require('../model/token.model');
const { BCRYPT_SALT_ROUNDS } = require('../config/dotenvx');
const bcrypt = require('bcrypt');
const { validateRegistration } = require('../validators/user.validator');
const JWTService = require('../services/JWT.service');

const UserController = {
    async createUser(req, res) {
        try {
            const { fname, lname, email, password, streetAddress, city, country } = req.body;

            // validate required fields
            const { error } = validateRegistration(req.body);

            if (error) {
                const errorsMessages = error.details.map(err => err.message);
                return res.status(400).json({ message: 'Validation error', errors: errorsMessages });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, parseInt(BCRYPT_SALT_ROUNDS));

            // Create new user & Generate JWT token

            let accessToken, refreshToken;
            let newUser;

            try {
                newUser = new User({
                    fname,
                    lname,
                    email,
                    password: hashedPassword,
                    streetAddress,
                    city,
                    country
                });


                accessToken = JWTService.signAccessToken({ userId: newUser._id });
                refreshToken = JWTService.signRefreshToken({ userId: newUser._id });

                // Save the new user to the database
                await newUser.save();
                // Store the refresh token in the database
                await JWTService.storeRefreshToken(newUser._id, refreshToken);

            } catch (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }


            // Set cookies for access and refresh tokens
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                maxAge: 3600 * 1000 // 1 hour
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 3600 * 1000 * 24 * 7 // 7 days
            });


            // Exclude password from response
            newUser.password = undefined;

            res.status(201).json({
                message: 'User created successfully',
                auth: true,
                user: newUser
            });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    ,
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            // Validate required fields
            const { error } = validateRegistration(req.body);
            if (error) {
                const errorsMessages = error.details.map(err => err.message);
                return res.status(400).json({ message: 'Validation error', errors: errorsMessages });
            }

            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if password is correct
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Exclude password from response
            user.password = undefined;

            // Generate JWT tokens
            const accessToken = JWTService.signAccessToken({ userId: user._id });
            const refreshToken = JWTService.signRefreshToken({ userId: user._id });

            // Store the refresh token in the database
            try {
                await RefreshToken.updateOne(
                    { userId: user._id },
                    { token: refreshToken },
                    { upsert: true } // Create a new document if it doesn't exist
                )
            } catch (error) {
                console.error('Error storing refresh token:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            // Set cookies for access and refresh tokens
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                maxAge: 3600 * 1000 // 1 hour
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 3600 * 1000 * 24 * 7 // 7 days
            });

            res.status(200).json({
                message: 'Login successful',
                auth: true,
                user
            });

        } catch (error) {
            console.error('Error Login user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    ,
    async logoutUser(req, res) {
        try {

            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res.status(400).json({ message: 'No User Logged In' });
            }

            // Verify the refresh token and Delete it
            try {
                await RefreshToken.deleteOne({ token: refreshToken });
            } catch (error) {
                console.error('Error deleting refresh token:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            // Clear cookies
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            res.status(200).json({
                message: 'Logout successful',
                auth: false
            });
        } catch (error) {
            console.error('Error logging out user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }

    },

    // *** User Management Functions ***
    async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId).select('-password'); // Exclude password from response
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User fetched successfully', user });
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updates = req.body;

            // Validate required fields
            const { error } = validateRegistration(updates);
            if (error) {
                const errorsMessages = error.details.map(err => err.message);
                return res.status(400).json({
                    message: 'Validation error', errors: errorsMessages
                });
            }

            // Find user and update
            if ('password' in updates) {
                delete updates.password;
            }
            const user = await User.findByIdAndUpdate(userId, updates, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Exclude password from response
            user.password = undefined;
            // Return updated user
            res.status(200).json({ message: 'User updated successfully', user });

        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            // check if user exists and delete
            const user = await User.findByIdAndDelete(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // delete its refresh token
            await RefreshToken.deleteOne({ userId: user._id });
            // Clear cookies
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            // Return success response
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = UserController;