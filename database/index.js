const mongoose = require('mongoose')
const CONFIG = require('../config/config')
let DATABASE_URI;

mongoose.Promise = require(`bluebird`)
mongoose.set(`debug`, true)

if(process.env.mode === 'production') {
    console.log("============== STARTING TESTS DATABASE ==============")
    DATABASE_URI = CONFIG.prod_database_uri
} else {
    console.log("============== STARTING PRODUCTION DATABASE ==============")
    DATABASE_URI = CONFIG.dev_database_uri
}

mongoose.connect(DATABASE_URI, {
  autoIndex: true,
  ssl: false,
  poolSize: 1,
  autoReconnect: true,
  reconnectTries: 3,
  replicaSet: ``,
  useNewUrlParser: true
})

mongoose.connection.on(`connected`, () => {
  console.log(`MongoDB connected`)
})

mongoose.connection.on(`error`, (error) => {
  console.log(`MongoDB error => `, error)
})

// mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db