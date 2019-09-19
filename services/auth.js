const jwt = require('jsonwebtoken')
const CONFIG = require('../config/config.js')


const check = async (req, res, next) => {
    const {token, user} = req.body
    const {data} = await jwt.verify(token, CONFIG.secret)
    if(data.username === user.username) return next()
    const error = 'Not Authorized.'
    return res.status(401).json({error})

}


module.exports = check