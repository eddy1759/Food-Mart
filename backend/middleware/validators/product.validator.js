const Joi = require('joi')
const {StatusCodes} = require('http-status-codes')

const AddFoodSchema = Joi.object({
    name: Joi.string()
    .max(255)
    .trim()
    .required(),
    descr: Joi.string()
    .min(5)
    .required(),
    price: Joi.number()
    .min(1)
    .required(),
    imageUrl: Joi.string()
    .required()
})

const FoodUpdateSchema = Joi.object({
    name: Joi.string()
    .max(255)
    .trim(),
    descr: Joi.string()
    .min(5),
    price: Joi.number()
    .min(1)
})

async function AddFoodValidationMW (req, res, next) {
    const foodPayLoad = req.body

    try {
        await AddFoodSchema.validateAsync(foodPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: StatusCodes.BAD_REQUEST
        })
    }
}

async function UpdateFoodValidationMW (req, res, next) {
    const foodPayLoad = req.body
    try {
        await FoodUpdateSchema.validateAsync(foodPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: StatusCodes.BAD_REQUEST
        })
    }
}

module.exports = {
    AddFoodValidationMW,
    UpdateFoodValidationMW
}