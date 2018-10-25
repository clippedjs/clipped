const path = require('path')
const assert = require('assert')
const {default: Clipped, cli: clippedCli} = require('../dist')

describe('CLI', async () => {
  describe('#parameterless', () => {
    it('should return help when no parameters given', async () => {
      const response = await clippedCli()

      assert.ok(response)
    })
  })

  describe('#action', () => {
    it('should run action when given action', async () => {
      const response = await clippedCli({action: 'version'})

      assert.ok(response)
    })
  })

  // Describe('#init', function () {
  //   const response = clippedCli({action: 'init'})

  //   assert.ok(response)
  // })
})
