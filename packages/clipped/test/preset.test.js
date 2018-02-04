const assert = require('assert')
const Clipped = require('../dist').default

describe('preset', function () {
  let clipped = new Clipped()

  beforeEach(function (done) {
    clipped = new Clipped()
    done()
  })

  describe('#base', function () {
    it('should successfully load base preset', function () {
      assert.equal(clipped.__initialized__, true)
    })
  })

  describe('#exec', function () {
    it('should be able to execute preset', async function () {
      const trial = Math.random().toString(36).substring(2, 115) + Math.random().toString(36).substring(2, 15)
      await clipped.use(async clipped => {clipped[trial] = true})
      assert.equal(clipped[trial], true)
    })
  })

  describe('#static', function () {
    it('should be able to merge object config', async function () {
      const trial = Math.random().toString(36).substring(2, 115) + Math.random().toString(36).substring(2, 15)
      await clipped.use({
        [trial]: 'abc'
      })

      assert.equal(clipped.config[trial], 'abc')
    })
  })
})
