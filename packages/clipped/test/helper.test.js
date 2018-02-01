const assert = require('assert')
const Clipped = require('../src').default

describe('helper', function () {
  let clipped = new Clipped()

  beforeEach(function (done) {
    clipped = new Clipped()
    done()
  })

  describe('#resolvePath', function () {
    it('should resolve path from context', function () {
      clipped.config.context = Math.random().toString(36).substring(2, 115) + Math.random().toString(36).substring(2, 15)

      assert.equal(clipped.resolve('abc'), require('path').join(clipped.config.context, 'abc'))
    })
  })

  describe('#exec', function () {
    it('should be able to execute command', async function () {
      const HELLO = 'Hello world'
      const response = await clipped.exec(`echo ${HELLO}`)
      assert.equal(response.trim && response.trim(), HELLO)
    })
  })

  describe('#toArgs', function () {
    it('should be able to convert json to array of arguments', function () {
      const input = {
        _: ['some', 'option'],          // values in '_' will be appended to the end of the generated argument list
        foo: 'bar',
        hello: true,                    // results in only the key being used
        cake: false,                    // prepends `no-` before the key
        camelCase: 5,                   // camelCase is slugged to `camel-case`
        multiple: ['value', 'value2']  // converted to multiple arguments
      }
      
      assert.equal(clipped.toArgs(input).toString(), [
        '--foo=bar',
        '--hello',
        '--no-cake',
        '--camel-case=5',
        '--multiple=value',
        '--multiple=value2',
        'some',
        'option'
      ].toString())
    })
  })
})
