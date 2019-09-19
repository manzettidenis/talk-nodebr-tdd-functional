
const ROUTER = require('express').Router()
const CONTROLLER = require('./controller')
const AUTH_SERVICE = require('../../services/auth')
const IS_ADMIN_SERVICE = require('../../services/is_admin')
const TOKEN_PROVIDER = require('../../providers/token')

// common user's routes
ROUTER.post('/', CONTROLLER.create)
ROUTER.post('/signin', CONTROLLER.signIn)
ROUTER.get('/:_id', CONTROLLER.get)
ROUTER.put('/:_id', AUTH_SERVICE, CONTROLLER.update)
ROUTER.delete('/user/:_id', CONTROLLER.softDelete)

// only admins can access this route
ROUTER.get('/',IS_ADMIN_SERVICE, CONTROLLER.list)
ROUTER.delete('/:_id', IS_ADMIN_SERVICE, CONTROLLER.remove)

module.exports = ROUTER