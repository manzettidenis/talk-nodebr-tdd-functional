const api = require('express')()
const morgan = require('morgan')
const PORT = 3000;
const bodyparser = require('body-parser')
const server = require('http').createServer(api)

// ROUTES
const USER_ROUTER = require('../modules/User/router')

// TOOLS
api.use(bodyparser.urlencoded())
api.use(bodyparser.json())
api.use(morgan('tiny'))

// ROUTER
const VERSION = 'v1'
api.use(`/${VERSION}/user`, USER_ROUTER)

if (process.env.mode !== 'TEST') {
    server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
}


module.exports = server;