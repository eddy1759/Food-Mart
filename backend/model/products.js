const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FoodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
},{timestamps: true})

const productModel = mongoose.model('Product', FoodSchema)
module.exports = productModel