const TOKEN_PROVIDER = require('./token')

describe("Being a Token Provider, i want to", () => {

    test("create a token with user's data.", async (done) => {
        const body = {
            username: 'joseph@nodebr.com',
            admin: false
        }
        const result = await TOKEN_PROVIDER.create(body)
        expect(typeof result).toBe('string')
        expect(result.length).toBeGreaterThan(10)
        done()

    });
  
 
  
    
 });
 
 