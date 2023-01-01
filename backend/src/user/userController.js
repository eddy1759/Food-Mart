const userModel = require('../../model/user')
const {StatusCodes} = require('http-status-codes')
const authenticate = require('../../middleware/authenticate')
const validateUser = require('../../utils/user.validate')

const {
    emailVerificationToken,
    emailVerificationExpires,
    statusResponse
} = require('../../utils/email.token')

async function createUser(req, res) {
    const {firstname,
        lastname,
        email,
        password} = req.body
    
    let userExist = await userModel.findOne({
        email: email
    })

    if (userExist) {
        return res.status(StatusCodes.NOT_FOUND).json({
            status: false,
            msg: 'This user already exist'
        })
    }

    const user =  await userModel.create({
        firstname,
        lastname,
        email,
        password,
        emailVerificationToken: emailVerificationToken,
        emailVerificationExpires: emailVerificationExpires,
    }),
    statusResponse(req, res, user)
} 

async function signin(req, res){
    const {email, password} = req.body
    const user = await validateUser(email, password)

    if(!user) {
        return res.status(StatusCodes.)
    }
}

