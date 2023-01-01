// const logger = require('../utils/logging/logger')

const {StatusCodes} = require('http-status-codes')

const errorHandler =  (err, req, res, next)=> {
    console.error(err)
    const errorStatus = err.status || StatusCodes.INTERNAL_SERVER_ERROR
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: err.message,
        stack: err.stack
    })
    next()
}

module.exports = errorHandler