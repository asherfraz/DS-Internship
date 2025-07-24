const joi = require('joi');


const registerUserSchema = joi.object({
    username: joi.string().min(3).regex(/^[a-zA-Z0-9_]+$/).required()
        .messages({
            'string.base': 'Username must be a string',
            'string.empty': 'Username cannot be empty',
            'string.min': 'Username must be at least 3 characters long',
            'string.pattern.base': 'Username can only contain letters, numbers, and underscores',
            'any.required': 'Username is required'
        }),
    email: joi.string().email().required()
        .messages({
            'string.base': 'Email must be a string',
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email cannot be empty',
            'any.required': 'Email is required'
        }),
    password: joi.string().min(8).required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must be at least 8 characters long',
            'any.required': 'Password is required'
        })
});


const loginUserSchema = joi.object({
    username: joi.string().min(3).regex(/^[a-zA-Z0-9_]+$/).required()
        .messages({
            'string.base': 'Username must be a string',
            'string.empty': 'Username cannot be empty',
            'string.min': 'Username must be at least 3 characters long',
            'string.pattern.base': 'Username can only contain letters, numbers, and underscores',
            'any.required': 'Username is required'
        }),
    password: joi.string().min(8).required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must be at least 8 characters long',
            'any.required': 'Password is required'
        })
});

function validateRegisterUser(registerData) {
    return registerUserSchema.validate(registerData, { abortEarly: false });
}

function validateLoginUser(loginData) {
    return loginUserSchema.validate(loginData, { abortEarly: false });
}

module.exports = {
    validateRegisterUser,
    validateLoginUser
};