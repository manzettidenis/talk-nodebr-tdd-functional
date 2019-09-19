const IS_ADMIN_SERVICE = require('./is_admin')
const TOKEN_PROVIDER = require('../providers/token')

let resMock = {
    send: function(){ },
    json: function(err){
        // console.log("\n : " + err);
        return err
    },
    status: function(responseStatus) {
        return this; 
    }
}

describe("Being an Admin Service, i want to: ", () => {

    test("check the request is from an admin.", async (done) => {
        const data = { user: { username: "joseph@nodebr.com", admin: true }}
        const token = await TOKEN_PROVIDER.create(data)
        const req =  { body: { token } }
        const res = {}
        const next = function() {return true}
        const result = await IS_ADMIN_SERVICE(req, res, next)
        expect(typeof result).toBe('boolean')
        expect(result).toBeTruthy()
        done()
    });

    test("reject the request if its not from an admin.", async (done) => {
        const data = { user: { username: "joseph@nodebr.com", admin: false }}
        const token = await TOKEN_PROVIDER.create(data)
        const req =  { body: { token } }
        const next = function() { return true }
        const result = await IS_ADMIN_SERVICE(req, resMock, next)
        expect(result.error).toBe('Not Authorized.')
        done()

    });

});
 
 