const router = require('express').Router();
const noteController = require('../controllers/note.controller.js');
const authenticateUser = require('../middlewares/authenticateUser.middleware.js');


router.post('/', authenticateUser, noteController.createNote);
router.get('/', authenticateUser, noteController.getNotes);
router.get('/:id', authenticateUser, noteController.getNoteById);
router.patch('/:id', authenticateUser, noteController.updateNote);
router.delete('/:id', authenticateUser, noteController.deleteNote);

module.exports = router;