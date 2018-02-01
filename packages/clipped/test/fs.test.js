const path = require('path')
const assert = require('assert')
const Clipped = require('../src').default

const testSite = path.resolve(__dirname, '../test/site')
const testDefaults = path.resolve(__dirname, '../test/defaults')

describe('fs', async function () {
  let clipped = new Clipped()

  await clipped.fs.copy([
    {src: testDefaults, dest: testSite}
  ])

  beforeEach(function (done) {
    clipped = new Clipped()
    done()
  })

  describe('#copy', function () {
    it('should be able to copy file from src to dest', async function () {
      await clipped.fs.copy([
        {src: path.resolve(testSite, 'src.js'), dest: path.resolve(testSite, 'dest.js')}
      ])
    })
  })

  describe('#remove', function () {
    it('should be able to remove file from path', async function () {
      await clipped.fs.remove([
        {path: path.resolve(testSite, 'dest.js')}
      ])
    })
  })

  describe('#rmdir', function () {
    it('#should be able to remove directory', async function () {

    })
  })
})
