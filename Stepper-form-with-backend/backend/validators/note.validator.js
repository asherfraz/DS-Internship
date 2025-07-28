const Joi = require("joi")


const noteValidator = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(5).required()
});
const noteUpdateValidator = Joi.object({
    title: Joi.string().min(3).max(100),
    content: Joi.string().min(5)
});

function validateNote(note) {
    return noteValidator.validate(note);
}
function validateNoteUpdate(note) {
    return noteUpdateValidator.validate(note);
}

module.exports = {
    validateNote,
    validateNoteUpdate
};
