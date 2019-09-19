const TOKEN_PROVIDER = require('../providers/token')
const CONFIG = require('../config/config.js')

const check = async (req, res, next) => {
    const {token} = req.body
    const result = await TOKEN_PROVIDER.decode(token)
    if(result.data.user.admin) return next()
    const error = "Not Authorized."
    return res.status(401).json({error})
}


module.exports = check