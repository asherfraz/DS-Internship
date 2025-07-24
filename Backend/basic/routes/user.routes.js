const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserByID, getUserByUsername, updateUser, deleteUser } = require('../controllers/userController');


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/:id", getUserByID);
router.get("", getUserByUsername);
router.patch("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;