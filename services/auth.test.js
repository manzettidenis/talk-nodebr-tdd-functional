const AUTH_SERVICE = require('./auth')
const TOKEN_PROVIDER = require('../providers/token')

let resMock = {
    send: function(){ },
    json: function(err){
        return err
    },
    status: function(responseStatus) {
        return this; 
    }
}

describe("Being a Auth Service, i want to: ", () => {

    test("check if user can make this request", async (done) => {
        const user = { username: "joseph@nodebr.com", admin: false }
        const token = await TOKEN_PROVIDER.create(user)
        const data = { user: user, token: token }
        const req =  { body: data }
        const next = function() { return true }
        const result = await AUTH_SERVICE(req, resMock, next)
        expect(result).toBeTruthy()
        done()
    });

    test("reject the request if this user cant make this request.", async (done) => {
        const user = { username: "joseph@nodebr.com", admin: false }
        const invalid_user = { username: "mariano@nodebr.com", admin: false }
        const token = await TOKEN_PROVIDER.create(user)
        const data = { user: invalid_user, token: token }
        const req =  { body: data }
        const next = function() { return true }
        const result = await AUTH_SERVICE(req, resMock, next)
        expect(result.error).toBe('Not Authorized.')
        done()

    });

});
 
 