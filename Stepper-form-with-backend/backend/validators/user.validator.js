const joi = require('joi');

const registrationSchema = joi.object({
    fname: joi.string().min(3).max(20).trim().messages({
        'string.empty': 'First name is required',
        'any.required': 'First name is required',
        'string.min': 'First name must be at least 3 characters long',
        'string.max': 'First name must not exceed 20 characters',
    }),
    lname: joi.string().min(3).max(20).trim().messages({
        'string.empty': 'Last name is required',
        'any.required': 'Last name is required',
        'string.min': 'Last name must be at least 3 characters long',
        'string.max': 'Last name must not exceed 20 characters',
    }),
    email: joi.string().required().trim()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .messages({
            'string.pattern.base': 'Email must be a valid email address',
        }),
    password: joi.string().min(8).max(24).required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,24}$/)
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        }),
    streetAddress: joi.string().trim()
        .regex(/^[A-Za-z0-9\s,.-]{3,}$/)
        .messages({
            'string.empty': 'Street address is required',
            'string.pattern.base': 'Street address must be a valid address',
        }),
    city: joi.string().trim()
        .regex(/^[A-Za-z\s]{2,50}$/)
        .messages({
            'string.pattern.base': 'City must be a valid name',
            'string.min': 'City must be at least 2 characters long',
            'string.max': 'City must not exceed 50 characters',
        }),
    country: joi.string().trim()
        .regex(/^[A-Za-z\s,-]{2,50}$/)
        .messages({
            'string.pattern.base': 'Country must be a valid name'
        })
});


const loginSchema = joi.object({
    email: joi.string().required().trim()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .messages({
            'string.pattern.base': 'Email must be a valid email address',
        }),
    password: joi.string().min(8).max(24).required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,24}$/)
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        }),
});



function validateRegistration(data) {
    return registrationSchema.validate(data, { abortEarly: false });
}

function validateLogin(data) {
    return loginSchema.validate(data, { abortEarly: false });
}

module.exports = {
    validateRegistration,
    validateLogin
};