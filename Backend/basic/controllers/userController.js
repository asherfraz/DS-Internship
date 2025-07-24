const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const JWTService = require("../services/JWTService");

const { validateRegisterUser, validateLoginUser } = require('../validators/userValidators');




async function registerUser(req, res) {
    const { username, email, password } = req.body;

    console.log("\t\t>>: Registering user:");

    // check if data is valid
    const { error } = validateRegisterUser(req.body);
    if (error) {
        const errorMessage = error.details.map(err => err.message).join(', ');
        console.error("Validation error:", errorMessage);
        return res.status(400).json({ message: "Validation failed", error: errorMessage });
    }

    try {
        // check if user already exists
        const existingUser = await User.findOne({ username, email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        let newUser;
        // hash password using bcrypt
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).json({ message: "Error registering user", error: err.message });
            }

            newUser = await User.create({ username, email, password: hash });
        });


        const token = JWTService.generateToken({ ...newUser })
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600 * 30, // 30 minutes
        });


        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;

    console.log("\t\t>>: Logging in user:", username);

    // validate login data
    const { error } = validateLoginUser(req.body);
    if (error) {
        const errorMessage = error.details.map(err => err.message).join(', ');
        console.error("Validation error:", errorMessage);
        return res.status(400).json({ message: "Validation failed", error: errorMessage });
    }

    try {

        // check if user exists & retrive
        const userExist = await User.findOne({ username });
        if (!userExist) {
            return res.status(400).json({ message: "User does not exists!" });
        }
        const isMatch = await bcrypt.compare(password, userExist.password);
        console.log(">>: Password attempt:", password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = JWTService.generateToken({ ...userExist });
        res.cookie("token", token, {
            httpOnly: true,
            // maxAge: 3600 * 30, // 30 minutes
        });

        res.status(200).json({ message: "User Login successfully!", user: userExist });

    } catch (error) {
        res.status(500).json({ message: "Error logging-in user", error: error.message });
    }

}

async function logoutUser(req, res) {
    try {

        console.log(req.cookies)

        const token = req.cookies.token;

        // if ("token" in req.cookies) {
        if (token) {
            res.clearCookie("token");
            res.status(200).json({ message: "User logged out successfully" });
        } else {
            res.status(400).json({ message: "No user is logged in" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging out user", error: error.message });
    }
}



async function getUserByID(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error });
    }
}

async function getUserByUsername(req, res) {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ message: "Query param 'name' is required" });
    }
    try {
        const user = await User.findOne({ username: name });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error: error.message || error });
    }
}


async function updateUser(req, res) {
    const { id } = req.params;
    const { username, email, password } = req.body;

    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
}


module.exports = {
    registerUser, loginUser, logoutUser, getUserByID, getUserByUsername, updateUser, deleteUser
};