const jwt = require('jsonwebtoken')
const CONFIG = require('../config/config.js')

const create = async (data) => {
    const result = await jwt.sign({data}, CONFIG.secret, { expiresIn: '1h' });
    return result
}

const decode = async (token) => {
    const result =  await jwt.decode(token, CONFIG.secret)
    return result;
}

module.exports = { create, decode }