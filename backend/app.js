const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const {StatusCodes} = require('http-status-codes')

const keys = require('./config/keys')
const dbSetup = require('./src/db/dbConfig')
const logger = require('./middleware/logger')
const httpLogger = require('./middleware/httpLogger')
const errorHandler = require('./backend/middleware/errorHandler')
const limiter = require('./middleware/ratelimiter')

const port = keys.port
const app = express();

dbSetup()

app.use(httpLogger)

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(limiter)
app.use(helmet())
app.use(cors())




app.get('/', (req, res) => {
    res.status(StatusCodes.OK).send('Welcome to Food Mart')
})

app.use(errorHandler)

app.listen(port, () => {
    logger.info(`Server is listening on port ${port}. Visit http://localhost:${port}/ in your browser.`)
})

