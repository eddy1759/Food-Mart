const mongoose = require('mongoose')
const keys = require('../../config/keys')
const logger = require('../../middleware/logger')

const {db} = keys

function dbSetup() {
    mongoose.connect(db.url)

    mongoose.connection.on('connected', () => {
        logger.info('MongoDB Connected Successfully')
    })

    mongoose.connection.on('error', (error) => {
        logger.error(error)
    })
} 
module.exports = dbSetup