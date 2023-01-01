const Joi = require('joi')
const {StatusCodes} = require('http-status-codes')

const UserAddSchema = Joi.object({
    firstname: Joi.string()
        .max(255)
        .trim()
        .required(),
    lastname: Joi.string()
        .max(255)
        .required()
        .trim(),
    email: Joi.string()
        .email()
        .required(),   
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{7,30}$'))
        .required(),
    googleId: Joi.string()
        .optional(),
    facebookId: Joi.string()
        .optional(),
    role: Joi.string()
        .default('user'),
    resetPasswordToken: Joi.string()
        .optional(),
    resetPasswordExpire: Joi.date()
        .optional(),
    isVerified: Joi.boolean()
        .default('false')
})

const UpdateUserSchema = Joi.object({
    firstname: Joi.string()
        .max(255)
        .trim(),
    lastname: Joi.string()
        .max(255)
        .trim(),
    email: Joi.string()
        .email(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{7,30}$')),  
})

async function AddUserValidationMW (req, res, next) {
    const userPayLoad = req.body
    try {
        await UserAddSchema.validateAsync(userPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: StatusCodes.BAD_REQUEST
        })
    }
}

async function UpdateUserValidationMW (req, res, next) {
    const userPayLoad = req.body
    try {
        await UpdateUserSchema.validateAsync(userPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: StatusCodes.BAD_REQUEST
        })
    }
}

module.exports = {
    AddUserValidationMW,
    UpdateUserValidationMW
}