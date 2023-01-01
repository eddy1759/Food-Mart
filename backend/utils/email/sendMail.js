const nodemailer = require('nodemailer')
const mailConfig = require('../../config/mail.config')

const sendEmail = async ({
    from,
    to,
    subject,
    html
}) => {
    const transporter = nodemailer.createTransport(mailConfig)
    return transporter.sendMail({
        from, to,
        subject, html
    })
}

module.exports = sendEmail

