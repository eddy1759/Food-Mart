const passport = require('passport')
const userModel = require('../model/users')
const productModel = require('../model/products')
const JwtStrategy = require('passport-jwt')
const {StatusCodes} = require('http-status-codes')


const jwtConfig = require('../config/keys').jwt

const cookieExtractor = function(req) {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['jwt_token']
    }
    return token
}

const opts = {}
opts.jwtFromRequest = cookieExtractor
opts.secretOrKey = jwtConfig.secret

const jwtPassport = passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        userModel.findOne({
            _id: jwt_payload._id
        }, (err, user) => {
            if (err) {
                return done(err, false)
            } else if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    })
)

const verifyUser = passport.authenticate('jwt', { session: false })

const verifyAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findOne({_id: req.user._id})
        if(user.role === 'admin'){
            next()
        }
    } catch (error) {
        next({
            message: error.details[0].message,
            status: StatusCodes.BAD_REQUEST
        })
    }
}