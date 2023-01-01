const {email} = require('./keys')

const mailConfig = {
    service: 'gmail',
    auth: {
        user: email.user,
        pass: email.pass
    }
}

module.exports = mailConfig