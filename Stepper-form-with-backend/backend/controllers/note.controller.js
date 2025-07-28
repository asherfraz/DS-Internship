const Note = require("../model/note.model.js")
const { validateNote, validateNoteUpdate } = require('../validators/note.validator.js');



const noteController = {

    async createNote(req, res) {
        try {
            const { title, content } = req.body;


            // validate note 
            const { error } = validateNote({ title, content });
            if (error) {
                const errorMessage = error.details.map(detail => detail.message).join(', ');
                console.error('Validation Error:', errorMessage);
                return res.status(400).json({ message: 'Validation Error', error: errorMessage });
            }

            // distinct note title
            const existingNote = await Note.findOne({ title });
            if (existingNote) {
                return res.status(400).json({ message: 'Note with this title already exists!' });
            }

            const newNote = await Note.create({ title, content, userId: req.user._id });
            res.status(201).json({ message: 'Note created successfully!', note: newNote });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    },
    async getNotes(req, res) {
        try {
            // Fetch notes for the authenticated user
            const userId = req.user._id;

            // Validate userId
            if (!userId) {
                return res.status(400).json({ message: 'User Login Required!' });
            }
            // Find notes for the user and populate userId field
            const notes = await Note.find({ userId }).populate('userId', 'fname lname email');
            if (!notes || notes.length === 0) {
                return res.status(404).json({ message: 'No notes found for this user.' });
            }
            res.status(200).json({ message: 'Notes fetched successfully!', notes });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    },
    async getNoteById(req, res) {
        try {
            const { id } = req.params;

            // Validate note ID
            if (!id) {
                return res.status(400).json({ message: 'Note ID is required.' });
            }

            // Find the note by ID and populate userId field
            const note = await Note.findById(id).populate('userId', 'fname lname email');
            if (!note) {
                return res.status(404).json({ message: 'Note not found.' });
            }
            res.status(200).json({ message: 'Note fetched successfully!', note });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    },
    async updateNote(req, res) {
        try {
            const { id } = req.params;
            const { title, content } = req.body;

            // Validate note
            const { error } = validateNoteUpdate({ title, content });
            if (error) {
                const errorMessage = error.details.map(detail => detail.message).join(', ');
                console.error('Validation Error:', errorMessage);
                return res.status(400).json({ message: 'Validation Error', error: errorMessage });
            }

            // Find and update the note
            const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
            if (!updatedNote) {
                return res.status(404).json({ message: 'Note not found.' });
            }
            res.status(200).json({ message: 'Note updated successfully!', note: updatedNote });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    },
    async deleteNote(req, res) {
        try {
            const { id } = req.params;

            // Find and delete the note
            const deletedNote = await Note.findByIdAndDelete(id);
            if (!deletedNote) {
                return res.status(404).json({ message: 'Note not found.' });
            }
            res.status(200).json({ message: 'Note deleted successfully!', note: deletedNote });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

};


module.exports = noteController;