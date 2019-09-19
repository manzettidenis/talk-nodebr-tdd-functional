const MODEL = require('./model')
const TOKEN_PROVIDER = require('../../providers/token')
const ENCRYPT_PROVIDER = require('../../providers/encrypt')

const get = async (req, res, next) => {
    const result = null
    return res.status(200).json(result)
}

const create = async (req, res, next) => {
    let body = req.body;
    const hash = await ENCRYPT_PROVIDER.create(body.password)
    body.password = hash;
    try {
        const token = await TOKEN_PROVIDER.create(body)
        const result = await MODEL.create(body)
        return res.status(201).json({result, token})
    } catch(error) {
        console.log({error})
        return res.status(401).json({error})
    }
}

const update = async (req, res, next) => {
    const {user} = req.body
    const {_id} = user._id
    try {
        const result = await MODEL.updateOne({_id}, user)
        return res.status(200).json({result})
    } catch(error) {
        return res.status(200).json({error})
    }

}


const signIn = async (req, res, next) => {
    const {password, username} = req.body
    const user = await MODEL.findOne({username})
    const token = await TOKEN_PROVIDER.create(user)
    const result = await ENCRYPT_PROVIDER.compare(password, user.password)
    if(result) return res.status(200).json({token})
    return res.status(401).json({error: 'Not Authorized.'})
    
}

const softDelete = async (req, res, next) => {
    const result = null
    return res.status(200).json(result)
    
}

const remove = async (req, res, next) => {
    const result = null
    return res.status(200).json(result)
}

const list = async (req, res, next) => {
    const result = 'lista de usuarios'
    return res.status(200).json({result})
}


const CONTROLLER = {
    get,
    create,
    list,
    signIn,
    update,
    softDelete,
    remove
};


module.exports = CONTROLLER;