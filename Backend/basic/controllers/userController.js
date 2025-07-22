const User = require("../models/userModel");




async function registerUser(req, res) {
    const { username, email, password } = req.body;

    console.log("Registering user:", username, email, password);

    // check if all fields are not provided
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check if data is valid
    const isemailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isUsernameValid = /^[a-zA-Z0-9_]{3,}$/.test(username);
    const isPasswordValid = password.length >= 6;

    if (!isemailValid) {
        return res.status(400).json({ message: "Invalid email format" });
    } else if (!isUsernameValid) {
        return res.status(400).json({ message: "Username must be at least 3 characters long and can only contain letters, numbers, and underscores" });
    } else if (!isPasswordValid) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    try {

        // check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const newUser = await User.create({ username, email, password });
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;


    // check if all fields are not provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // check if data is valid
    const isUsernameValid = /^[a-zA-Z0-9_]{3,}$/.test(username);
    const isPasswordValid = password.length >= 6;

    if (!isUsernameValid) {
        return res.status(400).json({ message: "Username must be at least 3 characters long and can only contain letters, numbers, and underscores" });
    } else if (!isPasswordValid) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    try {

        // check if user exists & retrive
        const userExist = await User.findOne({ username, password });
        if (userExist) {


            res.status(200).json({ message: "User Login successfully!", user: userExist });
        }

        return res.status(400).json({ message: "User does not exists!" });
    } catch (error) {
        res.status(500).json({ message: "Error logging-in user", error });
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
    registerUser, loginUser, getUserByID, getUserByUsername, updateUser, deleteUser
};