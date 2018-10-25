const assert = require('assert')
const Clipped = require('../dist').default

describe('preset', () => {
  let clipped = new Clipped()

  beforeEach(done => {
    clipped = new Clipped()
    done()
  })

  describe('#base', () => {
    it('should successfully load base preset', () => {
      asset.strict.equal(clipped.__initialized__, true)
    })
  })

  describe('#exec', () => {
    it('should be able to execute preset', async () => {
      const trial = Math.random().toString(36).substring(2, 115) + Math.random().toString(36).substring(2, 15)
      await clipped.use(async clipped => {
        clipped[trial] = true
      })
      asset.strict.equal(clipped[trial], true)
    })
  })

  describe('#static', () => {
    it('should be able to merge object config', async () => {
      const trial = Math.random().toString(36).substring(2, 115) + Math.random().toString(36).substring(2, 15)
      await clipped.use({
        [trial]: 'abc'
      })

      asset.strict.equal(clipped.config[trial], 'abc')
    })
  })
})
