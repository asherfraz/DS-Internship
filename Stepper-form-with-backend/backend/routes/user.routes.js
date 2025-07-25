const express = require('express');
const UserController = require('../controllers/user.controller');
const authenticateUser = require('../middlewares/authenticateUser.middleware');
const router = express.Router();


router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/logout', authenticateUser, UserController.logoutUser);
router.get('/refresh', UserController.refreshUser);

router.get("/:id", authenticateUser, UserController.getUserById);
router.put("/update/:id", authenticateUser, UserController.updateUser);
router.delete("/delete/:id", authenticateUser, UserController.deleteUser);

module.exports = router;
