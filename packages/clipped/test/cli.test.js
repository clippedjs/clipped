const path = require('path')
const assert = require('assert')
const {default: Clipped, cli: clippedCli} = require('../dist')

describe('clippedCli', async function () {
  describe('#parameterless', function () {
    it('should return help when no parameters given', async function () {
        const response = await clippedCli({})
    })
  })

  describe('#action', function () {
    it('should run action when given action', async function () {
      const response = await clippedCli({action: 'version'})

      assert.ok(response)
    })
  })
})
