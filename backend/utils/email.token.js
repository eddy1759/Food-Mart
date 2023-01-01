const crypto = require('crypto')
const verificationMail = require('./email/email.verification')
const {StatusCodes} = require('http-status-codes')
require('dotenv').config()

const verificationToken = crypto.randomBytes(32).toString('hex')
const emailVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex')
const emailVerificationExpires = Date.now() + 3 * 24 * 60 * 60 *1000

const statusResponse = async (req, res, user) => {
    user.password = undefined
    user.emailVerificationToken = undefined
    user.emailVerificationExpires = undefined

    // Sending Mail
    try {
        // creating a verification link
        const url = `${req.protocol}://${req.get('host')}/users/verify/${verificationToken}`

        await verificationMail({
            name: user.firstname,
            email: user.email,
            url: url
        })

        return res.status(StatusCodes.OK).json({
            msg: 'Registration successful, please check your mail',
            user
        })
    } catch (error) {
        (user.emailVerificationToken = undefined),
        (user.emailVerificationExpires = undefined),
        await user.save({ validateBeforeSave: false })
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "There was an error sending the mail, Try again later!" 
        })
    }
}

module.exports = {
    verificationToken,
    emailVerificationToken,
    emailVerificationExpires,
    statusResponse
}