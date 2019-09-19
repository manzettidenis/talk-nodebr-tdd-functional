const ENCRYPT_PROVIDER = require('./encrypt')

describe("Being a Encrypt Provider, i want to: ", () => {

    test("create a hash with user's password.", async (done) => {
        const password =  'SomenthingElse'
        const result = await ENCRYPT_PROVIDER.create(password)
        expect(typeof result).toBe('string')
        expect(result).not.toEqual(password)
        // expect(result.length).toBeGreaterThan(10)
        done()

    });

    test("compare a valid hash with user's password.", async (done) => {
        const password =  'SomenthingElse'
        const hash = await ENCRYPT_PROVIDER.create(password)
        const result = await ENCRYPT_PROVIDER.compare(password, hash)
        expect(typeof result).toBe('boolean')
        expect(result).toBeTruthy();
        done()
    });
  
    test("compare an invalid hash with user's password.", async (done) => {
        const password =  'SomenthingElse'
        const invalid_password =  'SomenthingElseWrong'
        const hash = await ENCRYPT_PROVIDER.create(password)
        const result = await ENCRYPT_PROVIDER.compare(invalid_password, hash)
        expect(typeof result).toBe('boolean')
        expect(result).not.toBeTruthy();
        done()
    });
  
 
  
    
 });
 
 