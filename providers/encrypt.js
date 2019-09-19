const bcrypt = require('bcrypt')

const create = async (data) => {
    return await bcrypt.hash(data, 10)
}

const compare = async(data, hash) => {
    return await bcrypt.compare(data, hash)
}

module.exports = { create, compare }