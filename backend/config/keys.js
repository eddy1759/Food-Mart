require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    db: {
        url: process.env.MONGO_URI
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        tokenLife: process.env.EXPIRE_IN
    },
    email: {
        user: process.env.MAIL_USER,
        pass: process.env.NODEMAILER_PASS
    }
}