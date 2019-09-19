const mongoose = require('mongoose')
const User = require('./model')
const request = require('supertest')
const CONFIG = require('../../config/config')
let server;


async function removeAllCollections () {
   const collections = Object.keys(mongoose.connection.collections)
   for (const collectionName of collections) {
     const collection = mongoose.connection.collections[collectionName]
     await collection.deleteMany()
   }
 }

beforeAll(async () => {
   process.env.mode = 'TEST'
   server = require('../../server/server')
   const url = CONFIG.test_database_uri
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  })

})

afterAll(async () => {
   await removeAllCollections()
   await server.close()
})

afterEach(async () => {
})


describe('Being a User, i want to: ', () => {
    
   test('create an account using my email and password. ', async (done) => {
       const body = { username: 'joseph@nodebr.com', password: 'someStrangePassword', admin: false}
       const response = await request(server)
       .post('/v1/user')
       .send(body);
       expect(response.status).toEqual(201);
       expect(typeof response.body.token).toBe('string');
       expect(typeof response.body.result).toBe('object');
       done()
    });
   
    test('sign in my account using my email and password. ', async (done) => {
       const body = { username: 'joseph@nodebr.com', password: 'someStrangePassword', admin: false}
       const response = await request(server)
       .post('/v1/user/signin')
       .send(body);
       expect(response.status).toEqual(200);
       expect(typeof response.body.token).toBe('string');
      //  expect(typeof response.body.result).toBe('object');
       done()
    });
    
 });
 
 