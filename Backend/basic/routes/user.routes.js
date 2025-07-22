const express = require('express');
const { registerUser, loginUser, getUserByID, getUserByUsername, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserByID);
router.get("", getUserByUsername);
router.patch("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;