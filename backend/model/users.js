const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const keys = require('../config/keys').jwt

// const {jwtConfig} = keys

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'Please Enter Your First Name']
    },
    lastname: {
        type: String,
        required: [true, 'Please Enter Your Last Name']
    },
    email: {
        type: String,
        require: [true, 'Please Enter Your Email'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Please Enter Password']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    emailVerificationToken: String,
    emailVerificationExpires: Number,
    isVerified: {
        type: Boolean,
        default: false
    },   
    },
    {timestamps: true}
)

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// JWT TOKEN
UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id}), keys.secret, { expiresIn: keys.tokenLife }
}

// Compare Password
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model('User', UserSchema)
module.exports = userModel