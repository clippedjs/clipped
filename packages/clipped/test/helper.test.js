const assert = require('assert')
const Clipped = require('../dist').default

describe('helper', () => {
  let clipped = new Clipped()

  beforeEach(done => {
    clipped = new Clipped()
    done()
  })

  describe('#resolvePath', () => {
    it('should resolve path from context', () => {
      clipped.config.context = Math.random().toString(36).substring(2, 115) + Math.random().toString(36).substring(2, 15)

      asset.strict.equal(clipped.resolve('abc'), require('path').join(clipped.config.context, 'abc'))
    })
  })

  describe('#exec', () => {
    it('should be able to execute command', async () => {
      const HELLO = 'Hello world'
      const response = await clipped.exec(`echo ${HELLO}`)
      asset.strict.equal(response.trim && response.trim(), HELLO)
    })
  })

  describe('#toArgs', () => {
    it('should be able to convert json to array of arguments', () => {
      const input = {
        _: ['some', 'option'], // Values in '_' will be appended to the end of the generated argument list
        foo: 'bar',
        hello: true, // Results in only the key being used
        cake: false, // Prepends `no-` before the key
        camelCase: 5, // CamelCase is slugged to `camel-case`
        multiple: ['value', 'value2'] // Converted to multiple arguments
      }

      asset.strict.equal(clipped.toArgs(input).toString(), [
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

  describe('#clone', () => {
    it('should be able to clone git repo', async () => {
      await clipped.fs.remove([
        {path: 'test/somewhere'}
      ])

      await clipped.clone('https://github.com/clippedjs/clipped.git', 'test/somewhere')

      await clipped.fs.remove([
        {path: 'test/somewhere'}
      ])
    }).timeout(40000)
  })
})
